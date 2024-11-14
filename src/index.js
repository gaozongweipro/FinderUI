import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// 直接引入样式
import 'element-plus/dist/index.css'
import './styles/index.scss'

import MyComponentLib from './components'

export * from './components'
export default MyComponentLib 