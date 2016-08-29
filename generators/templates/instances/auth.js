/**
 * 对用户的session进行管理
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if(version === "koa2"){ %>

import cache from "../lib/cache.js";
import util from "util";
import db from "../models/index";
const Student = db.models.Student;
export default {

<% }else { %>

var util = require("util");
var cache = require("../lib/cache.js");
var db = require("../models/index");
const Student = db.models.Student;
module.exports = {

<% } %>
    /**
     * 根据LoginToken验证用户
     * @param ctx
     * @returns {*}
     */
    user : (ctx) => {
        var LoginToken = ctx.request.get("LoginToken");
        if(util.isNullOrUndefined(LoginToken)) return null;
        return cache.jget(LoginToken).then((user) => {
            if(!! user) {
                cache.jsetex(LoginToken, 5 * 60,user);  // 自动延长五分钟
                return Student.findOne({
                    where : {
                        token : user.token
                    }
                });
            }
            return null;
        });
    },

    /**
     * 根据LoginToken 登录用户记录用户session
     * @param LoginToken
     * @param user
     */
    login : (LoginToken,user) => {
        cache.jsetex(LoginToken,5 * 60,user);   // 设置五分钟后失效
    }
}