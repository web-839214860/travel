module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'scenery',
        {
            s_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            s_name: {
                type: DataTypes.STRING,
                field: 's_name'
            },
            s_synopsis: {
                type: DataTypes.STRING,
                field: 's_synopsis'
            },
            s_place:{
                type: DataTypes.STRING,
                field:'s_place'
            },
            s_phone:{
               type:DataTypes.STRING,
               field:'s_phone'
            },
            s_num:{
                type: DataTypes.INTEGER,
                field: 's_num'
            },
            s_numquota:{
                type: DataTypes.INTEGER,
                field: 's_numquota'
            },
            s_image:{
                type:DataTypes.STRING,
                field:'s_image'
            }
        }
    );
}