import BasicTable from './src/table.vue'

BasicTable.install = app => {
  app.component('BasicTable', BasicTable)
}

export default BasicTable
