// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt"
  ],
  pinia: {
    autoImports: [
      "defineStore" // import { defineStore } from 'pinia'
    ]
  },
  experimental: {
    renderJsonPayloads: false
  }
});
