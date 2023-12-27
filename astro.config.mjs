import { defineConfig } from "astro/config";

import yaml from "@rollup/plugin-yaml";

import react from "@astrojs/react";
// import i18nRouting from "astro-i18n-aut";
import i18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";

import remarkCallouts from "remark-obsidian-callout";

const locales = {
  ko: "ko-KR",
  en: "en-US",
};
const defaultLocale = "ko";

// https://astro.build/config
export default defineConfig({
  site: "https://hoqn.github.io",
  base: "/",
  srcDir: "./src",
  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["./src/styles"],
        }
      },
    },
  },
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    // i18nRouting({
    //   locales,
    //   defaultLocale,
    // }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
    }),
    i18next(),
  ],
  markdown: {
    remarkPlugins: [remarkCallouts],
  },
});
