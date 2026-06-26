// src/components/BlockTimePanel.jsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getDefaultSchedule, getSchedule, blockDate, unblockDate, isBlocked } from '@/lib/calcom'

// ── Inline SVG icons — no lucide-react ───────────────────────────────────
function CalendarOffIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M4 14.899A7 7 0 1 1 15.05 6M16 2v4M2 2l20 20M8.56 2.1A7.001 7.001 0 0 0 5 7v4" />
      <path d="M8 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h4" />
      <path d="m14 10-2 2m0 0-2 2m2-2 2 2m-2-2-2-2" />
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

export default function BlockTimePanel() {
  const today = new Date().toISOString().split('T')[0]

  const [schedule,    setSchedule]    = useState(null)
  const [loadingInit, setLoadingInit] = useState(true)
  const [initError,   setInitError]   = useState(null)
  const [date,        setDate]        = useState(today)
  const [blocking,    setBlocking]    = useState(false)
  const [removing,    setRemoving]    = useState(null)
  const [actionErr,   setActionErr]   = useState(null)
  const [successMsg,  setSuccessMsg]  = useState(null)

  const scheduleIdRef = useRef(null)
  const isMutating = useRef(false)

  const blockedDates = schedule
    ? [
        ...(schedule.overrides   ?? []),
        ...(schedule.availability ?? []).filter(a => !!a.date),
      ].filter(isBlocked)
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

  const handleBlock = async () => {
    if (!date || !schedule || isMutating.current) return
    isMutating.current = true
    setBlocking(true)
    setActionErr(null)
    try {
      const result = await blockDate(schedule.id, date)
      if (result?.alreadyBlocked) {
        setActionErr('This date is already blocked.')
      } else {
        await loadSchedule()
        flash(`${date} blocked — no slots will show on Cal.com ✓`)
        setDate(today)
      }
    } catch (e) {
      setActionErr(e.message)
    } finally {
      isMutating.current = false
      setBlocking(false)
    }
  }

  const handleUnblock = async (d) => {
    if (!schedule || isMutating.current) return
    isMutating.current = true
    setRemoving(d)
    setActionErr(null)
    try {
      await unblockDate(schedule.id, d)
      await loadSchedule()
      flash(`${d} is now open for bookings ✓`)
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

  const hasApiKey = !!import.meta.env.VITE_CALCOM_API_KEY
  const anyMutating = blocking || removing !== null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-8 border border-gold/10 hover:border-gold/25 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.82_0.12_85_/_0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-400/25 flex items-center justify-center">
              <CalendarOffIcon className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-serif">Block Booking Dates</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Blocked dates show no available slots on Cal.com.
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
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Currently Blocked</p>
            {blockedDates.length === 0 ? (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground mb-6">
                <CalendarCheckIcon className="w-4 h-4 text-emerald-400" />
                No dates blocked — all slots are open.
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {blockedDates.map(b => (
                  <div key={b.date} className="flex items-center justify-between px-4 py-3 rounded-xl bg-red-500/8 border border-red-400/20 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarOffIcon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span className="font-medium">{fmt(b.date)}</span>
                      <span className="text-xs text-red-400/70 ml-1">No slots</span>
                    </div>
                    <button
                      onClick={() => handleUnblock(b.date)}
                      disabled={anyMutating || loadingInit}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Remove block"
                    >
                      {removing === b.date
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
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Block a Date</p>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Date <span className="text-red-400">*</span></label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
            />
          </div>

          {date && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground">
              <CalendarOffIcon className="w-3.5 h-3.5 text-red-400" />
              Will block: <strong className="text-foreground ml-1">{fmt(date)}</strong>
              <span className="text-red-400/70 ml-1">(entire day — all slots removed)</span>
            </div>
          )}

          {actionErr && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-400/25 text-red-300 text-xs">
              <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {actionErr}
            </div>
          )}

          <button
            onClick={handleBlock}
            disabled={anyMutating || loadingInit || !date || !hasApiKey}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/15 border border-red-400/35 text-red-300 text-sm hover:bg-red-500/25 hover:text-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {blocking
              ? <><LoaderIcon className="w-4 h-4 animate-spin" /> Blocking on Cal.com…</>
              : <><CalendarOffIcon className="w-4 h-4" /> Block This Date</>
            }
          </button>
        </div>
      </div>
    </motion.div>
  )
}
