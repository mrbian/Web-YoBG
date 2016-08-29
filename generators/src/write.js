/**
 * copy文件和文件夹逻辑
 *
 * @author bian
 * @createDate 2016.8.28
 */
var path = require("path");

module.exports = function (Generator) {

    Generator.prototype.createProject = function () {
        var join = path.join;
        this.sourceRoot(join(__dirname,"../templates"));

        var template = function (dest,data) {           // 使用ejs模板创建文件和文件夹
            this.log("copy",dest);
            this.template(this.templatePath(dest),join(process.cwd(),dest),data);
        }.bind(this);

        template("test.js",{
            name : "bian",
            createDate : "hello"
        });

        template("test",{
            name : "sdd",
            createDate : "sdds"
        });
    };
};