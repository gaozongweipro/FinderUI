import { describe, it, expect } from 'vitest'
import { createApp } from 'vue'
import MyComponentLib, { MyButton } from '../../src/components'

describe('Component Library', () => {
  it('should have install method', () => {
    expect(typeof MyComponentLib.install).toBe('function')
  })

  it('should export MyButton component', () => {
    expect(MyButton).toBeDefined()
    expect(typeof MyButton.install).toBe('function')
  })

  it('should install all components', () => {
    const app = createApp({})
    const components = {}
    app.component = (name, component) => {
      components[name] = component
    }
    app.use(MyComponentLib)
    expect(components['MyButton']).toBeDefined()
  })
}) 