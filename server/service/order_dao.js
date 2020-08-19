const { user, scenery, order } = require('../modules/index')

order.sync({ force: false });

class orderDao {

    //管理员获取所有预约单的信息
    static async getAllInfo(){
        return await order.findAll({
            'order' :[
                ['o_time' , 'DESC'] //根据数据库的字段 o_time 降序排列 相当于数据库的 order by
            ],
            include:[{
                model:scenery
            },{
                model: user
            }]
        })
    }

    //管理员删除预约单
    static async delectOrderTable(msg) {
        return await order.destroy({
            where: {
                o_id: msg
            }
        })
    }
    
    //管理员分配、取消分配预约单
    static async updateOrder(msg, o_id) {
        return await order.update({
            o_id: msg.o_id,
            o_name:msg.o_name,
            o_phone:msg.o_phone,
            o_result:msg.o_result,
            o_time:msg.o_time,
            o_endTime:msg.o_endTime,
            s_name:msg.s_name,
            u_userId:msg.u_userId,
        }, {
            where: {
                o_id: o_id
            }
        })
    }

    //获取某张预约单的信息
    static async getOneOrderInfo(o_id) {
        return await order.findOne({
            include:[{
                model:scenery
            },{
                model: user
            }],
            where: {
                o_id
            }
        })
    }

    //获取预约单（用于查询该账号申请的预约单）
    static async getOrderInfo(id) {
        return await order.findAll({
            'order' :[
                ['o_id' , 'ASC'] //根据数据库的字段 o_id 升序排列 相当于数据库的 order by
            ],
            include: [{
                model: scenery
            },{
                model: user
            }],
            where: {
                u_userId:id
            },
        })
    }

    //填写预约单
    static async createOrderInfo(msg) {
        return await order.findOrCreate({
            where: {
               u_userId: ''
            },
            defaults: {
                o_name: msg.o_name,
                o_phone: msg.o_phone,
                o_result: msg.o_result,
                o_time: msg.o_time,
                o_endTime: msg.o_endTime,
                s_name: msg.s_name,
                u_userId: msg.u_userId
            },
            raw: true
        })
    }


}


module.exports = orderDao
