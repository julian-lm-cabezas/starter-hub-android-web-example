import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import libraries CSS
import '@mozaic-ds/vue-3/dist/mozaic-vue.adeo.css'

/**
 * Internationalization 
 * English & Spanish
 */
import { createI18n} from "vue3-i18n"
import ES from '@/assets/lang/es.json'
import EN from '@/assets/lang/en.json'

const locale = navigator.language?.substring(0,2)

const i18n = createI18n({
     locale: ['es','en'].includes(locale)? locale: 'en',
     messages: {  es : ES, en: EN }
})


createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
