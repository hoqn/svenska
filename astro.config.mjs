import { defineConfig } from "astro/config";

import yaml from "@rollup/plugin-yaml";

import react from "@astrojs/react";
import i18nRouting from "astro-i18n-aut";
import i18next from 'astro-i18next';
import sitemap from "@astrojs/sitemap";

const locales = {
  ko: "ko-KR",
  en: "en-US",
};
const defaultLocale = "ko";

// https://astro.build/config
export default defineConfig({
  site: "https://hoqn.net",
  srcDir: './src',
  vite: {
    plugins: [yaml()],
  },
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    // TEST_INTG(),
    i18nRouting({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
    i18next(),
  ],
});
