// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Habits City',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL_BACKEND,
      clientIdYandex: process.env.CLIENT_ID_YANDEX,
      clientIdGoogle: process.env.CLIENT_ID_GOOGLE,

      redirectUriGoogleDev: process.env.NUXT_REDIRECT_URI_GOOGLE_DEV,
      redirectUriGoogleProd: process.env.NUXT_REDIRECT_URI_GOOGLE_PROD,
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-primevue',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
  ],
  i18n: {
    vueI18n: './plugins/i18n.config.ts',
  },
  css: ['~/assets/main.css'],
  primevue: {
    components: {
      // include: '*',
      include: [
        //   'Stepper',
        //   'StepperPanel',
        //   'InputMask',
        'InputOtp',
        //   'InputText',
        //   'FileUpload',
        //   'Chart',
        //   'Fieldset',
        //   'RadioButton',
      ],
    },
    composables: {
      include: ['useStyle'],
      exclude: ['useToast'],
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  nitro: {
    prerender: {
      routes: ['/friends', '/profile'],
    },
  },
});

// useruntimeConfig