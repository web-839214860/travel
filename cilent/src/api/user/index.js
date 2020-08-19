import api from '../index'
import urls from './urls'
export default {
  userinfo () { //用户信息
    // return出去了一个promise
    return api.get(urls.userinfo)
  },
  postlogin (params) { //登录
    // return出去了一个promise
    params={
      u_userId:params.u_userId,
      u_password:params.u_password
    }
      return api.post(urls.postlogin,params)
  },
  postuser(params) { //注册
    // return出去了一个promise
    params = {
      u_userId: params.u_userId,
      u_password: params.u_password,
      u_name: params.u_name,
      u_sex:params.u_sex,
      u_position:params.u_position
    }
    return api.post(urls.postuser, params)
  },
  putpassword(params){ //修改密码
    // return出去了一个promise
    params={
      u_userId:params.u_userId,
      old_password:params.oldpassword,
      new_password:params.newpassword
    }
    return api.put(urls.putpassword, params)
  },
}

