// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers
//
// PATCH /v2/schedules/{id} shape:
//   availability[] → weekly recurring slots { days:string[], startTime:"HH:MM", endTime:"HH:MM" }
//   overrides[]    → date overrides         { date, startTime:"HH:MM", endTime:"HH:MM", isUnavailable:true }
//   Without isUnavailable:true Cal.com treats the override as extra AVAILABLE hours.

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

/** Fetch a single schedule by ID. */
async function getSchedule(scheduleId) {
  const res = await fetch(`${BASE}/schedules/${scheduleId}`, { headers: hdrs() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return json.data ?? json
}

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const toHHMM    = (t = '') => String(t).slice(0, 5)

/** Normalise a weekly slot → { days: string[], startTime: "HH:MM", endTime: "HH:MM" } */
function normaliseWeeklySlot(slot) {
  return {
    days:      (slot.days ?? []).map(d => typeof d === 'number' ? DAY_NAMES[d] : d),
    startTime: toHHMM(slot.startTime),
    endTime:   toHHMM(slot.endTime),
  }
}

/**
 * Normalise a date override for round-tripping through PATCH.
 * CRITICAL: isUnavailable:true must be preserved — without it Cal.com
 * treats the entry as extra available hours, not a block.
 */
function normaliseDateOverride(o) {
  return {
    date:          o.date,
    startTime:     toHHMM(o.startTime),
    endTime:       toHHMM(o.endTime),
    isUnavailable: o.isUnavailable ?? false,  // preserve existing value
  }
}

/** Collect all overrides from both possible response locations. */
function collectOverrides(schedule) {
  return [
    ...(schedule.overrides   ?? []),
    ...(schedule.availability ?? []).filter(a => !!a.date),
  ].map(normaliseDateOverride)
}

/** Collect and normalise weekly slots only. */
function collectWeeklySlots(schedule) {
  return (schedule.availability ?? [])
    .filter(a => !a.date)
    .map(normaliseWeeklySlot)
}

/**
 * Block a date — adds an override with isUnavailable:true.
 */
export async function blockDate(scheduleId, date, allDay, startTime, endTime) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule         = await getSchedule(scheduleId)
  const weekly           = collectWeeklySlots(schedule)
  const existingOverrides = collectOverrides(schedule)

  if (existingOverrides.some(o => o.date === date)) return { alreadyBlocked: true }

  const start = allDay ? '00:00' : toHHMM(startTime)
  const end   = allDay ? '23:59' : toHHMM(endTime)

  const body = {
    availability: weekly,
    overrides: [
      ...existingOverrides,
      {
        date,
        startTime:     start,
        endTime:       end,
        isUnavailable: true,   // ← THIS is what actually blocks the date
      },
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
 * Unblock a date — removes the override entirely.
 */
export async function unblockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)
  const weekly   = collectWeeklySlots(schedule)
  const remaining = collectOverrides(schedule).filter(o => o.date !== date)

  const body = {
    availability: weekly,
    overrides:    remaining,
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: hdrs(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}
