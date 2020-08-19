import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'

import Index from '@/views/index'
import IndexSceneryInfo from '@/views/indexSceneryInfo'
import IndexOrder from '@/views/indexOrder'
import IndexOrderSuccess from '@/views/indexOrderSuccess'

import Result from '@/views/result'
import ResultArrive from '@/views/resultArrive'

import My from '@/views/my'
import MyInfo from '@/views/myInfo'
import MyPassword from '@/views/myPassword'
import MyRecord from '@/views/myRecord'

import Main from '@/views/main'

Vue.use(VueRouter)


const routes = [
  
  {path:'/',name:'Login',component:Login},
  {path:'/register',name:'Register',component:Register},

  {path:'/index',name:'Main',component:Main,
    children: [

      {path:'/index',name:'Index',component:Index},
      {path:'/indexSceneryInfo/:id',name:'IndexSceneryInfo',component:IndexSceneryInfo},
      {path:'/indexOrder/:id',name:'IndexOrder',component:IndexOrder},
      {path:'/indexOrderSuccess',name:'IndexOrderSuccess',component:IndexOrderSuccess},
    
      {path:'/result',name:'Result',component:Result},
      {path:'/resultArrive',name:'ResultArrive',component:ResultArrive},
    
      {path:'/my',name:'My',component:My},
      {path:'/myInfo',name:'MyInfo',component:MyInfo},
      {path:'/myPassword',name:'MyPassword',component:MyPassword},
      {path:'/myRecord',name:'MyRecord',component:MyRecord},
      
    ]
  }, 
]

const router = new VueRouter({
  //mode: 'history',
  routes
})

export default router
