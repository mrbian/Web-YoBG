/**
 * 一个方法集
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */

// local module
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

// my config
var pkg = require("../package.json");
var signature = pkg.signature;       // 加密密钥

var utilx = (function(){
    /**
     * 自动引入文件
     * @param nextPath 要引入的文件的路径，一般是__dirname
     * @param callback  回调函数，回调函数的参数是规定路径下的所有文件
     */
    var autoImport = (nextPath,callback) => {
        var isDir = fs.statSync(nextPath).isDirectory();
        if(isDir){
            fs
                .readdirSync(nextPath)
                .filter((file) => {
                    return file !== "index.js" && file !== "migrate.js" && file.indexOf(".") !== 0;
                }).forEach((fileName) => {
                var tmpPath = path.join(nextPath,fileName);
                if(fs.statSync(tmpPath).isDirectory()){
                    autoImport(tmpPath,callback);
                }else{
                    callback(tmpPath);
                }
            });
        }
    };

    /**
     * 根据不固定参数生成token，将这两个信息存储在token中
     * @param args
     * @returns {*|Promise.<Array.<affectedCount, affectedRows>>}
     */
    var generatorToken = (...args) => {
        var str = args[0];
        args.forEach(function(ele,i){
            if(i == 0){
                return;
            }
            str += '&' + ele;
        });
        var cipher = crypto
            .createCipher('aes192',signature);
        var token = cipher.update(str,'utf8','base64');
        token += cipher.final('base64');
        return token;
    };

    /**
     * 解密token后得到里面的信息
     * @param encrypted   加密数据
     * @returns {Array|*} 信息数组 本应用 array[0] 对应学号，array[1] 对应密码
     */
    var getTokenInfo = (encrypted) => {
        var decipher = crypto
            .createDecipher('aes192', signature);
        var decrypted = decipher
            .update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        //console.log(decrypted);
        return decrypted.split('&');
    };

    /**
     * 包裹前后台通信的信息
     * @param msg
     * @param isError
     * @param code
     * @returns {{status: number, error: string, msg: {}}}
     */
    var msgWrapper = (msg,isError,code) => {
        if(! isError && typeof msg !== "object"){      // 如果不是错误而且msg不是对象
            throw new Error("return msg format do not accord with requirement");   // 返回消息格式不符合要求
        }
        return {
            status : isError ? 0 : 1,
            error : isError ? msg : "none",
            msg : isError ? {} : msg,
            code : code || 0
        }
    };

    /**
     * 包含状态码的消息包裹函数，用于系统内部使用
     * @param code
     * @param msg
     * @param error
     * @returns {{code: *, msg: *, error: *}}
     */
    var codeMsgWrapper = (code,msg,error) => {
        if(! error && typeof msg !== "object"){      // 如果不是错误而且msg不是对象
            throw new Error("return msg format do not accord with requirement");   // 返回消息格式不符合要求
        }
        return {
            code : code,
            msg : msg || {},
            error : error || "none"
        }
    };

    /**
     * 根据唯一标识生成LoginToken
     * @param account
     * @returns {*}
     */
    var generatorLoginToken = (account) => {
        var LoginToken = crypto
            .createHmac('sha1',account)
            .update(getUniqueStr())
            .digest('base64');
        return LoginToken;
    };

    /**
     * 得到随机的字符串
     * @param length 默认长度为6
     * @returns {string}
     */
    var getRandomStr = (length) => {
        length = parseInt(length) || 6;
        return parseInt(Math.random() * Math.pow(10,length)).toString();
    };

    /**
     * 得到唯一的字符串
     * @param length 默认长度为6
     * @returns {string}
     */
    var getUniqueStr = (length) => {
        length = -(parseInt(length)) || -6;
        var timer = new Date().getTime().toString();
        return timer.substr(length);
    };

    /**
     * 判断对象是null还是undefined
     * @param variable
     * @returns {boolean}
     */
    var isNullOrUndefined = (variable) => {
        return typeof(variable) === "undefined" || variable === null;
    };

    /**
     * 扩展一个对象
     * @param oldObj
     * @param obj 需要被扩展的对象
     * @returns {*}
     *
     * @template
     * if (add === null || typeof add !== 'object') return origin;
     * var keys = Object.keys(add);
     * var i = keys.length;
     * while (i--) {
     *    origin[keys[i]] = add[keys[i]];
     * }
     * return origin;
     */
    var extend = (oldObj,obj) => {
        Object.keys(oldObj).forEach((e,i) => {
            obj[e] = oldObj[e];
        });
        return obj;
    };

    /**
     * 判断对象是否为空
     * @param obj
     * @returns {boolean}
     */
    var isEmptyObject = (obj) => {
        var t;
        for(t in obj){
            return !1;
        }
        return !0;
    };

    return {
        autoImport,
        generatorToken,
        msgWrapper,
        codeMsgWrapper,
        getTokenInfo,
        generatorLoginToken,
        getRandomStr,
        getUniqueStr,
        isNullOrUndefined,
        extend,
        isEmptyObject,
    }
}());

module.exports = utilx;