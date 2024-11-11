import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Component Library',
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
          items: [{ text: 'Button 按钮', link: '/components/button' }]
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
