// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://gatherory.com",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    svelte(),
    sitemap({
      filter: (page) => page !== "https://gatherory.com/legal/",
    }),
  ],
});
