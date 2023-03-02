// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import * as dotenv from "dotenv";
const PROJECT_ENV = process.env.PROJECT_ENV ?? process.env.NODE_ENV;

dotenv.config({
  path: `.env.${PROJECT_ENV}`,
});
dotenv.config({
  path: `.env.local`,
});

export default defineNuxtConfig({
  app: {
    head: {
      title: "乐摆",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          key: "description",
          name: "description",
          content: "乐摆",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          src: `https://www.recaptcha.net/recaptcha/api.js?render=${process.env.RE_CAPTCHA_SITE_KEY}`,
        },
      ],
    },
  },
  build: {
    transpile: ["echarts", "resize-detector"],
  },
  css: ["~/assets/scss/index.scss"],
  typescript: {
    typeCheck: true,
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@element-plus/nuxt"],
  vueuse: {
    ssrHandlers: true,
  },
  elementPlus: {
    icon: "ElIcon",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: { payloadExtraction: false },
  ssr: process.env.NUXT_PUBLIC_SSR
    ? process.env.NUXT_PUBLIC_SSR === "true"
    : process.env.NODE_ENV !== "development",
  runtimeConfig: {
    public: {
      PROJECT_ENV,
      RE_CAPTCHA_SITE_KEY: process.env.RE_CAPTCHA_SITE_KEY,
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  },
});
