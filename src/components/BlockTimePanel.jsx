// src/components/BlockTimePanel.jsx
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarOff, CalendarCheck, Clock, Loader, X, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react'
import { getDefaultSchedule, blockDate, unblockDate } from '@/lib/calcom'

export default function BlockTimePanel() {
  const today = new Date().toISOString().split('T')[0]

  const [schedule,    setSchedule]    = useState(null)
  const [loadingInit, setLoadingInit] = useState(true)
  const [initError,   setInitError]   = useState(null)

  const [form, setForm] = useState({
    date:      today,
    allDay:    true,
    startTime: '09:00',
    endTime:   '18:00',
  })

  const [blocking,   setBlocking]   = useState(false)
  const [removing,   setRemoving]   = useState(null)   // date string being removed
  const [actionErr,  setActionErr]  = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  // Derive the list of currently-blocked date overrides
  const blockedDates = schedule?.availability
    ? schedule.availability.filter(a => a.date && a.isUnavailable)
    : []

  const flash = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  const loadSchedule = useCallback(async () => {
    setLoadingInit(true)
    setInitError(null)
    try {
      const s = await getDefaultSchedule()
      setSchedule(s)
    } catch (e) {
      setInitError(e.message)
    } finally {
      setLoadingInit(false)
    }
  }, [])

  useEffect(() => { loadSchedule() }, [loadSchedule])

  const handleBlock = async () => {
    if (!form.date || !schedule) return
    setBlocking(true)
    setActionErr(null)
    try {
      const result = await blockDate(
        schedule.id,
        form.date,
        form.allDay,
        form.startTime,
        form.endTime,
        schedule.availability ?? []
      )
      if (result?.alreadyBlocked) {
        setActionErr('This date is already blocked.')
      } else {
        await loadSchedule()
        flash(`${form.date} blocked on Cal.com ✓`)
        setForm(f => ({ ...f, date: today }))
      }
    } catch (e) {
      setActionErr(e.message)
    } finally {
      setBlocking(false)
    }
  }

  const handleUnblock = async (date) => {
    if (!schedule) return
    setRemoving(date)
    setActionErr(null)
    try {
      await unblockDate(schedule.id, date, schedule.availability ?? [])
      await loadSchedule()
      flash(`${date} is now open for bookings ✓`)
    } catch (e) {
      setActionErr(e.message)
    } finally {
      setRemoving(null)
    }
  }

  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const hasApiKey = !!import.meta.env.VITE_CALCOM_API_KEY

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-8 border border-gold/10 hover:border-gold/25 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.82_0.12_85_/_0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/25 flex items-center justify-center">
              <CalendarOff className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif">Block Booking Dates</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dates blocked here are immediately greyed out on Cal.com.
              </p>
            </div>
          </div>
          <button
            onClick={loadSchedule}
            disabled={loadingInit}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/30 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingInit ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* No API Key warning */}
        {!hasApiKey && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 text-xs mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              <strong>VITE_CALCOM_API_KEY</strong> is not set in your environment variables.
              Add it in Vercel → Settings → Environment Variables, then redeploy.
            </span>
          </div>
        )}

        {/* Init error */}
        {initError && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs mb-6">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{initError}</span>
          </div>
        )}

        {/* Success flash */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-xs mb-6"
            >
              <CheckCircle className="w-4 h-4" /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Currently Blocked ── */}
        {loadingInit ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Loader className="w-3.5 h-3.5 animate-spin" /> Loading schedule from Cal.com…
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Currently Blocked
            </p>

            {blockedDates.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground mb-6">
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                No dates blocked — all slots are open.
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {blockedDates.map(b => (
                  <div
                    key={b.date}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-red-500/8 border border-red-400/20 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarOff className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="font-medium">{fmt(b.date)}</span>
                      {b.startTime && !b.isUnavailable && (
                        <span className="text-xs text-muted-foreground">
                          {b.startTime.slice(11,16)} – {b.endTime?.slice(11,16)}
                        </span>
                      )}
                      <span className="text-xs text-red-400/70 ml-1">Blocked</span>
                    </div>
                    <button
                      onClick={() => handleUnblock(b.date)}
                      disabled={removing === b.date}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition"
                      title="Remove block"
                    >
                      {removing === b.date
                        ? <Loader className="w-3.5 h-3.5 animate-spin" />
                        : <X className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Add Block Form ── */}
        <div className="pt-6 border-t border-border/50 space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Add New Block</p>

          {/* All-day toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set('allDay', !form.allDay)}
              className={`relative w-10 h-5 rounded-full border transition-colors duration-200 ${
                form.allDay
                  ? 'bg-gold/30 border-gold/50'
                  : 'bg-secondary/50 border-border'
              }`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
                form.allDay
                  ? 'left-5 bg-gold'
                  : 'left-0.5 bg-muted-foreground'
              }`} />
            </div>
            <span className="text-sm text-muted-foreground">
              {form.allDay ? 'Block entire day' : 'Block specific hours'}
            </span>
          </label>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Date <span className="text-red-400">*</span></label>
            <input
              type="date"
              value={form.date}
              min={today}
              onChange={e => set('date', e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
            />
          </div>

          {/* Time range — only when not all-day */}
          <AnimatePresence>
            {!form.allDay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 gap-4 overflow-hidden"
              >
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Start
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={e => set('startTime', e.target.value)}
                    className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> End
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={e => set('endTime', e.target.value)}
                    className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview */}
          {form.date && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
              <CalendarOff className="w-3.5 h-3.5 text-red-400" />
              Will block: <strong className="text-foreground">{fmt(form.date)}</strong>
              {form.allDay
                ? <span className="text-red-400/70 ml-1">(all day)</span>
                : <span className="text-red-400/70 ml-1">{form.startTime} – {form.endTime}</span>
              }
            </div>
          )}

          {/* Action error */}
          {actionErr && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {actionErr}
            </div>
          )}

          <button
            onClick={handleBlock}
            disabled={blocking || loadingInit || !form.date || !hasApiKey}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/15 border border-red-400/35 text-red-300 text-sm hover:bg-red-500/25 hover:text-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {blocking
              ? <><Loader className="w-4 h-4 animate-spin" /> Blocking on Cal.com…</>
              : <><CalendarOff className="w-4 h-4" /> Block This Date</>
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}
