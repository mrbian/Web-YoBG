/**
 * 单元测试
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */

var common = require('./common');

// auto define common variable
var evalString = '';
Object.keys(common).forEach((e,i) => {
    evalString += `var ${e} = common.${e};`;
});
if(typeof(evalString) !== 'undefined' || evalString !== null){
    eval(evalString);
}

