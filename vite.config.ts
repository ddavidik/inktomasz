import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
      },
      pages: [
        { path: "/", prerender: { enabled: true } },
        { path: "/about", prerender: { enabled: true } },
        { path: "/aftercare", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    nitro({
      config: {
        preset: "netlify-static",
      },
    }),
  ],
});
