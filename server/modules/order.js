var moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'order',
        {
            o_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            o_name: {
                type: DataTypes.STRING,
                field: 'o_name'
            },
            o_phone: {
                type: DataTypes.STRING,
                field: 'o_phone'
            },
            o_result: {
                type: DataTypes.STRING,
                field: 'o_result'
            },
            o_time: {
                type: DataTypes.DATE,
                field: 'o_time',
                get() {
                    return moment(this.getDataValue('o_time')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            o_endTime: {
                type: DataTypes.DATE,
                field: 'o_endTime',
                get() {
                    return moment(this.getDataValue('o_endTime')).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            s_name:{
                type: DataTypes.STRING,
                field: 's_name'
            },
            u_userId:{
                type: DataTypes.STRING,
                field: 'u_userId'
            }
        }
    );
}