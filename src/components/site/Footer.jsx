import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/content/site";

// Reddit SVG icon — not in lucide-react, inlined as a minimal SVG component
function RedditIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 mt-32 bg-deep overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-gold font-serif text-3xl">✦</span>
            <span className="font-serif text-2xl tracking-wide">{siteConfig.name}</span>
          </Link>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            A modern sanctuary for spiritual clarity. Premium astrology consultations for high-intention seekers globally.
          </p>
          <div className="flex gap-3 mt-8">
            {[
              { Icon: Instagram,  href: siteConfig.social.instagram, label: "Instagram" },
              { Icon: RedditIcon, href: siteConfig.social.reddit,    label: "Reddit" },
              { Icon: Mail,       href: `mailto:${siteConfig.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-gold hover:scale-110 hover:shadow-gold transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Explore</p>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {footerLinks.explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Contact</p>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gold/70 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition">{siteConfig.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-gold/70 shrink-0" />
              Worldwide · Private online sessions
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground transition">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
