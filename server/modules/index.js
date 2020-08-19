const config=require('../config/mysql_sequelize');
const Sequelize = config.sequelize

//导入模型统一管理
const user = Sequelize.import(__dirname + '/user.js')
const scenery=Sequelize.import(__dirname+'/scenery.js')
const order=Sequelize.import(__dirname+'/order.js')


user.hasMany(order, { 
    foreignKey:'u_userId',
    sourceKey: 'u_userId'  //sourceKey来指定源键，默认为主键,注意:sourceKey必须为数据库字段名，不能使用生成的驼峰式别名
})
order.belongsTo(user, {
    foreignKey: 'u_userId',
    targetKey: 'u_userId'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})


order.hasOne(scenery,{
    foreignKey: 's_name',
    sourceKey: 's_name'
})
scenery.belongsTo(order, {
    foreignKey: 's_name',
    targetKey: 's_name'  //targetKey可以用在关联中指定目标键，默认是关联另一张表的主键
})

module.exports={ user, scenery, order }