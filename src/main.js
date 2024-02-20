import { createApp } from 'vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import '@varlet/touch-emulator'
import { createI18n } from 'vue-i18n'
import { Locale } from '@varlet/ui'

import App from './App.vue'

import AppHeader from './components/AppHeader.vue'

const browserLocale = navigator.language || navigator.userLanguage;

const langs = {
    'zh-CN': 'zh-hans',
    'zh-TW': 'zh-hant',
    'zh-HK': 'zh-hant',
    'en-US': 'en',
}

const lang = (langs[browserLocale]===undefined)?'en':langs[browserLocale];

const i18n = createI18n({
    locale: lang,
    fallbackLocale: 'en',
    messages: {
        'zh-hans': {
            'title': '公会之证',
            'count': '数量',
            'material': '材料',
        },
        'zh-hant': {
            'title': '公會之証',
            'count': '數量',
            'material': '材料',
        },
        'en': {
            'title': 'Proof of Guild',
            'count': 'Count',
            'material': 'Material',
        },
    }
})

Locale.add('zh-hans', Locale.zhCN)
Locale.add('zh-hant', Locale.zhTW)
Locale.add('en', Locale.enUS)

const app = createApp(App)

app.component('AppHeader', AppHeader)
app.use(Varlet).use(i18n).mount('#app')
