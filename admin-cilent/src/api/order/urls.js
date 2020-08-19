const baseUrl = '/api'

export default {
    allorderinfo: baseUrl + '/allorderinfo', //管理员获取所有预约单接口
    deleteorder: baseUrl + '/deleteorder', //管理员删除预约单接口
    postorderinfo: baseUrl + '/postorderinfo', //管理员分配预约单接口
    putorderinfo: baseUrl + '/putorderinfo', //管理员取消分配预约单接口

}
