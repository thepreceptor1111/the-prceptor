import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useLenisResize } from "@/hooks/useLenisResize";

export function ExperienceSection({ qnaImg }) {
  useLenisResize();

  const { settings } = useSiteSettings();
  const heading    = settings?.experienceSectionHeading ?? "Not sure what to ask?";
  const subheading = settings?.experienceSectionSubheading ?? "Browse common questions from real seekers \u2014 or submit your own.";

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Guidance</span>
            <h2 className="mt-4 text-4xl md:text-5xl">{heading}</h2>
            <p className="mt-6 text-muted-foreground">{subheading}</p>
            <div className="mt-8">
              <Link to="/qna" className="btn-primary inline-flex items-center gap-2">
                Explore Q&amp;A <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {qnaImg && (
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={qnaImg}
                  alt="Q&A section"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "480px" }}
                />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
