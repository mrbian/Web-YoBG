/**
 * 从options.json获得默认的options，可以让测试代码或其他地方获得默认的options
 *
 * @author bian
 * @createDate 2016.8.28
 */

var options = require('../options.json');

var mockOptions = {
    defaults: {}
};

options.forEach(function (option) {
    mockOptions.defaults[option.name] = option.defaults;
});

module.exports = mockOptions;