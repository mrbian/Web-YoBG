/**
 * 安装npm和bower依赖模块
 *
 * @author bian
 * @createDate 2016.8.28
 */
module.exports = function(Generator) {

    Generator.prototype.install = function(){
        this.spawnCommand("npm", ["install"]);
    };
};