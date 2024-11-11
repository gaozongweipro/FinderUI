import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'

// 配置全局插件
config.global.plugins = [ElementPlus]

// 配置全局组件
config.global.stubs = {}

// 配置全局属性
config.global.mocks = {
  $style: {}
} 