// src/components/RestrictHoursPanel.jsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CalendarCheck, Loader, X, AlertCircle, CheckCircle, RefreshCw, CalendarClock } from 'lucide-react'
import { getDefaultSchedule, getSchedule, setDateHours, removeRestriction, isRestricted } from '@/lib/calcom'

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

  // Restricted dates = overrides with a real time window (not a zero block)
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
    // Client-side validation
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

  const hasApiKey  = !!import.meta.env.VITE_CALCOM_API_KEY
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-amber-400" />
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
            <RefreshCw className={`w-3.5 h-3.5 ${loadingInit ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* No API Key */}
        {!hasApiKey && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span><strong>VITE_CALCOM_API_KEY</strong> is not set in Vercel environment variables.</span>
          </div>
        )}

        {/* Init error */}
        {initError && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{initError}</span>
          </div>
        )}

        {/* Success */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-xs mb-6"
            >
              <CheckCircle className="w-4 h-4" /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Currently Restricted */}
        {loadingInit ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Loader className="w-3.5 h-3.5 animate-spin" /> Loading schedule from Cal.com…
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Currently Restricted</p>
            {restrictedDates.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground mb-6">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                No custom hour restrictions — all days follow the default schedule.
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {restrictedDates.map(r => (
                  <div key={r.date} className="flex items-center justify-between px-4 py-3 rounded-xl bg-amber-500/8 border border-amber-400/20 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarClock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
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
                        ? <Loader className="w-3.5 h-3.5 animate-spin" />
                        : <X className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Add Restriction */}
        <div className="pt-6 border-t border-border/50 space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Set Custom Hours</p>

          {/* Date picker */}
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

          {/* Time pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />From <span className="text-amber-400">*</span>
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
                <Clock className="w-3 h-3 inline mr-1" />Until <span className="text-amber-400">*</span>
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

          {/* Preview */}
          {date && isValid && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
              <CalendarClock className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-foreground">{fmt(date)}</strong>
              <span className="mx-1">— only</span>
              <span className="text-amber-300 font-medium">{fmtTime(startTime)} – {fmtTime(endTime)}</span>
              <span className="ml-1">will be bookable</span>
            </div>
          )}

          {/* Validation error */}
          {date && startTime && endTime && startTime >= endTime && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Start time must be earlier than end time.
            </div>
          )}

          {actionErr && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {actionErr}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={anyMutating || loadingInit || !isValid || !hasApiKey}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-300 text-sm hover:bg-amber-500/25 hover:text-amber-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {saving
              ? <><Loader className="w-4 h-4 animate-spin" /> Saving to Cal.com…</>
              : <><CalendarClock className="w-4 h-4" /> Set Custom Hours</>
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}
