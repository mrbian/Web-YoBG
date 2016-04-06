var redis = require('redis');
var redisCoWrapper = require('co-redis');

var log = require('./log');
var globalConfig = require('./config');
var util = require('util');

var client = redis.createClient(
    globalConfig.redis.port,
    globalConfig.redis.host,
    {
        auth_pass: globalConfig.redis.pwd
    }
);

client.on('error', function (err) {
    log.error('Error', err, new Date());
});

/***************************
 * 添加前缀防止redis冲突
/***************************/
var commands = ['set', 'setex', 'get'];

commands.forEach( function (cmd)  {
    var oldCmd = `_${cmd}`;
    client[oldCmd] = client[cmd];
    client[cmd] = function (key, arg, cb) {
        arguments[0] =  globalConfig.appname +  `/${arguments[0]}`;
        return client[oldCmd].apply(this, arguments);
    };
});

/***************************
 * 包裹原函数格式化存储json数据
 /***************************/
client.jsetex = (key, expire, val, callback) => {
    return client.setex(key, expire, JSON.stringify(val), callback);
};

var redisCo = redisCoWrapper(client);

/***************************
 * 包裹原函数格式化提取json数据
 /***************************/
redisCo.jget = function *(key) {
    var val = yield redisCo.get(key);
    return util.isNullOrUndefined(val) ? val : JSON.parse(val);
};

redisCo._client = client;

module.exports = redisCo;