import { defineConfig } from "astro/config";

import yaml from "@rollup/plugin-yaml";
import svgr from "vite-plugin-svgr";

import react from "@astrojs/react";
// import i18nRouting from "astro-i18n-aut";
import i18next from "astro-i18next";
import sitemap from "@astrojs/sitemap";
import mdIntegration from "@astropub/md";

import remarkCallouts from "remark-obsidian-callout";
import remarkMermaid from "astro-diagram/remark-mermaid";

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
    plugins: [yaml(), svgr({ include: "**/*.svg?raw&react" })],
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["./src/styles"],
        },
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
    mdIntegration(),
  ],
  markdown: {
    remarkPlugins: [remarkCallouts, remarkMermaid],
    shikiConfig: {
      // https://shiki.style/guide/dual-themes#light-dark-dual-themes
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
  },
});
