const db = require('../config/mysql_sequelize')
const Sequelize = db.sequelize
const scenery = Sequelize.import('../modules/scenery.js')

scenery.sync({ force: false });

class sceneryDao {

    //获取某个景点的全部信息
    static async getSceneryInfo(s_name) {
        return await scenery.findOne({
            where: {
                s_name
            }
        })
    }

    //获取所有景点信息
    static async getAllScenery() {
        return await scenery.findAll({
            raw: true    //返回原始数据
        })
    }

    //添加景点信息
    static async createScenery(msg) {
        return await scenery.findOrCreate({
            where: {
                s_name: msg.s_name
            },
            defaults: {
                s_name: msg.s_name,
                s_synopsis: msg.s_synopsis,
                s_place:msg.s_place,
                s_phone:msg.s_phone,
                s_num:msg.s_num,
                s_numquota:msg.s_numquota,
                s_image:msg.s_image
            },
            raw: true
        })
    }

    //删除景点信息
    static async delectScenery(msg) {
        return await scenery.destroy({
            where: {
                s_name: msg
            }
        })
    }

    //编辑景点信息
    static async updateScenery(msg, s_id) {
        return await scenery.update({
            s_name: msg.s_name,
            s_synopsis: msg.s_synopsis,
            s_place:msg.s_place,
            s_phone:msg.s_phone,
            s_num:msg.s_num,
            s_numquota:msg.s_numquota,
            s_image:msg.s_image
        }, {
            where: {
                s_name: s_id
            }
        })
    }
}

module.exports = sceneryDao