// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // @ts-ignore
  modules: ['@nuxtjs/tailwindcss', 'nuxt-xstate'],
  routeRules: {
    '/': {
      ssr: false,
    }
  },
  xState: {
    customMachines: {
      dir: 'machines',
      importSuffix: 'Machine',
    },
  },
})
