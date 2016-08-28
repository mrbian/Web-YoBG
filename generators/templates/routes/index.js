// parties
var Router = require('koa-router');

// local
var fs = require('fs');
var path = require('path');
var util = require('util');

var render = require('./../instances/render.js');
var db = require('./../models/index.js');
var debug = require('./../instances/debug.js');
var auth = require('./../helpers/auth.js');
var context = require('./../instances/context.js');

var router = new Router();

/****************************
 登录过滤
 ***************************/
router.use(function *(next) {

    // context.set(this);
    // var req = this.request;
    // var user = yield auth.user(this);

    ///通过req.url前缀和user过滤

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
