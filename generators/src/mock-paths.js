/**
 * 从paths.json获得默认的paths，方便测试
 *
 * @author bian
 * @createDate 2016.8.28
 */

var paths = require("../paths.json");

var mockPaths = {
    paths: {},
    type : {}
};

paths.forEach(function(option){
    mockPaths.paths[option.name] = option.default;
    mockPaths.type[option.name] = option.type;
});

module.exports = mockPaths;