import * as dotenv from 'dotenv'
dotenv.config()


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
		baseURL: process.env.BASE_URL
		// pageTransition: { name: 'page', mode: 'out-in' },
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