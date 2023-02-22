// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import * as dotenv from "dotenv";
const PROJECT_ENV = process.env.PROJECT_ENV ?? process.env.NODE_ENV;
dotenv.config({
  path: `.env.${PROJECT_ENV}`,
});
export default defineNuxtConfig({
  app: {
    head: {
      title: "四维云 BI",
      htmlAttrs: {
        lang: "zh-CN",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          key: "description",
          name: "description",
          content: "四维云 BI",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
    },
  },
});