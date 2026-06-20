// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers
//
// KEY INSIGHT from Cal.com docs:
//   PATCH /v2/schedules/{id} accepts TWO separate top-level keys:
//     availability[] → weekly recurring slots ONLY  { days[], startTime "HH:MM", endTime "HH:MM" }
//     overrides[]    → date overrides ONLY          { date, startTime "HH:MM", endTime "HH:MM" }
//   Mixing date overrides inside availability[] causes 400 every time.

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

/** Normalise a date override → { date, startTime: "HH:MM", endTime: "HH:MM" } */
function normaliseDateOverride(o) {
  return {
    date:      o.date,
    startTime: toHHMM(o.startTime),
    endTime:   toHHMM(o.endTime),
  }
}

/**
 * Block a date.
 * Sends weekly slots in `availability[]` and date blocks in `overrides[]` — separate keys.
 */
export async function blockDate(scheduleId, date, allDay, startTime, endTime) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)

  // Weekly slots only (no .date field)
  const weekly = (schedule.availability ?? [])
    .filter(a => !a.date)
    .map(normaliseWeeklySlot)

  // Existing overrides — may live in schedule.overrides OR as .date entries in schedule.availability
  const existingOverrides = [
    ...(schedule.overrides ?? []),
    ...(schedule.availability ?? []).filter(a => !!a.date),
  ].map(normaliseDateOverride)

  if (existingOverrides.some(o => o.date === date)) return { alreadyBlocked: true }

  const start = allDay ? '00:00' : toHHMM(startTime)
  const end   = allDay ? '23:59' : toHHMM(endTime)

  const body = {
    availability: weekly,
    overrides: [
      ...existingOverrides,
      { date, startTime: start, endTime: end },
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
 * Unblock a date.
 * Removes the override from `overrides[]`, keeps weekly slots intact.
 */
export async function unblockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)

  const weekly = (schedule.availability ?? [])
    .filter(a => !a.date)
    .map(normaliseWeeklySlot)

  const remainingOverrides = [
    ...(schedule.overrides ?? []),
    ...(schedule.availability ?? []).filter(a => !!a.date),
  ]
    .map(normaliseDateOverride)
    .filter(o => o.date !== date)

  const body = {
    availability: weekly,
    overrides:    remainingOverrides,
  }

  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: hdrs(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}
