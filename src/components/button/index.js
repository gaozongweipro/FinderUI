import MyButton from './src/button.vue'

MyButton.install = app => {
  app.component(MyButton.name, MyButton)
}

export default MyButton


