import { createApp } from 'vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import '@varlet/touch-emulator'

import App from './App.vue'
import { i18n } from '@/i18n'

const app = createApp(App)

app.use(Varlet).use(i18n).mount('#app')
