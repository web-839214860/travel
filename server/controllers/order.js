const orderDao = require('../service/order_dao')
const sceneryDao = require('../service/scenery_dao')
var moment = require('moment')

module.exports = {

    //管理员获取所有预约单
    allorderinfo: async(ctx) =>{
        const allorderinfo  =   await orderDao.getAllInfo();

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: allorderinfo
        }
    },

    //管理员删除预约单
    deleteorder: async(ctx) => {
        const msg=ctx.params.id;
        console.log(msg);
        const deletetable = await orderDao.delectOrderTable(msg);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '删除成功'
            }
        }       
    },

    //管理员分配预约单
    postorderinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOneOrderInfo(msg);//获取预约单
        const ordersceneryinfo = await sceneryDao.getSceneryInfo(orderinfo.s_name);//获取预约单下的景点信息
        console.log(ordersceneryinfo)
        
        let orderInfo = { o_result: '预约成功' }
        let orderSceneryInfo = { s_numquota :ordersceneryinfo.s_numquota-1 }
        await sceneryDao.updateScenery(orderSceneryInfo,orderinfo.s_name);

        let data=await orderDao.updateOrder(orderInfo,msg);
        console.log(data);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '分配成功',
            }
        }
    },

    //管理员取消分配预约单
    putorderinfo: async(ctx) => {  
        const msg = ctx.params.id;
        console.log(msg);
        const orderinfo = await orderDao.getOneOrderInfo(msg);//获取预约单
        const ordersceneryinfo = await sceneryDao.getSceneryInfo(orderinfo.s_name);//获取预约单下的景点信息
        console.log(ordersceneryinfo)

        let orderInfo = { o_result: '待分配' }
        let orderSceneryInfo = { s_numquota :ordersceneryinfo.s_numquota+1 }
        await sceneryDao.updateScenery(orderSceneryInfo,orderinfo.s_name);

        let data=await orderDao.updateOrder(orderInfo,msg);
        console.log(data);
        
        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: {
                message: '取消分配成功',
            }
        }
    },

    //填写预约单
    postorder: async (ctx) => {
        const data = ctx.request.body
        const msg={};
        const order = await orderDao.getOrderInfo(data.u_userId)  //查询是否存在这张预约单

        if(order.length == 0){
            msg.o_name = data.o_name;
            msg.o_phone = data.o_phone;
            msg.o_result = "待分配";
            msg.o_time = moment().format('YYYY-MM-DD HH:mm:ss');  //获取当前时间
            msg.o_endTime = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'); //获取当前时间加一天
            msg.s_name = data.s_name;
            msg.u_userId = data.u_userId

            await orderDao.createOrderInfo(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '发起预约成功'
                }
            }

        } else if (order.length !== 0 && new Date().getTime() < new Date(order[order.length-1].o_endTime).getTime()) {
            
            ctx.status = 200;
            ctx.body = {
                code: 0,
                data: {
                    message: '距离上一次预约不到24小时，请勿重复预约'
                }
            }
        } else if (order.length !== 0 && new Date().getTime() > new Date(order[order.length-1].o_endTime).getTime()) {

            msg.o_name = data.o_name;
            msg.o_phone = data.o_phone;
            msg.o_result = "待分配";
            msg.o_time = moment().format('YYYY-MM-DD HH:mm:ss');  //获取当前时间
            msg.o_endTime = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'); //获取当前时间加一天
            msg.s_name = data.s_name;
            msg.u_userId = data.u_userId

            await orderDao.createOrderInfo(msg)

            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '发起预约成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '未知错误'
                }
            }
        }
    },

    //用户获取预约单
    showorderinfo: async(ctx) =>{
        const data = ctx.state.user   //登录的用户
        const showorderinfo  =  await orderDao.getOrderInfo(data.u_userId);

        ctx.status = 200;
        ctx.body = {
            code: 1,
            data: showorderinfo
        }
    },

    //系统自身修改预约单结果
    putorder: async (ctx) => {
        const data = ctx.state.user
        const order = await orderDao.getOrderInfo(data.u_userId)  //查询是否存在这张预约单
 
        if(order.length !==0){
            const msg=order[order.length-1].o_id;
            if(order[order.length-1].o_result !== "已失效"){

                if (new Date().getTime() >= new Date(order[order.length-1].o_endTime).getTime()){
                    let orderInfo = { o_result: '已过期' }
                    await orderDao.updateOrder(orderInfo,msg);
                }     
            }
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '系统自身修改预约单结果成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前账号还未预约过景点'
                }
            }
        }
        
    },

    //点击到达按钮后修改预约单结果
    putbuttonorder: async (ctx) => {
        const data = ctx.state.user
        const order = await orderDao.getOrderInfo(data.u_userId)  //查询是否存在这张预约单
 
        if(order.length !==0){
            const msg=order[order.length-1].o_id;

            let orderInfo = { o_result: '已失效' }
            await orderDao.updateOrder(orderInfo,msg);
                   
           
            ctx.status = 200;
            ctx.body = {
                code: 1,
                data: {
                    message: '到达景点成功'
                }
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: -1,
                data: {
                    message: '当前账号还未预约过景点'
                }
            }
        }
        
    }
    

}