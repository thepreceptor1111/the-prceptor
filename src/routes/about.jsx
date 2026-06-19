import SEO from "@/components/site/SEO";
import { PAGE_SEO, SITE } from "@/content/seo";
import { Mail, MapPin, Send } from "lucide-react";
import aboutImg from "@/assets/about-section.jpg?format=webp&quality=80";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function AboutWrapper() {
  return (
    <>
      <SEO {...PAGE_SEO.about} />
      <AboutContent />
    </>
  );
}

function AboutContent() {
  const { settings } = useSiteSettings();

  const email = settings?.email ?? SITE.email;

  function handleContactSubmit(e) {
    e.preventDefault();
    const fd   = new FormData(e.currentTarget);
    const name = fd.get("name")    || "";
    const subj = fd.get("subject") || "Enquiry";
    const body = fd.get("message") || "";
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(`Hi,\n\nName: ${name}\n\n${body}`)}`;
    window.location.href = mailto;
  }

  return (
    <div className="bg-hero starfield">

      {/* ── Hero ── full-bleed image bg with title overlay */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">

        <img
          src={aboutImg}
          alt=""
          aria-hidden="true"
          width={1800}
          height={1200}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.50 }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,8,18,0.30) 0%, rgba(10,8,18,0.10) 40%, rgba(10,8,18,0.65) 100%)",
          }}
        />

        <Reveal>
          <div className="relative z-10 text-center px-6 py-24">
            <span className="block text-xs uppercase tracking-[0.4em] text-gold mb-6">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] bg-gradient-gold">
              About The
              <br />
              <span className="tracking-[0.15em] font-semibold">PRECEPTOR</span>
            </h1>
          </div>
        </Reveal>
      </section>

      {/* ── Story paragraphs ── */}
      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {settings?.aboutParagraph1 ??
              "The Preceptor began as a small private practice for friends seeking real answers. Over 7 years, it has grown into a global consultation studio serving founders, artists, healers, and high-intention seekers across 18+ countries."}
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {settings?.aboutParagraph2 ??
              "Our approach blends classical Vedic astrology, Western tropical analysis, and intuitive symbolic work — translated into clean, modern language you can act on."}
          </p>
        </Reveal>
      </section>

      {/* ── Philosophy cards ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Mission",    d: "To make profound spiritual insight feel modern, accessible, and quietly luxurious." },
            { t: "Philosophy", d: "Astrology reveals design, not destiny. Knowing your design is the work of a lifetime." },
            { t: "Approach",   d: "Cinematic, focused sessions with a real human — never templates, never generic readings." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-8 h-full">
                <h3 className="text-2xl text-gold">{c.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Contact</span>
          <h2 className="mt-4 text-4xl md:text-5xl">Let's talk.</h2>
          <p className="mt-5 text-muted-foreground">
            For private enquiries, collaborations, or press — reach out below.
          </p>
          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold" />
              <a href={`mailto:${email}`} className="hover:text-gold transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-gold" />
              <span>Worldwide · Online consultations</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleContactSubmit}
            className="glass-card rounded-3xl p-8 space-y-5 shadow-elegant"
          >
            <input
              name="name"
              placeholder="Full Name"
              required
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-gold focus:outline-none"
            />
            <input
              name="email"
              placeholder="Email"
              type="email"
              required
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-gold focus:outline-none"
            />
            <input
              name="subject"
              placeholder="Subject"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-gold focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition"
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </section>

    </div>
  );
}
