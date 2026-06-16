/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import site from "@content/site.json";
import { Nav } from "~/components/Nav";
import { Footer } from "~/components/Footer";
import { useRevealOnScroll } from "~/hooks/useReveal";
import { NotFound } from "~/components/NotFound";

const RootComponent = () => {
  useRevealOnScroll();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-skip focus:px-4 focus:py-2 focus:bg-(--blood-bright) focus:text-(--bone-paper) mono"
      >
        {site.skipLink}
      </a>
      <Nav />
      <main id="main-content" className="flex flex-1 flex-col" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

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
      { title: site.seo.defaultTitle },
      {
        name: "description",
        content: site.seo.defaultDescription,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.artist.name },
      { property: "og:title", content: site.seo.defaultTitle },
      {
        property: "og:description",
        content: site.seo.defaultDescription,
      },
      { property: "og:url", content: site.artist.siteUrl },
      { property: "og:image", content: `${site.artist.siteUrl}${site.artist.ogImage}` },
      { property: "og:image:width", content: "2274" },
      { property: "og:image:height", content: "1280" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.seo.defaultTitle },
      {
        name: "twitter:description",
        content: site.seo.defaultDescription,
      },
      { name: "twitter:image", content: `${site.artist.siteUrl}${site.artist.ogImage}` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
});
