/**
 * 配置整个工程内所有文件和文件夹的路径
 *
 * @author bian
 * @createDate 2016.8.28
 */

var options = require("./mock-options");
module.exports = function(Generator){

    Generator.prototype.getOptions = function(){
        this.props.options = options;
    };
};