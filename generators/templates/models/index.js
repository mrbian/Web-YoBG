var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var configs = require('./../instances/config.js');

var sequelize = new Sequelize(configs.db.toString(), {
    logging: function () {}
});

//  自动加载数据库表文件
fs
    .readdirSync( __dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js' &&  file !== 'migrate.js');
    })
    .forEach(function (file) {
        sequelize.import(path.join(__dirname, file));
    });

var models = sequelize.models;
Object.keys(sequelize.models).forEach(function (modelName) {
    if (models[modelName].options.hasOwnProperty('associate')) {
        models[modelName].options.associate(models);
    }
});

module.exports = sequelize;