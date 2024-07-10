// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: [
		'@nuxt/ui',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'nuxt-primevue',
		'@pinia-plugin-persistedstate/nuxt',
	],
	css: ['~/assets/main.css'],
	app: {
    baseURL: `/habits-city-frontend`,
  },
	primevue: {
		components: {
			include: '*',
			// include: ['Stepper', 'StepperPanel', 'InputMask', 'InputOtp', 'InputText', 'FileUpload', 'Chart', 'Fieldset'],
		},
		composables: {
			include: ['useStyle'],
		},
	},
})

// useruntimeConfig
