import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

// ── Inline SVG icons — no lucide-react ───────────────────────────────────
function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}
function GraduationCapIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function BellIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

const FORMSPREE_ID  = "YOUR_FORMSPREE_ID";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const previews = [
  {
    icon: GraduationCapIcon,
    t: "Courses & Ebooks",
    d: "Self-paced learning to read your own chart.",
  },
];

export default function ShopPage() {
  const [email, setEmail]           = useState("");
  const [done, setDone]             = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ email }),
      });

      if (res.ok) {
        setDone(true);
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO {...PAGE_SEO.shop} robots="noindex, follow" />

      <div className="bg-hero starfield min-h-screen">
        <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
          <Reveal>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto rounded-full gold-border flex items-center justify-center"
            >
              <SparklesIcon className="w-8 h-8 text-gold" />
            </motion.div>

            <span className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-gold">
              Shop
            </span>

            <h1 className="mt-4 text-6xl md:text-7xl">Coming Soon.</h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              A curated collection of ebooks and courses, crafted with the same care as our consultations.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 max-w-md mx-auto glass-card rounded-full p-2 flex items-center"
            >
              <BellIcon className="w-5 h-5 text-gold mx-4" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Notify me at launch"
                type="email"
                required
                disabled={done || submitting}
                className="flex-1 bg-transparent focus:outline-none px-2 py-2 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={done || submitting}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                {done ? "On the list ✓" : submitting ? "Adding…" : "Notify Me"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-xs text-red-400 text-center max-w-md mx-auto">{error}</p>
            )}
            {done && (
              <p className="mt-3 text-xs text-gold/70 text-center max-w-md mx-auto tracking-wide">
                You're on the list. We'll reach out when the shop opens.
              </p>
            )}
          </Reveal>

          <div className="mt-20 grid md:grid-cols-1 gap-6 max-w-sm mx-auto">
            {previews.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-8 hover:shadow-gold transition">
                  <p.icon className="w-7 h-7 text-gold mx-auto" />
                  <h3 className="mt-5 text-xl">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
