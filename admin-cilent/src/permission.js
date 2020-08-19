import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import('nprogress/nprogress.css')
import { getLocalStorage } from '@/utils/localStorage' // 验权(从localstorage中获取)
import api from './api/apiList'

const whiteList = ['/login',]
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 点击登录时，拿到了token并存入了localstorage,保证页面刷新时,始终可以拿到token
  if (getLocalStorage('Token')) {
    if(to.path === '/login') {
      next({path:'/'})
      NProgress.done()  
    } else {
      api.user.userinfo().then(res =>{
          //console.log(res.data)
          let user = res.data.user;  //同步存值 存在mutations中
          store.commit("user/SET_U_UESRID",user.u_userId);  //this.$store.commit('mutations 方法名'，值)
          store.commit("user/SET_U_NAME",user.u_name);
          store.commit("user/SET_U_SEX",user.u_sex);
          store.commit("user/SET_U_POSITION",user.u_position);
          next()
      }).catch((err)=>{
        console.log(err)
        store.dispatch('user/LogOut').then(() => { //异步存值 this.$store.disPatch('action 方法名'，值)
          next({ path: '/' })
        })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

