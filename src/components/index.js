const components = import.meta.glob('./*/index.js', { eager: true })

const install = app => {
  Object.values(components).forEach(componentModule => {
    const component = componentModule.default
    if (component && component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install
}
