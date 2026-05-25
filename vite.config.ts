import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
  plugins: [
    netlify(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: false,
      },
      pages: [
        { path: "/", prerender: { enabled: true } },
        { path: "/about", prerender: { enabled: true } },
        { path: "/aftercare", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
