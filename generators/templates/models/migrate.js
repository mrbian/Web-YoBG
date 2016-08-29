/**
 * 数据库Seed数据代码，仅在测试阶段使用
 *
 * @author bian
 * @createDate 2016.5.21
 */
<% if (version === "koa2"){ %>
// my module
import db from "../models/index";
import logger from "../instances/logger";
async function seed () {
    await db.sync({force:true});
    try{
    }catch(err){
         logger.error(err);
    }
    console.log('finished');
    process.exit(0);
}

try{
    seed();
}catch(err){
    console.log(err);
}
<% }else{ %>
// library module
var co = require("co");

// my module
var db = require("../models/index");

function * seed () {

}

co(function *(){
    yield db.sync({force:true});
    seed();
}).catch(function(err){
    console.log(err);
});
<% } %>
