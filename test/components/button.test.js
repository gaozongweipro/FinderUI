import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyButton from '../../src/components/button/src/button.vue'

describe('MyButton', () => {
  it('renders properly', () => {
    const wrapper = mount(MyButton, {
      props: { type: 'primary' },
      slots: { default: '测试按钮' }
    })
    expect(wrapper.text()).toBe('测试按钮')
    expect(wrapper.find('.el-button--primary').exists()).toBe(true)
  })

  it('emits click event', async () => {
    const wrapper = mount(MyButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('handles disabled state', () => {
    const wrapper = mount(MyButton, { props: { disabled: true } })
    expect(wrapper.find('.is-disabled').exists()).toBe(true)
  })

  it('handles loading state', () => {
    const wrapper = mount(MyButton, { props: { loading: true } })
    expect(wrapper.find('.is-loading').exists()).toBe(true)
  })

  it('renders different sizes', () => {
    const sizes = ['large', 'small']
    sizes.forEach(size => {
      const wrapper = mount(MyButton, { props: { size } })
      expect(wrapper.find(`.el-button--${size}`).exists()).toBe(true)
    })
  })

  it('renders plain button', () => {
    const wrapper = mount(MyButton, { props: { plain: true } })
    expect(wrapper.find('.is-plain').exists()).toBe(true)
  })

  it('renders round button', () => {
    const wrapper = mount(MyButton, { props: { round: true } })
    expect(wrapper.find('.is-round').exists()).toBe(true)
  })

  it('renders circle button', () => {
    const wrapper = mount(MyButton, { props: { circle: true } })
    expect(wrapper.find('.is-circle').exists()).toBe(true)
  })
}) 


