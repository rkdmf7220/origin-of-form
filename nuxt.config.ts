// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: [
    '@pinia/nuxt',
  ],
  // import: {
  //   dirs: ['./stores']
  // },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      // ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  experimental: {
    renderJsonPayloads: false
  }
})
