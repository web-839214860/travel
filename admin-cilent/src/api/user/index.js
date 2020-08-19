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
  putpassword(params){ //修改密码
    // return出去了一个promise
    params={
      u_userId:params.u_userId,
      old_password:params.oldpassword,
      new_password:params.newpassword
    }
    return api.put(urls.putpassword, params)
  },
  postoneuser(params){  //管理员添加用户
    // return出去了一个promise
    return api.post(urls.postoneuser, params)
  },
  getallcommoninfo(){  //管理员获取普通用户信息
    // return出去了一个promise
    return api.get(urls.getallcommoninfo)
  },
  getalladmininfo(){  //管理员获取景点管理员信息
    // return出去了一个promise
    return api.get(urls.getalladmininfo)
  },
  getallhighadmininfo(){  //管理员获取高级管理员信息
    // return出去了一个promise
    return api.get(urls.getallhighadmininfo)
  },
  deleteuser(params) { //管理员删除用户
    // return出去了一个promise，根据id删除
    params = {
      u_userId: params
    }
    return api.delete(urls.deleteuser + '/' + params.u_userId)
  },
  getoneuserinfo(params){ //管理员获取需要编辑的用户的信息
    // return出去了一个promise
    params={
      u_userId: params
    }
    return api.get(urls.getoneuserinfo + '/' + params.u_userId)
  },
  putoneuserinfo(params,id){ ////管理员编辑用户信息
    // return出去了一个promise
    return api.put(urls.putoneuserinfo + '/' + id,params)
  },
}

