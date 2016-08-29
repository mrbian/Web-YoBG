/**
 * 从options.json获得默认的options，方便测试
 *
 * @author bian
 * @createDate 2016.8.28
 */

var options = require('../options.json');

var mockOptions = {
    paths: {},
    type : {}
};

options.forEach(function(option){
    mockOptions.paths[option.name] = option.default;
    mockOptions.type[option.name] = option.type;
});

module.exports = mockOptions;