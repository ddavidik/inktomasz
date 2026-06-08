/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import site from "@content/site.json";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import { RevealMounter } from "~/components/RevealMounter";
import { NotFound } from "~/components/NotFound";

const RootComponent = () => (
  <>
    <RevealMounter />
    <Nav />
    <main className="flex flex-1 flex-col">
      <Outlet />
    </main>
    <Footer />
  </>
);

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body>
      {children}
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#07060a" },
      { title: `${site.artist.name} — ${site.artist.tagline}` },
      {
        name: "description",
        content: `${site.artist.name} (@${site.artist.handle}) — custom blackwork and nordic-inspired tattoo work at ${site.artist.studio}, ${site.artist.studioCity}. By appointment.`,
      },
      { property: "og:title", content: site.artist.name },
      { property: "og:description", content: site.artist.tagline },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
});
