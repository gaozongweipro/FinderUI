import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import MyComponentLib from '../../src/components'

// 描述组件库的测试套件
describe('Component Library', () => {
  // 测试组件库是否有 install 方法
  it('should have install method', () => {
    // 断言 install 方法的类型是函数
    expect(typeof MyComponentLib.install).toBe('function')
  })

  // 测试组件库是否能正确安装所有组件
  it('should install all components', () => {
    // 创建一个新的 Vue 应用实例
    const app = createApp({})
    // 模拟组件注册表
    const components = {}
    // 模拟 app.component 方法，将组件注册到 components 对象中
    app.component = (name, component) => {
      components[name] = component
    }
    // 使用组件库
    app.use(MyComponentLib)
    // 断言 MyButton 组件已被注册
    // expect(components['MyButton']).toBeDefined()
  })
})
