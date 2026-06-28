import SEO from "@/components/site/SEO";
import { PAGE_SEO, SITE } from "@/content/seo";
import aboutImg from "@/assets/about-section.jpg?format=webp&quality=80";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";

// ── Inline SVG icons — no lucide-react ──────────────────────────
function MailIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SendIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

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

      {/* Hero */}
      <section
        className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${aboutImg})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,8,18,0.9) 0%, rgba(10,8,18,0.4) 40%, rgba(10,8,18,0.9) 100%)",
          }}
        />
        <Reveal>
          <div className="relative z-10 text-center px-6 py-20">
            <span className="block text-xs uppercase tracking-[0.4em] text-gold mb-6">
              Our Story
            </span>
            <h1
              className="font-light leading-[1.05] text-white"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              About The
              <br />
              <span className="tracking-[0.15em] font-semibold">PRECEPTOR</span>
            </h1>
          </div>
        </Reveal>
      </section>

      {/* Short intro paragraphs */}
      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
        <Reveal>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {settings?.aboutParagraph1 ??
              "The Preceptor began as a small private practice for friends seeking real answers. Over 6 years, it has grown into a global consultation studio serving founders, artists, healers, and high-intention seekers across 27+ countries."}
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {settings?.aboutParagraph2 ??
              "Our approach blends classical Vedic astrology, Western tropical analysis, and intuitive symbolic work, translated into clean, modern language you can act on."}
          </p>
        </Reveal>
      </section>

      {/* How The Preceptor Was Born */}
      <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-24">
        <Reveal>
          <h2
            className="text-3xl md:text-4xl text-center bg-gradient-gold"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
          >
            How The Preceptor Was Born
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6 text-base text-muted-foreground leading-[1.85]">
          <Reveal><p>I completed my Bachelor&apos;s degree with Honors in Psychology, and I have been learning and practicing astrology since August 2019, approaching seven years of dedicated study and experience this coming August.</p></Reveal>
          <Reveal><p>My approach to interpreting birth charts is rooted in a unique blend of astrological knowledge and psychological cause-and-effect reasoning, allowing me to derive deeply accurate insights and offer meaningful guidance.</p></Reveal>
          <Reveal><p>But this journey did not begin as a passion. It began as a search for answers.</p></Reveal>
          <Reveal><p>Growing up, life was not easy. In March 2014, I went through one of the most difficult phases of my life, losing someone very close in my family. My paternal uncle, who was my closest companion and the primary caretaker since childhood while both of my parents worked full-time jobs. Loss of a family member, constant bullying at school, feeling lonely all the time, completely unmotivated and unwilling to do anything. That period left me feeling broken, searching desperately for support, understanding, and direction. I needed someone who could guide me, someone who could help me make sense of it all, but no such person appeared. Life, at that time, felt like a constant struggle. (Astrologically, I was approaching the middle of my Saturn seven-and-a-half-year period.)</p></Reveal>
          <Reveal><p>What followed shaped everything.</p></Reveal>
          <Reveal><p>Fast forward to mid August 2019.</p></Reveal>
          <Reveal><p>One day, I came across my printed horoscope in a briefcase in my room, which one of my parents had obtained for me when I was born. At first, I didn&apos;t even understand what I was looking at. In fact, I had always disliked astrology. I had seen how it was often used to instill fear in people and exploit blind faith. That contradiction sparked something in me. Curiosity mixed with skepticism. I decided to study it, not to believe in it, but to disprove it.</p></Reveal>
          <Reveal><p>I began reading my own chart, searching online, watching videos, driven by the intention to expose its flaws. But the deeper I went, the more something unexpected happened.</p></Reveal>
          <Reveal><p className="text-lg text-foreground font-medium">It started making sense.</p></Reveal>
          <Reveal><p>Not in vague terms, but in ways that felt precise and personal. It described my life patterns, my experiences, my nature, my family dynamics, things only I knew. What began as doubt slowly transformed into fascination. I found myself investing all my free time into understanding it, exploring my placements, and uncovering both strengths and challenges within my chart.</p></Reveal>
          <Reveal><p>By the end of August, I was studying astrology every single day. I began analyzing charts of others, diving deeper into planets, their aspects, zodiac signs, nakshatras, dashas, divisional charts, transits and much more. I explored Vedic mythology, the stories, the deities, their symbolism, and the themes they carried&hellip; And I realized something profound.</p></Reveal>
          <Reveal><p className="text-lg text-foreground font-medium">The very thing I had set out to disprove had become a path I could not ignore.</p></Reveal>
          <Reveal><p>In October 2020, after graduating earlier that year, I made the decision to pursue Vedic Astrology formally. I began learning under a renowned astrologer online and committed myself fully to this discipline.</p></Reveal>
          <Reveal><p>As I continued to study and practice, often giving guidance for free, I found myself reflecting on my younger years. I remembered the confusion, the pain, and the deep need for someone wise, honest, and understanding. I didn&apos;t just want guidance back then. I needed a true Preceptor. But I couldn&apos;t find one.</p></Reveal>
          <Reveal><p className="text-lg text-foreground font-medium">So I chose to become one.</p></Reveal>
          <Reveal><p>For every person who comes to me, I carry that intention. I speak honestly, because I know what it feels like to be misled. I guide with sincerity, because I know what it means to search for truth. In every individual I meet, I see a reflection of my past self, seeking clarity, regardless of how complex or simple their situation may be.</p></Reveal>
          <Reveal><p>This is how I stepped into Vedic astrology.</p></Reveal>
          <Reveal><p className="text-lg text-foreground font-medium">This is how I became &ldquo;The Preceptor.&rdquo;</p></Reveal>
          <Reveal><p>This is not a story crafted for effect. It is my life as it unfolded.</p></Reveal>
          <Reveal><p>Some may call it destiny. Others may call it free will.</p></Reveal>
          <Reveal><p>But to me, what truly matters is the intention. To guide those who seek answers, and to stand for those who are still searching.</p></Reveal>
        </div>
      </section>

      {/* Philosophy cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "Mission",    d: "To make profound spiritual insight feel modern, accessible, and quietly luxurious." },
            { t: "Philosophy", d: "Astrology reveals design, not destiny. Knowing your design is the work of a lifetime." },
            { t: "Approach",   d: "Cinematic, focused sessions with a real human. Never templates, never generic readings." },
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

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Contact</span>
          <h2 className="mt-4 text-4xl md:text-5xl">Let&apos;s talk.</h2>
          <p className="mt-5 text-muted-foreground">
            For private enquiries, collaborations, or press, reach out below.
          </p>
          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <MailIcon className="w-5 h-5 text-gold" />
              <a href={`mailto:${email}`} className="hover:text-gold transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPinIcon className="w-5 h-5 text-gold" />
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
              Send Message <SendIcon className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </section>

    </div>
  );
}
