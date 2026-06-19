import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { siteConfig, footerLinks } from "@/content/site";

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
            A modern sanctuary for spiritual clarity. Premium astrology consultations for high-intention seekers across the United States and around the world.
          </p>
          <div className="flex gap-3 mt-8">
            {[
              { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
              { Icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-gold hover:scale-110 hover:shadow-gold transition-all duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {footerLinks.explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Contact</h4>
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
