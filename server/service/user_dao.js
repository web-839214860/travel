const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const user = Sequelize.import('../modules/user.js')

user.sync({ force: false }); 

class userDao {
    //获取某个用户的全部信息
    static async getUserInfo(u_userId) {
        return await user.findOne({
            where: {
                u_userId
            }
        })
    }

    //获取所有普通用户
    static async getAllUserCommon() {
        return await user.findAll({
            //raw: true    返回所有数据
            where: {
                role:3
            }
        })
    }

    //获取所有景点管理员
    static async getAllUserAdmin() {
        return await user.findAll({
            //raw: true    返回所有数据
            where: {
                role:2
            }
        })
    }

    //获取所有高级管理员
    static async getAllUserHighAdmin() {
        return await user.findAll({
            //raw: true    返回所有数据
            where: {
                role:1
            }
        })
    }
    
    //创建用户
    static async createUser(msg) {  
        return await user.findOrCreate({  //先查找，如果不存在则创建用户并保存到数据库中
            where: {
                u_userId: msg.u_userId
            },
            defaults: {
                u_userId: msg.u_userId,
                u_password: msg.u_password,
                u_name: msg.u_name,
                u_sex:msg.u_sex,
                u_position:msg.u_position,
                role: msg.role,
                solt:msg.solt,
            },
            raw: true
        })
    }

    //删除用户
    static async delectUser(msg) {
        return await user.destroy({
            where: {
                u_userId: msg
            }
        })
    }

    //修改用户密码
    static async updateUser(msg, u_id){
        return await user.update({
            u_password: msg.u_password,
            u_name: msg.u_name,  
            role:msg.role,
            solt:msg.solt,            
        },{
           where:{
               u_userId:u_id
           }
        })
    }

    //编辑用户
    static async updateOneUser(msg, u_id) {
        return await user.update({
            u_userId: msg.u_userId,
            u_password: msg.u_password,
            u_name: msg.u_name,
            u_sex: msg.u_sex,
            u_position: msg.u_position,
            role: msg.role,
            solt: msg.solt,
        }, {
            where: {
                u_userId: u_id
            }
        })
    }

}

module.exports = userDao
