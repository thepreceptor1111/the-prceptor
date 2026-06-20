// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers
//
// GROUND TRUTH from official Cal.com docs:
//   overrides[] schema: { date: "YYYY-MM-DD", startTime: "HH:MM", endTime: "HH:MM" }
//   There is NO isUnavailable field.
//   To BLOCK a date: send override with startTime: "00:00", endTime: "00:00"
//   A zero-length window = no slots available = date is effectively blocked.

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

/** Normalise a weekly slot for PATCH. */
function normaliseWeeklySlot(slot) {
  return {
    days:      (slot.days ?? []).map(d => typeof d === 'number' ? DAY_NAMES[d] : d),
    startTime: toHHMM(slot.startTime),
    endTime:   toHHMM(slot.endTime),
  }
}

/** Normalise a date override for PATCH. Only date/startTime/endTime — no other fields. */
function normaliseDateOverride(o) {
  return {
    date:      o.date,
    startTime: toHHMM(o.startTime),
    endTime:   toHHMM(o.endTime),
  }
}

/**
 * A blocked date is one where startTime === endTime === '00:00'
 * (zero-length window = no bookable slots).
 */
function isBlocked(o) {
  const st = toHHMM(o.startTime)
  const et = toHHMM(o.endTime)
  return st === '00:00' && et === '00:00'
}

/** Collect overrides from schedule response (handles both response shapes). */
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
 * Block a date by adding an override with startTime=endTime="00:00".
 * Zero-length window = Cal.com shows no slots for that date.
 */
export async function blockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule          = await getSchedule(scheduleId)
  const weekly            = collectWeeklySlots(schedule)
  const existingOverrides = collectOverrides(schedule)

  // Already has a zero-window block for this date
  if (existingOverrides.some(o => o.date === date && isBlocked(o))) {
    return { alreadyBlocked: true }
  }

  // Remove any existing override for this date (e.g. a previous partial block)
  const filtered = existingOverrides.filter(o => o.date !== date)

  const body = {
    availability: weekly,
    overrides: [
      ...filtered,
      { date, startTime: '00:00', endTime: '00:00' },  // zero window = blocked
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
 * Unblock a date by removing its override entirely.
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

/** Expose isBlocked so BlockTimePanel can identify blocked overrides in the list. */
export { isBlocked }
