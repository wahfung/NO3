import { createApp } from 'vue'
import { pinia, useThemeStore } from '@/stores'
import router from '@/router'
import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

// 初始化主题
const themeStore = useThemeStore(pinia)
themeStore.initTheme()

app.mount('#app')
