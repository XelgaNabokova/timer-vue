import { createApp } from 'vue'
import App, {router} from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
