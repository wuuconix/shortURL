import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
import card from './components/card.vue'
import { Flag, Promotion, Opportunity, HomeFilled } from '@element-plus/icons-vue'

const app = createApp(App)
app.component('card', card)
app.component('flag', Flag)
app.component('promotion', Promotion)
app.component('opportunity', Opportunity)
app.component('home-filled', HomeFilled)
app.use(ElementPlus)

app.mount('#app')