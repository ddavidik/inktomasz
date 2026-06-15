import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/Hero";
import { AboutTeaser } from "~/components/AboutTeaser";
import { Portfolio } from "~/components/Portfolio";
import { WannaDo } from "~/components/WannaDo";
import { AftercareTease } from "~/components/AftercareTease";
import { Testimonials } from "~/components/Testimonials";
import { Inquiry } from "~/components/Inquiry";
import { usePrefillIdea } from "~/hooks/usePrefillIdea";
import { scrollToHash } from "~/utils/scrollToHash";
import { SectionNav } from "~/components/SectionNav";

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
      <AboutTeaser />
      <Portfolio />
      <WannaDo onClaim={handleClaim} />
      <AftercareTease />
      <Testimonials />
      <Inquiry prefill={prefill} onClearPrefill={clearPrefill} />
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
