/**
 * 模仿koa检查路由参数的方式检查函数的参数
 * 目前只能在ES5的非严格模式下使用
 * 只能用于非箭头函数
 *
 * @author <%= author %>
 * @createDate <%= date %>
 *
 * @example
 * function test (a,b){
 *   validator.checkParams("b").notEmpty();
 *   if(validator.errors){
 *       throw new Error(validator.toJSON());
 *   }
 *   return a + b;
 * }
 * test(1);
 */
var KoaValidator = require("koa-validate").Validator;

var validator =  (() => {
    /**
     * 检查参数
     * @param key
     * @returns {*|Validator}
     */
    var checkParams = function(key){
        var callerFn = validator.checkParams.caller;
        var args = callerFn.arguments;       // 得到要检查的函数的arguments对象
        var keys = getArgs(callerFn);       // 得到参数名称
        var index = keys.indexOf(key);      // 得到参数在参数列表中的下标
        return new KoaValidator(this,key,args[index],index in args,args);
    };

    /**
     * 使用正则表达式得到函数的参数名称
     * @param func
     * @returns {Array.<*>}
     */
    var getArgs = function(func){
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1]; // 其中 ^ 是除了的意思，match返回数组第一个是匹配到的，第二个是分组匹配到的
        if(args == null){
            throw new Error("this function do not have arguments");
        }
        return args.split(",").map(function(arg){
            return arg.replace(/\/\*.*\*\//,"").trim();     // 去除注释以及空格
        }).filter(function(arg){        // 确保没有undefined
            return arg;
        });
    };

    /**
     * 用于打印错误
     */
    var toJSON = function () {
        return JSON.stringify(this.errors);
    };

    return {
        checkParams,
        toJSON
    }
})();
