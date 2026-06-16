import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/Hero";
import { AboutTeaser } from "~/components/AboutTeaser";
import { Portfolio } from "~/components/Portfolio";
import { WannaDo } from "~/components/WannaDo";
import { AftercareTease } from "~/components/AftercareTease";
import { Testimonials } from "~/components/Testimonials";
import { Inquiry } from "~/components/Inquiry";
import { SectionDivider } from "~/components/SectionDivider";
import { usePrefillIdea } from "~/hooks/usePrefillIdea";
import { scrollToHash } from "~/utils/scrollToHash";
import { SectionNav } from "~/components/SectionNav";
import site from "@content/site.json";

const HOME_SECTIONS = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "wannado", label: "Wanna-do" },
  { id: "care", label: "Care" },
  { id: "voices", label: "Voices" },
  { id: "inquire", label: "Inquire" },
];

const Home = () => {
  const { prefill, setPrefillIdea, clearPrefill } = usePrefillIdea();

  const handleClaim = (id: string, title: string) => {
    setPrefillIdea(id, title);
    window.history.pushState(null, "", "/#inquire");
    scrollToHash("inquire");
  };

  return (
    <>
      <SectionNav sections={HOME_SECTIONS} />
      <Hero />
      <SectionDivider rune={site.aboutTeaserSection.rune} />
      <AboutTeaser />
      <SectionDivider rune={site.portfolioSection.rune} />
      <Portfolio />
      <SectionDivider rune={site.wannadoSection.rune} />
      <WannaDo onClaim={handleClaim} />
      <SectionDivider rune={site.aftercarePageSection.rune} />
      <AftercareTease />
      <SectionDivider rune={site.testimonialsSection.rune} />
      <Testimonials />
      <SectionDivider rune={site.inquiry.kickerRune} />
      <Inquiry prefill={prefill} onClearPrefill={clearPrefill} />
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
