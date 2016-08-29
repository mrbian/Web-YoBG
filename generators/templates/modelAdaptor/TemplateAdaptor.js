/**
 * 数据库读写操作函数集，让router层更具语义化
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if(version === "koa2") { %>
import utilx from "../lib/utilx";
import db from "../models/index";
<% }else{ %>
var utilx = require("../lib/utilx");
var db = require("../models/index");
<% } %>
var TemplateAdaptor = (function(){
    var example = function () {

    };

    return {
        example
    };
}());
<% if(version === "koa2") { %>
export default TemplateAdaptor;
<% }else{ %>
module.exports = TemplateAdaptor;
<% } %>