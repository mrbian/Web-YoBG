/**
 * 数据主文件
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */

<% if (version === "koa2"){ %>
import Sequelize from "sequelize";
import Config from "../conf/config.js";
import utilx from "../lib/utilx.js";
<% }else{ %>
var Sequelize = require("sequelize");
var Config = require("../conf/config");
var utilx = require("../lib/utilx");
<% } %>

console.log(Config.db.toString());
var sequelize = new Sequelize(
    Config.db.toString(),{
        logging : () => {

        }
    }
);

utilx.autoImport(__dirname,(tmpPath) => {
    sequelize.import(tmpPath);
});

var models = sequelize.models;
Object.keys(models).forEach((tableName) => {
    if(models[tableName].options.hasOwnProperty('associate')){
        models[tableName].options.associate(models);
    }
});
<% if (version === "koa2"){ %>
export default sequelize;
<% }else{ %>
module.exports = sequelize;
<% } %>

<% if (version === "koa2"){ %>
<% }else{ %>
<% } %>
