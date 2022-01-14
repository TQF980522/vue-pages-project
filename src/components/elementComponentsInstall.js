
// 按需加载element组件
import { Checkbox, MessageBox, CheckboxGroup, Input, Button, Steps,Step, Select, Option, Message, Pagination, Dialog, Loading, Tooltip, Card, Form, FormItem, Upload, Progress, Drawer, Collapse, CollapseItem, Rate, Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  install(Vue) {
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Button)
    Vue.use(Pagination)
    Vue.use(Dialog)
    Vue.use(Loading)
    Vue.use(Tooltip)
    Vue.use(Card)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Upload)
    Vue.use(Drawer)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Rate)
    Vue.use(Progress)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Steps)
    Vue.use(Step)

    Vue.prototype.$message = Message
    Vue.prototype.$notify = Notification
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$prompt = MessageBox.prompt
  }
}
