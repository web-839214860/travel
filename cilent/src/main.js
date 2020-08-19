import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Swipe, SwipeItem, NavBar, Col, Row, Toast, Tabbar, TabbarItem, CellGroup, Cell, PullRefresh, Dialog, Search } from 'vant';
import { Form, FormItem, Input, Select, Option, Table, TableColumn } from 'element-ui';
import api from './api/install'
import '@/permission' 

Vue.use(api)

Vue.use(Button).use(Swipe).use(SwipeItem).use(NavBar).use(Col).use(Row).use(Toast).use(Tabbar).use(TabbarItem).use(CellGroup).use(Cell).use(PullRefresh).use(Dialog).use(Search);
Vue.use(Form).use(FormItem).use(Input).use(Select).use(Option).use(Table).use(TableColumn)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
