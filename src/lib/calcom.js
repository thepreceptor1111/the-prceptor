// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers

const API_KEY = import.meta.env.VITE_CALCOM_API_KEY
const BASE    = 'https://api.cal.com/v2'

const headers = () => ({
  Authorization:     `Bearer ${API_KEY}`,
  'cal-api-version': '2024-06-14',
  'Content-Type':    'application/json',
})

/** Fetch all schedules and return the default one (first). */
export async function getDefaultSchedule() {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')
  const res = await fetch(`${BASE}/schedules`, { headers: headers() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const { data } = await res.json()
  if (!data?.length) throw new Error('No schedules found on this Cal.com account.')
  // Prefer the schedule marked isDefault, fallback to first
  return data.find(s => s.isDefault) ?? data[0]
}

/**
 * Block a date on Cal.com by patching the schedule's availability
 * with a date override that marks the slot unavailable.
 *
 * @param {string} scheduleId
 * @param {string} date        - 'YYYY-MM-DD'
 * @param {boolean} allDay
 * @param {string} startTime   - 'HH:MM' (ignored if allDay)
 * @param {string} endTime     - 'HH:MM' (ignored if allDay)
 * @param {object[]} existing  - current availability array from the schedule
 */
export async function blockDate(scheduleId, date, allDay, startTime, endTime, existing = []) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const start = allDay ? '00:00' : startTime
  const end   = allDay ? '23:59' : endTime

  // Build the override: a "dateOverride" entry with isUnavailable = true
  // We merge with existing overrides to not wipe them out
  const existingOverrides = existing
    .filter(a => a.date)  // only date-override entries have a .date field

  // Avoid duplicate
  const alreadyBlocked = existingOverrides.some(o => o.date === date)
  if (alreadyBlocked) return { alreadyBlocked: true }

  const newOverride = {
    date,
    startTime: `${date}T${start}:00.000Z`,
    endTime:   `${date}T${end}:00.000Z`,
    isUnavailable: true,
  }

  const body = {
    availability: [
      ...existing.filter(a => !a.date),  // keep weekly recurring slots
      ...existingOverrides,               // keep existing date overrides
      newOverride,
    ],
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: headers(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}

/**
 * Unblock a date by removing its override from the schedule.
 *
 * @param {string} scheduleId
 * @param {string} date        - 'YYYY-MM-DD'
 * @param {object[]} existing  - current availability array from the schedule
 */
export async function unblockDate(scheduleId, date, existing = []) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const body = {
    availability: existing.filter(a => a.date !== date),
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: headers(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}
