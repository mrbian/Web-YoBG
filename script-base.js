/**
 * Created by 55456 on 2016/4/6.
 */
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var fs = require("fs");

var Generator = module.exports = function Generator(){
    yeoman.Base.apply(this,arguments);
};

util.inherits(Generator,yeoman.Base);

Generator.prototype.setupEnv = function(){
    var join = path.join;
    this.sourceRoot(join(__dirname,"./templates"));
    var copy = function (dest){
        this.copy(this.templatePath(dest),join(__dirname,"./koa/",dest));
    }.bind(this);
    var directory = function (dest){
        this.directory(this.templatePath(dest),join(__dirname,"./koa/",dest));
    }.bind(this);
    //*****************************************************************************
    // 别人家的代码 - -’ 一个函数就搞定相对root路径，一个for解决文件复制
    // 不过学了一招，不开放的参数使用_前缀来重写函数，然后写个函数不暴露参数接口
    /*actions._directory = function _directory(source, destination, process, bulk) {
        // Only add sourceRoot if the path is not absolute
        var root = this.templatePath(source);
        var files = glob.sync("**", { dot: true, nodir: true, cwd: root });
        destination = destination || source;
        if (typeof destination === "function") {
            process = destination;
            destination = source;
        }
        var cp = this.copy;
        if (bulk) {
            cp = this.bulkCopy;
        }
        // get the path relative to the template root, and copy to the relative destination
        for (var i in files) {
            var dest = path.join(destination, files[i]);
            cp.call(this, path.join(root, files[i]), dest, process);
        }
        return this;
    };*/

    //自己的代码(T_T)
    /*var mycopy = function(source,destination,process,bulk){
        this.copy(source,destination,process,bulk);
    }.bind(this);

    var mydirectory = function (source,destination,process,bulk,source_root){
        var root = this.templatePath(source);
        source_root = source_root ? source_root : this.templatePath(source);
        fs
            .readdirSync(source)
            .forEach(function (item) {
                var nextPath = path.join(root,item);
                var stat = fs.statSync(nextPath);
                if (stat.isDirectory()) {
                    mydirectory(path.join(root,item),destination,process,bulk,source_root);
                } else {
                    var filePath = path.relative(source_root,nextPath);
                    mycopy(nextPath,path.join(destination,filePath),process,bulk);
                }
            });
    }.bind(this);

    mydirectory(this.templatePath("routes"),path.join(__dirname,"./koa/routes"));*/
    //*****************************************************************************//

    copy("webpack.config.js");
    copy("目录说明.md");
    copy("路由说明.md");
    copy(".bowerrc");
    copy(".gitignore");
    copy(".jshintrc");
    directory("test");
    this.bulkDirectory("views",join(__dirname,"./koa/views"));
    directory("src");
    directory("scripts");
    directory("routes");
    directory("public");
    directory("helpers");
};

Generator.prototype.setupConfig = function (){
    var join = path.join;
    this.sourceRoot(join(__dirname,"./templates"));
    var copy = function (dest){
        this.copy(this.templatePath(dest),join(__dirname,"./koa/",dest));
    }.bind(this);
    var directory = function (dest){
        this.directory(this.templatePath(dest),join(__dirname,"./koa/",dest));
    }.bind(this);
    directory("instances");
};

Generator.prototype.InstallPackage = function(){
    // var packages = [];
    // var join = path.join;
    // this.sourceRoot(join(__dirname,"./templates"));
    //这里文件读取一直出错，不再安装依赖，直接复制package.json
    // var content = fs.readFileSync(this.templatePath("package.json"),"utf8");
    // this.log(content["dependencies"]);
    // Object.keys(JSON.parse(content.dependencies)).map(function(item){
    //     console.log(item);
    // });
    // this.npmInstall([""], { "save": true });
};