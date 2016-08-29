/**
 * 日志记录实例
 * 
 * @author <%= author %>
 * @createDate <%= date %>
 *
 * @example
 * logger.error("error");
 */
<% if(version === "koa2") { %>
import log4js from "log4js";
import config from "../conf/config";
<% }else{ %>
var log4js = require("log4js");
var config = require("../conf/config");
<% } %>
log4js.configure({
    appenders : [
        {type : "console"},
        { type : "file", filename : config.log.toString()}
    ]
});
var logger = log4js.getLogger("xueban3");
<% if(version === "koa2") { %>
export default logger;
<% }else{ %>
module.exports = logger;
<% } %>
