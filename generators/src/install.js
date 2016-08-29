/**
 * 安装npm和bower依赖模块
 *
 * @author bian
 * @createDate 2016.8.28
 */
module.exports = function(Generator) {

    Generator.prototype.install = function(){
        var packages = [];
        var join = path.join;
        this.sourceRoot(join(__dirname,"../templates"));

        var content = require(this.templatePath("package.json"));

        console.log(content);
        Object.keys(JSON.parse(content.dependencies)).map(function(item){
            console.log(item);
        });

        // this.npmInstall([""], { "save": true });
    };
};