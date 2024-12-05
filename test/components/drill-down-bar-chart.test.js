import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DrillDownBarChart from '../../src/components/DrillDownBarChart/src/drillDownBarChart.vue'

describe('DrillDownBarChart', () => {
  // 测试组件渲染
  it('renders properly', () => {
    const wrapper = mount(DrillDownBarChart, {
      props: {
        data: [
          { name: '分类1', value: 100 },
          { name: '分类2', value: 200 }
        ],
        options: {
          title: '测试图表',
          xAxisName: '分类',
          yAxisName: '数量'
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  // 测试数据更新
  it('updates chart when data changes', async () => {
    const wrapper = mount(DrillDownBarChart, {
      props: {
        data: [
          { name: '分类1', value: 100 }
        ]
      }
    })

    await wrapper.setProps({
      data: [
        { name: '分类1', value: 200 }
      ]
    })

    // 这里需要等待 nextTick 以确保图表更新
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.chartInstance).toBeDefined()
  })

  // 测试下钻事件
  it('emits drill-down event', async () => {
    const wrapper = mount(DrillDownBarChart, {
      props: {
        data: [
          { name: '分类1', value: 100 }
        ]
      }
    })

    // 模拟图表点击事件
    wrapper.vm.handleBarClick({ name: '分类1', value: 100 })
    
    expect(wrapper.emitted('drill-down')).toBeTruthy()
    expect(wrapper.emitted('drill-down')[0]).toEqual([{ name: '分类1', value: 100 }])
  })

  // 测试返回上级事件
  it('emits drill-up event', async () => {
    const wrapper = mount(DrillDownBarChart, {
      props: {
        data: [
          { name: '分类1', value: 100 }
        ]
      }
    })

    wrapper.vm.handleDrillUp()
    
    expect(wrapper.emitted('drill-up')).toBeTruthy()
  })

  // 测试加载状态
  it('shows loading state', () => {
    const wrapper = mount(DrillDownBarChart, {
      props: {
        loading: true
      }
    })
    
    expect(wrapper.find('.loading-overlay').exists()).toBe(true)
  })

  // 测试图表大小调整
  it('handles resize', async () => {
    const wrapper = mount(DrillDownBarChart)
    
    // 模拟 resize 事件
    window.dispatchEvent(new Event('resize'))
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.chartInstance).toBeDefined()
  })

  // 测试组件销毁
  it('cleans up on unmount', () => {
    const wrapper = mount(DrillDownBarChart)
    const disposeSpy = vi.spyOn(wrapper.vm.chartInstance, 'dispose')
    
    wrapper.unmount()
    expect(disposeSpy).toHaveBeenCalled()
  })
}) 