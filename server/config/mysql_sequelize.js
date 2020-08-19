var Sequelize = require("sequelize")

var sequelize = new Sequelize('travel', 'root', 'sise', {
    host: 'localhost',
    dialect: 'mysql',
    //operatorsAliases:false,
    dialectOptions: {
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        paranoid: false,
        operatorsAliases: false
    },
    define:{
        freezeTableName: true,
        timestamps: false,
        paranoid:false,
    },

    timezone: '+08:00'
    
});

module.exports = {
    sequelize
};


