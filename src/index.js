import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// 引入 Element Plus 的样式
import 'element-plus/dist/index.css'
// 引入组件库自身的样式
import './styles/index.scss'

import MyComponentLib from './components'

export * from './components'
export default MyComponentLib 