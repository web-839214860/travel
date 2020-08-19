const baseUrl = '/api'
export default {
  userinfo: baseUrl + '/userinfo', //用户信息接口
  postlogin: baseUrl + '/postlogin', //登录接口
  putpassword: baseUrl + '/putpassword',//修改密码接口
  postoneuser: baseUrl + '/postoneuser',//管理员添加用户接口
  getallcommoninfo: baseUrl + '/getallcommoninfo',//管理员获取普通用户信息接口
  getalladmininfo: baseUrl + '/getalladmininfo',//管理员获取景点管理员信息接口
  getallhighadmininfo: baseUrl + '/getallhighadmininfo',//管理员获取高级管理员信息接口
  deleteuser: baseUrl + '/deleteuser', //管理员删除用户接口
  getoneuserinfo: baseUrl + '/getoneuserinfo', //管理员获取需要编辑的用户的信息接口
  putoneuserinfo: baseUrl + '/putoneuserinfo', //管理员编辑用户接口
  
}

