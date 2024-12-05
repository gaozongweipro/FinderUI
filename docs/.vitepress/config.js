import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'FinderUI',
  description: '基于 Element Plus 的 Vue 3 组件库',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/button' },
      { text: 'GitHub', link: 'https://github.com/gaozongweipro/FinderUI' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '安装', link: '/guide/installation' }]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Dialog 对话框', link: '/components/basic-dialog' },
            { text: 'Drawer 抽屉', link: '/components/basic-drawer' },
            { text: 'Form 表单', link: '/components/basic-form' }
          ]
        },
        {
          text: '图表组件',
          items: [
            { text: 'DrillDownBarChart 下钻柱状图', link: '/components/drill-down-bar-chart' },
            { text: 'FForm 自定义表单', link: '/components/f-form' }
          ]
        }
      ]
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/gaozongweipro/FinderUI' }]
  }
})
