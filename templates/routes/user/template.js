var render = require('../../instances/render.js');
var db = require('../../models/index.js');
var debug = require('../../instances/debug.js');
var auth = require('../../helpers/auth.js');
var context = require('../../instances/context.js');

module.exports = (router) => {
    router.get('/user/demo',function *(){
        this.body = "<h1>hello koa,here is /user/demo</h1>";
    });
};