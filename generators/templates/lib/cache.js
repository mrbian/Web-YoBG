/**
 * redis数据库存取操作集
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
var redis = require('redis');
var Promise = require('bluebird');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();
var commands = ['set', 'setex', 'get','getAsync','setexAsync'];
var prefix = 'xueban3';

commands.forEach( function (cmd)  {
    var oldCmd = `_${cmd}`;
    client[oldCmd] = client[cmd];
    client[cmd] = function (key, arg, cb) {
        arguments[0] = `${prefix}/${arguments[0]}`;
        return client[oldCmd].apply(this, arguments);
    };
});

client.jsetex = (key,expire,value) => client.setexAsync(key,expire,JSON.stringify(value));
client.jget = (key) => {
    return client.getAsync(key).then((res) => {
        return JSON.parse(res);
    });
};

module.exports = client;