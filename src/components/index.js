import { defineAsyncComponent } from 'vue'

const components = import.meta.glob('./*/index.js', { eager: true })

const install = app => {
  Object.entries(components).forEach(([path, componentModule]) => {
    const component = componentModule.default
    if (component && component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install
}
