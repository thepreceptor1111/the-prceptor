// src/components/RestrictHoursPanel.jsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDefaultSchedule, getSchedule, setDateHours, removeRestriction, isRestricted } from '@/lib/calcom'

// ── Inline SVG icons — no lucide-react ───────────────────────────────────
function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function CalendarCheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}
function LoaderIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}
function AlertCircleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
function CheckCircleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}
function RefreshCwIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
function CalendarClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h5" />
      <circle cx="18" cy="18" r="4" />
      <path d="M18 16v2l1 1" />
    </svg>
  );
}

export default function RestrictHoursPanel() {
  const today = new Date().toISOString().split('T')[0]

  const [schedule,    setSchedule]    = useState(null)
  const [loadingInit, setLoadingInit] = useState(true)
  const [initError,   setInitError]   = useState(null)
  const [date,        setDate]        = useState(today)
  const [startTime,   setStartTime]   = useState('09:00')
  const [endTime,     setEndTime]     = useState('17:00')
  const [saving,      setSaving]      = useState(false)
  const [removing,    setRemoving]    = useState(null)
  const [actionErr,   setActionErr]   = useState(null)
  const [successMsg,  setSuccessMsg]  = useState(null)

  const scheduleIdRef = useRef(null)
  const isMutating    = useRef(false)

  const restrictedDates = schedule
    ? [
        ...(schedule.overrides   ?? []),
        ...(schedule.availability ?? []).filter(a => !!a.date),
      ].filter(isRestricted)
    : []

  const flash = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(null), 3500)
  }

  const loadSchedule = useCallback(async () => {
    setLoadingInit(true)
    setInitError(null)
    try {
      let s
      if (scheduleIdRef.current) {
        s = await getSchedule(scheduleIdRef.current)
      } else {
        const discovered = await getDefaultSchedule()
        scheduleIdRef.current = discovered.id
        s = await getSchedule(discovered.id)
      }
      setSchedule(s)
    } catch (e) {
      setInitError(e.message)
    } finally {
      setLoadingInit(false)
    }
  }, [])

  useEffect(() => { loadSchedule() }, [loadSchedule])

  const handleSave = async () => {
    if (!date || !schedule || isMutating.current) return
    if (!startTime || !endTime) {
      setActionErr('Both start and end time are required.')
      return
    }
    if (startTime >= endTime) {
      setActionErr('Start time must be before end time.')
      return
    }
    isMutating.current = true
    setSaving(true)
    setActionErr(null)
    try {
      await setDateHours(schedule.id, date, startTime, endTime)
      await loadSchedule()
      flash(`${date} restricted to ${startTime}–${endTime} ✓`)
      setDate(today)
      setStartTime('09:00')
      setEndTime('17:00')
    } catch (e) {
      setActionErr(e.message)
    } finally {
      isMutating.current = false
      setSaving(false)
    }
  }

  const handleRemove = async (d) => {
    if (!schedule || isMutating.current) return
    isMutating.current = true
    setRemoving(d)
    setActionErr(null)
    try {
      await removeRestriction(schedule.id, d)
      await loadSchedule()
      flash(`${d} restored to default schedule ✓`)
    } catch (e) {
      setActionErr(e.message)
    } finally {
      isMutating.current = false
      setRemoving(null)
    }
  }

  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })

  const fmtTime = (t) => {
    const [h, m] = t.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12  = h % 12 || 12
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const hasApiKey   = !!import.meta.env.VITE_CALCOM_API_KEY
  const anyMutating = saving || removing !== null
  const isValid     = date && startTime && endTime && startTime < endTime

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.34, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-8 border border-gold/10 hover:border-gold/25 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.55_0.09_280_/_0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center">
              <CalendarClockIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif">Restrict Day Hours</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Limit a date to a specific time window on Cal.com.
              </p>
            </div>
          </div>
          <button
            onClick={loadSchedule}
            disabled={loadingInit || anyMutating}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Refresh"
          >
            <RefreshCwIcon className={`w-3.5 h-3.5 ${loadingInit ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {!hasApiKey && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs mb-6">
            <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>VITE_CALCOM_API_KEY</strong> is not set in Vercel environment variables.</span>
          </div>
        )}

        {initError && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs mb-6">
            <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{initError}</span>
          </div>
        )}

        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-xs mb-6"
            >
              <CheckCircleIcon className="w-4 h-4" /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {loadingInit ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <LoaderIcon className="w-3.5 h-3.5 animate-spin" /> Loading schedule from Cal.com…
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Currently Restricted</p>
            {restrictedDates.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground mb-6">
                <CalendarCheckIcon className="w-4 h-4 text-emerald-400" />
                No custom hour restrictions — all days follow the default schedule.
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {restrictedDates.map(r => (
                  <div key={r.date} className="flex items-center justify-between px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-400/20 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarClockIcon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <div>
                        <span className="font-medium">{fmt(r.date)}</span>
                        <span className="ml-2 text-xs text-amber-400/80">
                          {fmtTime(r.startTime)} – {fmtTime(r.endTime)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(r.date)}
                      disabled={anyMutating || loadingInit}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-amber-400 hover:bg-amber-400/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Remove restriction"
                    >
                      {removing === r.date
                        ? <LoaderIcon className="w-3.5 h-3.5 animate-spin" />
                        : <XIcon className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="pt-6 border-t border-border/50 space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Set Custom Hours</p>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Date <span className="text-amber-400">*</span></label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">
                <ClockIcon className="w-3 h-3 inline mr-1" />From <span className="text-amber-400">*</span>
              </label>
              <input
                type="time"
                value={startTime}
                min="07:00"
                max="21:30"
                step="1800"
                onChange={e => setStartTime(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">
                <ClockIcon className="w-3 h-3 inline mr-1" />Until <span className="text-amber-400">*</span>
              </label>
              <input
                type="time"
                value={endTime}
                min="07:30"
                max="22:00"
                step="1800"
                onChange={e => setEndTime(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
              />
            </div>
          </div>

          {date && isValid && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
              <CalendarClockIcon className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-foreground">{fmt(date)}</strong>
              <span className="mx-1">— only</span>
              <span className="text-amber-300 font-medium">{fmtTime(startTime)} – {fmtTime(endTime)}</span>
              <span className="ml-1">will be bookable</span>
            </div>
          )}

          {date && startTime && endTime && startTime >= endTime && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Start time must be earlier than end time.
            </div>
          )}

          {actionErr && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {actionErr}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={anyMutating || loadingInit || !isValid || !hasApiKey}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-300 text-sm hover:bg-amber-500/25 hover:text-amber-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {saving
              ? <><LoaderIcon className="w-4 h-4 animate-spin" /> Saving to Cal.com…</>
              : <><CalendarClockIcon className="w-4 h-4" /> Set Custom Hours</>
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}
