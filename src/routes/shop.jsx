import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Gem, GraduationCap, Bell } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

/**
 * Replace YOUR_FORMSPREE_ID with your actual Formspree form ID.
 * Steps:
 *   1. Go to https://formspree.io and sign up (free)
 *   2. Create a new form → copy the ID from the endpoint URL
 *      e.g. https://formspree.io/f/xpwzgkqb  →  ID is "xpwzgkqb"
 *   3. Replace the string below with that ID
 */
const FORMSPREE_ID = "YOUR_FORMSPREE_ID";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const previews = [
  {
    icon: BookOpen,
    t: "Astrology Reports",
    d: "Personalised written natal and yearly forecasts.",
  },
  {
    icon: Gem,
    t: "Spiritual Products",
    d: "Hand-curated objects for your altar and rituals.",
  },
  {
    icon: GraduationCap,
    t: "Courses & Ebooks",
    d: "Self-paced learning to read your own chart.",
  },
];

export default function ShopPage() {
  const [email, setEmail]         = useState("");
  const [done, setDone]           = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState(null);

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
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-20 h-20 mx-auto rounded-full gold-border flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>

            <span className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-gold">
              Shop
            </span>

            <h1 className="mt-4 text-6xl md:text-7xl">
              Coming Soon.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              A curated collection of reports, products, ebooks and courses —
              crafted with the same care as our consultations.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="mt-12 max-w-md mx-auto glass-card rounded-full p-2 flex items-center"
            >
              <Bell className="w-5 h-5 text-gold mx-4" />

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

            {/* Error message — only shown on failure */}
            {error && (
              <p className="mt-3 text-xs text-red-400 text-center max-w-md mx-auto">
                {error}
              </p>
            )}

            {/* Success message — only shown after successful submission */}
            {done && (
              <p className="mt-3 text-xs text-gold/70 text-center max-w-md mx-auto tracking-wide">
                You're on the list. We'll reach out when the shop opens.
              </p>
            )}
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {previews.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-8 hover:shadow-gold transition">
                  <p.icon className="w-7 h-7 text-gold mx-auto" />

                  <h3 className="mt-5 text-xl">
                    {p.t}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
