/**
 * SelectField — custom styled dropdown, drop-in replacement for <select>.
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
 * Keyboard: Arrow Up/Down navigate, Enter/Space select, Escape closes.
 * Click outside closes.
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

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
  const [focused, setFocused] = useState(-1);
  const containerRef          = useRef(null);
  const listRef               = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focused < 0) return;
    listRef.current?.children?.[focused]?.scrollIntoView({ block: "nearest" });
  }, [focused, open]);

  function toggle() { setOpen((o) => !o); setFocused(value ? options.indexOf(value) : 0); }

  function select(opt) {
    onChange(opt);
    setOpen(false);
    setFocused(-1);
  }

  function onKeyDown(e) {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
        setFocused(value ? options.indexOf(value) : 0);
      }
      return;
    }
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, options.length - 1)); return; }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); return; }
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (focused >= 0) select(options[focused]); return; }
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

      <div ref={containerRef} className="relative" onKeyDown={onKeyDown}>
        {/* ── Trigger ── */}
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={id ? `${id}-label` : undefined}
          onClick={toggle}
          className={[
            "w-full flex items-center justify-between gap-3",
            "bg-secondary/40 border rounded-xl px-4 py-3.5 text-sm text-left",
            "transition-all duration-300",
            open
              ? "border-gold bg-secondary/60 ring-2 ring-gold/20"
              : "border-border hover:border-gold/50 hover:bg-secondary/50",
            displayValue ? "text-foreground" : "text-muted-foreground/60",
          ].join(" ")}
        >
          <span className="truncate">{displayValue || placeholder}</span>
          <ChevronDown
            className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* ── Dropdown panel ── */}
        {open && (
          <div
            role="listbox"
            ref={listRef}
            aria-label={label || placeholder}
            className="absolute z-50 mt-2 w-full rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.22 0.030 270 / 0.96), oklch(0.16 0.025 270 / 0.96))",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid oklch(1 0 0 / 0.09)",
              boxShadow:
                "0 1px 0 oklch(1 0 0 / 0.06) inset, 0 24px 64px -12px oklch(0 0 0 / 0.60)",
              maxHeight: "260px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "oklch(0.82 0.12 85 / 0.40) transparent",
            }}
          >
            {options.map((opt, i) => {
              const isActive  = opt === value;
              const isFocused = i === focused;
              return (
                <button
                  key={opt}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setFocused(i)}
                  onClick={() => select(opt)}
                  className={[
                    "w-full flex items-center justify-between gap-3",
                    "px-4 py-3 text-sm text-left transition-all duration-150",
                    "border-b last:border-b-0",
                    isFocused || isActive
                      ? "bg-gold/10 text-gold border-gold/10"
                      : "text-foreground/80 border-white/5 hover:bg-white/5",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2.5">
                    {isActive && (
                      <span className="w-1 h-4 rounded-full bg-gold shrink-0" />
                    )}
                    {!isActive && <span className="w-1 shrink-0" />}
                    {opt}
                  </span>
                  {isActive && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <span className="block mt-2 text-xs text-destructive">{error}</span>
      )}
    </div>
  );
}
