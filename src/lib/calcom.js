// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers

const API_KEY = import.meta.env.VITE_CALCOM_API_KEY
const BASE    = 'https://api.cal.com/v2'

const hdrs = () => ({
  Authorization:     `Bearer ${API_KEY}`,
  'cal-api-version': '2024-06-14',
  'Content-Type':    'application/json',
})

/** Fetch all schedules and return the default one. */
export async function getDefaultSchedule() {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')
  const res = await fetch(`${BASE}/schedules`, { headers: hdrs() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const json = await res.json()
  const data = json.data ?? json
  const list = Array.isArray(data) ? data : data?.schedules ?? []
  if (!list.length) throw new Error('No schedules found on this Cal.com account.')
  return list.find(s => s.isDefault) ?? list[0]
}

/**
 * Fetch a single schedule by ID (gives us the full availability + dateOverrides).
 */
async function getSchedule(scheduleId) {
  const res = await fetch(`${BASE}/schedules/${scheduleId}`, { headers: hdrs() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return json.data ?? json
}

/**
 * Normalise a weekly availability slot coming from GET into the shape
 * that PATCH accepts:
 *   { days: ["Monday", ...], startTime: "HH:MM", endTime: "HH:MM" }
 */
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function normaliseSlot(slot) {
  // days may come as integers [0,1,2] or strings ["Monday"] — normalise to strings
  const days = (slot.days ?? []).map(d =>
    typeof d === 'number' ? DAY_NAMES[d] : d
  )
  // startTime / endTime may come as "HH:MM:SS" or full ISO — keep only "HH:MM"
  const startTime = (slot.startTime ?? '').toString().slice(0, 5)
  const endTime   = (slot.endTime   ?? '').toString().slice(0, 5)
  return { days, startTime, endTime }
}

/**
 * Block a date by adding a dateOverride with isUnavailable:true.
 */
export async function blockDate(scheduleId, date, allDay, startTime, endTime) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)

  // Weekly recurring slots (no .date field)
  const weeklySlots = (schedule.availability ?? [])
    .filter(a => !a.date)
    .map(normaliseSlot)

  // Existing date overrides
  const existingOverrides = (schedule.availability ?? [])
    .filter(a => !!a.date)

  // Also check schedule.dateOverrides if present (some API versions use this key)
  const extraOverrides = Array.isArray(schedule.dateOverrides)
    ? schedule.dateOverrides
    : []

  const allOverrides = [...existingOverrides, ...extraOverrides]

  // Duplicate check
  if (allOverrides.some(o => o.date === date)) return { alreadyBlocked: true }

  const start = allDay ? '00:00' : startTime.slice(0, 5)
  const end   = allDay ? '23:59' : endTime.slice(0, 5)

  const newOverride = {
    date,
    startTime: `${date}T${start}:00.000Z`,
    endTime:   `${date}T${end}:00.000Z`,
    isUnavailable: true,
  }

  const body = {
    availability: [
      ...weeklySlots,
      ...allOverrides,
      newOverride,
    ],
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: hdrs(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}

/**
 * Unblock a date by removing its override.
 */
export async function unblockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)

  const weeklySlots = (schedule.availability ?? [])
    .filter(a => !a.date)
    .map(normaliseSlot)

  const remainingOverrides = (schedule.availability ?? [])
    .filter(a => !!a.date && a.date !== date)

  const extraOverrides = Array.isArray(schedule.dateOverrides)
    ? schedule.dateOverrides.filter(o => o.date !== date)
    : []

  const body = {
    availability: [
      ...weeklySlots,
      ...remainingOverrides,
      ...extraOverrides,
    ],
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: hdrs(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}
