import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '../views/404'

import Order from '@/views/order'

import UserCommon from '@/views/usercommon'
import UserAdmin from '@/views/useradmin'
import UserHighAdmin from '@/views/userhighadmin'
import UserAdd from '@/views/useradd'
import UserEdit from '@/views/useredit'

import SceneryInfo from '@/views/sceneryinfo'
import SceneryAdd from '@/views/sceneryadd'
import SceneryEdit from '@/views/sceneryedit'

import Password from '@/views/password'


Vue.use(VueRouter)

const routes = [
    {path:'/login',name:'Login',component:Login},
    {path: '*',name:'NotFound',component:NotFound},

    {path:'/',component:Main,
        children:[
            {path:'/',name:'Order',component:Order},

            {path:'/usercommon',name:'UserCommon',component:UserCommon},
            {path:'/useradmin',name:'UserAdmin',component:UserAdmin},
            {path:'/userhighadmin',name:'UserHighAdmin',component:UserHighAdmin},
            {path:'/useradd',name:'UserAdd',component:UserAdd},
            {path:'/useredit/:id',name:'UserEdit',component:UserEdit},

            {path:'/sceneryinfo',name:'SceneryInfo',component:SceneryInfo},
            {path:'/sceneryadd',name:'SceneryAdd',component:SceneryAdd},
            {path:'/sceneryedit/:id',name:'SceneryEdit',component:SceneryEdit},

            {path:'/password',name:'Password',component:Password},
            
        ]
    },

]

const router = new VueRouter({
    //mode: 'history',
    routes
  })
  
  export default router