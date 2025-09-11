import { createApp } from 'vue'
import './main.css'
import './assets/fonts/font.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
