/**
 * 测试文件所共用的变量
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */

//  library module
var should = require('should');
var superagentPromisePlugin = require('superagent-promise-plugin');
require('es6-promise').polyfill();
var request = superagentPromisePlugin.patch(require('superagent'));
var charset = require("superagent-charset");
charset(request);

// my module
var utilx = require('../lib/utilx');
var cache = require('../lib/cache');

// my config
var pkg = require('../package.json');
var port = pkg.port;
var host = `http://localhost:${port}`;

var prefix = (url) => host + '/token' + url;

module.exports = {
    request,
    host,
    utilx,
    cache,
    pkg,
    prefix
};