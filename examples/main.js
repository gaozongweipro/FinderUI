import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

import App from './App.vue'

import MyComponentLib from '../src/components'



const app = createApp(App)



app.use(ElementPlus)

app.use(MyComponentLib)



app.mount('#app') 


