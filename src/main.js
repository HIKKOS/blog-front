import { createApp } from 'vue'
import '../src/style.css'

import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
const app = createApp(App)

app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
