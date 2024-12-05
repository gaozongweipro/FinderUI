import Button from './button'
import BasicDialog from './BasicDialog'
import BasicDialogDrawer from './BasicDialogDrawer'
import BasicForm from './BasicForm'
import BasicSearchBar from './BasicSearchBar'
import ActionBtnGroup from './ActionBtnGroup'
import BaseDeviceStatistics from './BasedeviceStatistics'
import BasicTable from './table'
import BasicDrawer from './BasicDrawer'
import BasicSelectTree from './BasicSelectTree'
import PaginationAll from './pagination'
import DynamicTree from './DynamicTree'
import FForm from './FForm'
const components = [
  Button,
  BasicDialog,
  BasicDialogDrawer,
  BasicForm,
  BasicSearchBar,
  ActionBtnGroup,
  BaseDeviceStatistics,
  BasicTable,
  BasicDrawer,
  BasicSelectTree,
  PaginationAll,
  DynamicTree,
  FForm
]

const install = app => {
  components.forEach(component => {
    app.use(component)
  })
}

export default {
  install
}

export {
  Button,
  BasicDialog,
  BasicDialogDrawer,
  BasicForm,
  BasicSearchBar,
  ActionBtnGroup,
  BaseDeviceStatistics,
  BasicTable,
  BasicDrawer,
  BasicSelectTree,
  PaginationAll,
  FForm
}
