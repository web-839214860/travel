import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/install'
import '@/permission' 

import { Form, FormItem, Input, Button, Row, Col, Menu, Submenu, MenuItem, MenuItemGroup, Progress, Message, Select, Option, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, Pagination, Dialog, Upload } from 'element-ui';
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Row).use(Col).use(Menu).use(Submenu).use(MenuItem).use(MenuItemGroup).use(Progress).use(Select).use(Option).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Table).use(TableColumn).use(Pagination).use(Dialog).use(Upload)
Vue.prototype.$message = Message

Vue.use(api)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
