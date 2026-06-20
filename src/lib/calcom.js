// src/lib/calcom.js
// Cal.com API v2 — schedule & date-override helpers
//
// GROUND TRUTH from official Cal.com docs:
//   overrides[] schema: { date: "YYYY-MM-DD", startTime: "HH:MM", endTime: "HH:MM" }
//   There is NO isUnavailable field.
//   To BLOCK a date:    send override with startTime: "00:00", endTime: "00:00"
//   To RESTRICT a date: send override with a real window e.g. "14:00"/"18:00"
//   A zero-length window = no slots available = date is fully blocked.

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
 * Fetch a single schedule by ID — returns the FULL object including
 * the complete overrides[] array. Always use this after a mutation so
 * the UI reflects the true state (the list endpoint may return a
 * condensed shape without overrides).
 */
export async function getSchedule(scheduleId) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')
  const res = await fetch(`${BASE}/schedules/${scheduleId}`, { headers: hdrs() })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  const json = await res.json()
  return json.data ?? json
}

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

/**
 * Safely extract HH:MM from any time string Cal.com may return:
 *   - "HH:MM"                    → plain prefix
 *   - "HH:MM:SS"                 → slice first 5 chars
 *   - "2025-06-20T14:00:00.000Z" → extract after 'T'
 */
const toHHMM = (t = '') => {
  const s = String(t)
  const isoMatch   = s.match(/T(\d{2}:\d{2})/)
  if (isoMatch)   return isoMatch[1]
  const plainMatch = s.match(/^(\d{2}:\d{2})/)
  if (plainMatch) return plainMatch[1]
  return s
}

/** Normalise a weekly slot for PATCH. */
function normaliseWeeklySlot(slot) {
  return {
    days:      (slot.days ?? []).map(d => {
      if (typeof d === 'number') return DAY_NAMES[d] ?? d
      return d
    }),
    startTime: toHHMM(slot.startTime),
    endTime:   toHHMM(slot.endTime),
  }
}

/** Normalise a date override for PATCH. Only date/startTime/endTime — no extra fields. */
function normaliseDateOverride(o) {
  return {
    date:      o.date,
    startTime: toHHMM(o.startTime),
    endTime:   toHHMM(o.endTime),
  }
}

/**
 * A BLOCKED date: startTime === endTime === '00:00' (zero-length window).
 * Cal.com shows no available slots for this date.
 */
export function isBlocked(o) {
  const st = toHHMM(o.startTime)
  const et = toHHMM(o.endTime)
  return st === '00:00' && et === '00:00'
}

/**
 * A RESTRICTED date: has a real time window (startTime !== endTime)
 * AND is not the default zero-window block.
 * Cal.com shows slots ONLY within this window for this date.
 */
export function isRestricted(o) {
  const st = toHHMM(o.startTime)
  const et = toHHMM(o.endTime)
  // Must have a real window and not be a full block
  return st !== et && !(st === '00:00' && et === '00:00')
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

// ─── Helpers shared by write functions ───────────────────────────────────────

async function patchSchedule(scheduleId, body) {
  const res = await fetch(`${BASE}/schedules/${scheduleId}`, {
    method:  'PATCH',
    headers: hdrs(),
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Cal.com ${res.status}: ${await res.text()}`)
  return res.json()
}

// ─── Full-day Block ───────────────────────────────────────────────────────────

/**
 * Block an entire day: override with startTime=endTime="00:00".
 * Zero-length window = Cal.com shows NO slots for that date.
 */
export async function blockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule          = await getSchedule(scheduleId)
  const weekly            = collectWeeklySlots(schedule)
  const existingOverrides = collectOverrides(schedule)

  if (existingOverrides.some(o => o.date === date && isBlocked(o))) {
    return { alreadyBlocked: true }
  }

  const filtered = existingOverrides.filter(o => o.date !== date)

  return patchSchedule(scheduleId, {
    availability: weekly,
    overrides: [
      ...filtered,
      { date, startTime: '00:00', endTime: '00:00' },
    ],
  })
}

/**
 * Remove a full-day block (or any override) for a date.
 */
export async function unblockDate(scheduleId, date) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  const schedule  = await getSchedule(scheduleId)
  const weekly    = collectWeeklySlots(schedule)
  const remaining = collectOverrides(schedule).filter(o => o.date !== date)

  return patchSchedule(scheduleId, {
    availability: weekly,
    overrides:    remaining,
  })
}

// ─── Custom Hour Restriction ──────────────────────────────────────────────────

/**
 * Restrict a date to a specific time window.
 * e.g. setDateHours(id, '2025-06-25', '14:00', '18:00')
 *   → Cal.com will only show slots between 2pm–6pm on that date.
 *
 * Replaces any existing override for the same date (block or prior restriction).
 * Validates that startTime < endTime before calling the API.
 */
export async function setDateHours(scheduleId, date, startTime, endTime) {
  if (!API_KEY) throw new Error('VITE_CALCOM_API_KEY is not set.')

  // Validate window
  if (!startTime || !endTime) throw new Error('Both start time and end time are required.')
  if (startTime >= endTime)   throw new Error('Start time must be before end time.')

  const schedule          = await getSchedule(scheduleId)
  const weekly            = collectWeeklySlots(schedule)
  const existingOverrides = collectOverrides(schedule)

  // Remove any existing override for this date (block or prior restriction)
  const filtered = existingOverrides.filter(o => o.date !== date)

  return patchSchedule(scheduleId, {
    availability: weekly,
    overrides: [
      ...filtered,
      { date, startTime, endTime },
    ],
  })
}

/**
 * Remove a custom hour restriction for a date (same as unblockDate —
 * both remove the override entirely, restoring the default weekly schedule).
 */
export async function removeRestriction(scheduleId, date) {
  return unblockDate(scheduleId, date)
}
