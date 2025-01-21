// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://yoletent.com",
  integrations: [tailwind(), sitemap(), robotsTxt(), react()],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
