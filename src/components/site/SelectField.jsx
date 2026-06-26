/**
 * SelectField — custom styled dropdown with type-to-filter search.
 *
 * Props:
 *   value        {string}          — controlled value
 *   onChange     {(val) => void}   — called with the selected string
 *   options      {string[]}        — list of option strings
 *   placeholder  {string}          — shown when value is ""
 *   label        {string}          — field label above the trigger
 *   error        {string}          — inline validation message
 *   className    {string}          — extra class on the outer wrapper
 *   id           {string}          — for label htmlFor
 *
 * Keyboard: Arrow Up/Down navigate, Enter selects, Escape clears search
 * then closes, Click outside closes.
 */

import { useEffect, useRef, useState } from "react";

// ── Inline SVG icons — removes lucide-react dependency ────────────────────
function ChevronDown({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Check({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Search({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function X({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function SelectField({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  label,
  error,
  className = "",
  id,
}) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(0);
  const containerRef          = useRef(null);
  const listRef               = useRef(null);
  const searchRef             = useRef(null);

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Auto-focus search input when panel opens
  useEffect(() => {
    if (open) {
      setFocused(value ? Math.max(filtered.indexOf(value), 0) : 0);
      setTimeout(() => searchRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset focused index when query changes
  useEffect(() => { setFocused(0); }, [query]);

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focused < 0) return;
    listRef.current?.children?.[focused]?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Native non-passive wheel listener — fallback for browsers/setups
  // where Lenis is not present. data-lenis-prevent handles Lenis itself.
  useEffect(() => {
    const el = listRef.current;
    if (!el || !open) return;
    function handleWheel(e) {
      const atTop    = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if (!(atTop && e.deltaY < 0) && !(atBottom && e.deltaY > 0)) {
        e.stopPropagation();
      }
      e.preventDefault();
      el.scrollTop += e.deltaY;
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [open]);

  function openPanel() {
    setOpen(true);
    setFocused(value ? Math.max(options.indexOf(value), 0) : 0);
  }
  function closePanel() { setOpen(false); setQuery(""); }
  function select(opt)  { onChange(opt); closePanel(); }
  function clearSelection(e) { e.stopPropagation(); onChange(""); }

  function onTriggerKeyDown(e) {
    if (!open && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault(); openPanel();
    }
  }

  function onSearchKeyDown(e) {
    if (e.key === "Escape") { if (query) setQuery(""); else closePanel(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, filtered.length - 1)); return; }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); return; }
    if (e.key === "Enter")     { e.preventDefault(); if (focused >= 0 && filtered[focused]) select(filtered[focused]); return; }
  }

  const displayValue = value || "";

  return (
    <div className={`block ${className}`}>
      {label && (
        <span
          id={id ? `${id}-label` : undefined}
          className="block text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground mb-2"
        >
          {label}
        </span>
      )}

      <div ref={containerRef} className="relative" onKeyDown={onTriggerKeyDown}>
        {/* ── Trigger ── */}
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={id ? `${id}-label` : undefined}
          onClick={openPanel}
          className={[
            "w-full flex items-center justify-between gap-3",
            "bg-secondary/40 border rounded-xl px-4 py-3.5 text-sm text-left transition-all duration-300",
            open
              ? "border-gold bg-secondary/60 ring-2 ring-gold/20"
              : "border-border hover:border-gold/50 hover:bg-secondary/50",
            displayValue ? "text-foreground" : "text-muted-foreground/60",
          ].join(" ")}
        >
          <span className="truncate">{displayValue || placeholder}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {value && (
              <span
                role="button" tabIndex={-1} aria-label="Clear selection"
                onClick={clearSelection}
                className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
              >
                <X className="w-3 h-3" />
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 text-gold transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* ── Dropdown panel ── */}
        {open && (
          <div
            role="listbox"
            aria-label={label || placeholder}
            className="absolute z-50 mt-2 w-full rounded-2xl flex flex-col"
            style={{
              background: "linear-gradient(160deg, oklch(0.22 0.030 270 / 0.97), oklch(0.16 0.025 270 / 0.97))",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid oklch(1 0 0 / 0.09)",
              boxShadow: "0 1px 0 oklch(1 0 0 / 0.06) inset, 0 24px 64px -12px oklch(0 0 0 / 0.60)",
              borderRadius: "1rem",
              overflow: "clip",
            }}
          >
            {/* ── Search input ── */}
            <div className="px-3 pt-3 pb-2 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 py-2">
                <Search className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Type to search…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none min-w-0"
                  aria-label="Search options"
                />
                {query && (
                  <button
                    type="button" onClick={() => setQuery("")}
                    className="text-muted-foreground hover:text-gold transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ── Options list
                  data-lenis-prevent → tells Lenis smooth scroll to ignore
                  wheel events that originate inside this element, preventing
                  the page from scrolling while the user scrolls the list.
            */}
            <div
              ref={listRef}
              data-lenis-prevent
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
                scrollbarColor: "oklch(0.82 0.12 85 / 0.40) transparent",
              }}
            >
              {filtered.length === 0 && (
                <p className="px-4 py-5 text-sm text-center text-muted-foreground/60">
                  No options match &ldquo;{query}&rdquo;
                </p>
              )}
              {filtered.map((opt, i) => {
                const isActive  = opt === value;
                const isFocused = i === focused;
                return (
                  <button
                    key={opt}
                    type="button" role="option" aria-selected={isActive}
                    onMouseEnter={() => setFocused(i)}
                    onClick={() => select(opt)}
                    className={[
                      "w-full flex items-center justify-between gap-3",
                      "px-4 py-3 text-sm text-left transition-all duration-150 border-b last:border-b-0",
                      isFocused || isActive
                        ? "bg-gold/10 text-gold border-gold/10"
                        : "text-foreground/80 border-white/5 hover:bg-white/5",
                    ].join(" ")}
                  >
                    <span className="flex items-center gap-2.5">
                      {isActive  && <span className="w-1 h-4 rounded-full bg-gold shrink-0" />}
                      {!isActive && <span className="w-1 shrink-0" />}
                      {opt}
                    </span>
                    {isActive && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && <span className="block mt-2 text-xs text-destructive">{error}</span>}
    </div>
  );
}
