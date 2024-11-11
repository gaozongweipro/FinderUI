import MyButton from './button'
import BasicTable from './table'

const components = [MyButton, BasicTable]

const install = app => {
  components.forEach(component => {
    app.use(component)
  })
}

export { MyButton, BasicTable, install }

export default { install }
