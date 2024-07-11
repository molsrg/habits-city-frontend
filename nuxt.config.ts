// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
      title: 'Habits City',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
	},
	devtools: { enabled: false },
	runtimeConfig: {
		public: {
			apiURL: process.env.API_URL,
		},
	},
	modules: [
		'@nuxt/ui',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-primevue',
		'@pinia-plugin-persistedstate/nuxt',
	],
	css: ['~/assets/main.css'],
	primevue: {
		components: {
			// include: '*',
			include: ['Stepper', 'StepperPanel', 'InputMask', 'InputOtp', 'InputText', 'FileUpload', 'Chart', 'Fieldset'],
		},
		composables: {
			// include: ['useStyle'],
			exclude: ['useToast']
		},
		
	},
})

// useruntimeConfig
