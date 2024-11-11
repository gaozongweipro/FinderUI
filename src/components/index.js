import MyButton from './button'

const components = [MyButton]

const install = app => {
  components.forEach(component => {
    app.use(component)
  })
}

export { MyButton, install }

export default { install }


