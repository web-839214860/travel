import { removeLocalStorage } from '@/utils/localStorage'
import router from '../../router'

/*vuex：

disPatch：异步操作
存储：this.$store.disPatch('action 方法名'，值)
取值：this.$store.getters.方法名

commit：同步操作
存储：this.$store.commit('mutations 方法名'，值)
取值：this.$store.state.方法名*/

const user  = {  
  namespaced: true,

  state : {  //数据源，保存的数据放在这里，在页面通过 this.$store.state来获取数据
    u_userId:'',
    u_name:'',
    u_sex:'',
    u_position:'',
    role: '',
    token: '',
  },

  getters : {  //监听state中的值的变化，返回结果
    u_userId: state => state.u_userId,
    u_name: state => state.u_name,
    u_sex: state => state.u_sex,
    u_position: state => state.u_position,
    role: state => state.role,
    token: state => state.token,
  },

  mutations: { //修改state中的值
    SET_U_UESRID: (state, u_userId) => {
        state.u_userId = u_userId
    },
    SET_U_NAME: (state, u_name) => {
        state.u_name = u_name
    },
    SET_U_SEX: (state, u_sex) => {
        state.u_sex = u_sex
    },
    SET_U_POSITION: (state, u_position) => {
        state.u_position = u_position
    },
    SET_ROLE: (state, role) => {
        state.role = role
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },  
  },

  actions:{  //通过store.disPatch 方法触发
      //退出登录
      LogOut() {
        return new Promise((resolve) => {
          removeLocalStorage('Token')
          router.push({ path: '/login' })
          resolve()
        })
    },
  }
}

export default user;