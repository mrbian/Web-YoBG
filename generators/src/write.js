/**
 * copy文件和文件夹逻辑
 *
 * @author bian
 * @createDate 2016.8.28
 */
var path = require("path");
var paths = require("./mock-paths");
var chalk = require("chalk");

module.exports = function (Generator) {

    Generator.prototype.createProject = function () {
        var join = path.join;
        this.sourceRoot(join(__dirname,"../templates"));

        var template = function (src,dest,data) {           // 使用ejs模板创建文件和文件夹
            this.log(`copy ${dest} from ${src}`);
            this.template(this.templatePath(src),join(process.cwd(),dest),data);
        }.bind(this);

        var answers = this.props.answers;
        var sql = answers.sql;
        var version = answers.version;
        var author = answers.name;
        var project = answers.project;
        var date = new Date();
        date = `${date.getFullYear()}.${date.getUTCMonth()}.${date.getUTCDay()}`;

        var paths = paths.paths;
        try{
            Object.keys(paths.paths).forEach((name) => {
                template(name,paths.paths[name],{
                    author : author,
                    version : version,
                    sql : sql,
                    project : project,
                    date : date
                });
            });
        }catch(err){
            this.log(err);
        }

        this.log("file template copy is over");
    };
};