const baseUrl = '/api'

export default {
    allorderinfo: baseUrl + '/allorderinfo', //管理员获取所有预约单接口
    deleteorder: baseUrl + '/deleteorder', //管理员删除预约单接口
    postorderinfo: baseUrl + '/postorderinfo', //管理员分配预约单接口
    putorderinfo: baseUrl + '/putorderinfo', //管理员取消分配预约单接口
    postorder: baseUrl + '/postorder', //填写预约单接口
    showorderinfo: baseUrl + '/showorderinfo', //用户获取预约单接口
    putorder: baseUrl + '/putorder', //系统修改自身预约单接口
    putbuttonorder: baseUrl + '/putbuttonorder' //点击到达按钮后修改预约单结果接口
}
