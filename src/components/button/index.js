import MyButton from './src/button.vue'

MyButton.install = app => {
  app.component('MyButton', MyButton)
}

export default MyButton
