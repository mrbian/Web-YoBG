/**
 * 总路由控制文件
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if(version === "koa2") { %>
// library module
import Router from "koa-router";

// my module
import utilx from "../lib/utilx";
import debug from "../instances/debug.js";
import auth from "../instances/auth.js";
import logger from "../instances/logger";

const router = new Router({
    prefix: "/"
});

/**
 * 错误处理中间件
 */
router.use(async (ctx,next) => {
    try{
        await next();
    }catch(err){
        debug(err);
        logger.error(err);
        ctx.status = 500;
        ctx.body = utilx.msgWrapper("server error",true);
    }
});

/**
 * 身份认证中间件
 */
router.use(async (ctx,next) => {

    var re = /^\/token\/.*/gi;             // 根据访问路径对用户的权限进行管理
    if(re.test(ctx.req.url)){                       // 如果访问的路径需要token

    }
    await next();
});

utilx.autoImport(__dirname,(tmpPath) => {   // 自动引入
    require(tmpPath)(router);
});

const routes = router.routes();

export default () => routes
<% }else{ %>
// library module
var Router = require('koa-router');

// local module
var fs = require('fs');
var path = require('path');
var util = require('util');

// my module
var db = require('./../models/index.js');
var debug = require('./../instances/debug.js');
var context = require('./../instances/context.js');
var auth  = require("../instances/auth");

var router = new Router();

/****************************
 登录过滤
 ***************************/
router.use(function *(next) {
    context.set(this);
    var req = this.request;

    if(/\/token\/*/.test(req.url)){   //通过req.url过滤

    }
    yield next;
});

/****************************
 * 路由自动引入
 * 注意：添加新的路由文件后请重启supervisor
 ***************************/

var loadDir = (dir) => {
    fs
        .readdirSync(dir)
        .forEach( (file) => {
            var nextPath = path.join(dir, file);
            var stat = fs.statSync(nextPath);
            if (stat.isDirectory()) {
                loadDir(nextPath);
            } else if (stat.isFile() && file.indexOf('.') !== 0 && file !== 'index.js') {
                require(nextPath)(router);
            }
        });
};

loadDir(__dirname);

module.exports = router.middleware();

<% } %>