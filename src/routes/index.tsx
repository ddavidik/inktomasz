import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "~/components/Hero";
import { AboutTeaser } from "~/components/AboutTeaser";
import { Portfolio } from "~/components/Portfolio";
import { WannaDo } from "~/components/WannaDo";
import { AftercareTease } from "~/components/AftercareTease";
import { Inquiry } from "~/components/Inquiry";

const Home = () => (
  <>
    <Hero />
    <AboutTeaser />
    <Portfolio />
    <WannaDo />
    <AftercareTease />
    <Inquiry />
  </>
);

export const Route = createFileRoute("/")({
  component: Home,
});
