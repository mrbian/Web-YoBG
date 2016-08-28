/**
 * 生成器的主文件，负责整个生成器的启动和清理
 *
 * @author bian
 * @createDate 2016.4.6
 */

// local module
var fs = require('fs');
var util = require('util');

// library module
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var Generator = generators.Base.extend({
    constructor : function (){
        generators.Base.apply(this, arguments);
    },

    /**
     * Print welcome
     */
    info : function(){
        this.log(yosay(
            chalk.red('Welcome!') + '\n' +
            chalk.yellow('You\'re using the fantastic generator for backstage application!')
        ));
    }
});

require("../src/options")(Generator);
require("../src/prompts")(Generator);
require("../src/write")(Generator);
require("../src/install")(Generator);
require("../src/clean")(Generator);

module.exports = Generator;
// Generator.prototype.setupEnv = function(){
//     var join = path.join;
//     this.sourceRoot(join(__dirname,"./templates"));
//     var copy = function (dest){
//         this.copy(this.templatePath(dest),join(__dirname,"./koa/",dest));
//     }.bind(this);
//     var directory = function (dest){
//         this.directory(this.templatePath(dest),join(__dirname,"./koa/",dest));
//     }.bind(this);
//     copy("webpack.config.js");
//     copy("目录说明.md");
//     copy("路由说明.md");
//     copy(".bowerrc");
//     copy(".gitignore");
//     copy(".jshintrc");
//     directory("test");
//     this.bulkDirectory("views",join(__dirname,"./koa/views"));
//     directory("src");
//     directory("scripts");
//     directory("routes");
//     directory("public");
//     directory("helpers");
// };

// Generator.prototype.setupConfig = function (){
//     this.log("second");
//     var join = path.join;
//     this.sourceRoot(join(__dirname,"./templates"));
//     var copy = function (dest){
//         this.copy(this.templatePath(dest),join(__dirname,"./koa/",dest));
//     }.bind(this);
//     var directory = function (dest){
//         this.directory(this.templatePath(dest),join(__dirname,"./koa/",dest));
//     }.bind(this);
//     directory("instances");
// };

// Generator.prototype.InstallPackage = function(){
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
// };

// Generator.prototype.askProjectName = function (){
//     var done = this.async();
//     this.prompt({
//         type    : 'input',
//         name    : 'name',
//         message : 'Please enter your project name',
//         default : "koa"
//     }, function (answers) {
//         this.config.set({name:answers.name});
//         done();
//     }.bind(this));
// };
//
// Generator.prototype.askSql = function () {
//     var done = this.async();
//     this.prompt({
//         type    : 'list',
//         name    : 'sql',
//         message : "Please select the sql you want to use",
//         choices : [ "mysql","pgsql"]
//     },function (answers){
//         this.config.set({sql:answers.sql});
//         this.config.save();
//         done();
//     }.bind(this));
// };
//
// Generator.prototype.askConfirm = function(){
//     var done = this.async();
//     this.prompt({
//         type    : 'confirm',
//         name    : 'confirm',
//         message : 'Are you ready?',
//         default : true
//     },function(answers){
//         if(!answers.confirm){
//             process.exit(0);
//         }
//         done();
//         this.composeWith('koa:common',{options:{
//             name:this.config.get('name'),
//             sql:this.config.get('sql')
//         }});
//     }.bind(this));
// };