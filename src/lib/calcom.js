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

/** Fetch a single schedule by ID. */
async function getSchedule(scheduleId) {
  const res = await fetch(`${BASE}/schedules/${scheduleId}`, { headers: hdrs() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return json.data ?? json
}

// Day index → name map
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

/** Slice any time value down to "HH:MM" regardless of what Cal.com returns */
const toHHMM = (t = '') => String(t).slice(0, 5)

/**
 * Normalise a weekly slot for PATCH:
 *   days  → ["Monday", ...] (strings, never integers)
 *   times → "HH:MM"
 */
function normaliseWeeklySlot(slot) {
  return {
    days:      (slot.days ?? []).map(d => typeof d === 'number' ? DAY_NAMES[d] : d),
    startTime: toHHMM(slot.startTime),
    endTime:   toHHMM(slot.endTime),
  }
}

/**
 * Normalise a date-override slot for PATCH:
 *   startTime / endTime → "HH:MM"  (not ISO, not HH:MM:SS)
 */
function normaliseDateOverride(slot) {
  return {
    date:          slot.date,
    startTime:     toHHMM(slot.startTime),
    endTime:       toHHMM(slot.endTime),
    isUnavailable: slot.isUnavailable ?? false,
  }
}

/** Split a raw availability array into weekly slots + date overrides, both normalised. */
function splitAvailability(availability = []) {
  const weekly    = availability.filter(a => !a.date).map(normaliseWeeklySlot)
  const overrides = availability.filter(a =>  a.date).map(normaliseDateOverride)
  return { weekly, overrides }
}

/** Block a date by adding a dateOverride with isUnavailable:true. */
export async function blockDate(scheduleId, date, allDay, startTime, endTime) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)
  const { weekly, overrides } = splitAvailability(schedule.availability)

  if (overrides.some(o => o.date === date)) return { alreadyBlocked: true }

  const start = allDay ? '00:00' : toHHMM(startTime)
  const end   = allDay ? '23:59' : toHHMM(endTime)

  const body = {
    availability: [
      ...weekly,
      ...overrides,
      { date, startTime: start, endTime: end, isUnavailable: true },
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

/** Unblock a date by removing its override. */
export async function unblockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule = await getSchedule(scheduleId)
  const { weekly, overrides } = splitAvailability(schedule.availability)

  const body = {
    availability: [
      ...weekly,
      ...overrides.filter(o => o.date !== date),
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
