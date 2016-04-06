/**
 * Created by 55456 on 2016/4/5.
 */
var yeoman = require('yeoman-generator');
var fs = require('fs');
var util = require('util');

var Generator = module.exports = function Generator(){
    yeoman.Base.apply(this,arguments);

};

util.inherits(Generator,yeoman.Base);

Generator.prototype.askProjectName = function (){
    var done = this.async();
    this.prompt({
        type    : 'input',
        name    : 'name',
        message : 'Please enter your project name',
        default : "koa"
    }, function (answers) {
        this.config.set({name:answers.name});
        done();
    }.bind(this));
};

Generator.prototype.askSql = function () {
    var done = this.async();
    this.prompt({
        type    : 'list',
        name    : 'sql',
        message : "Please select the sql you want to use",
        choices : [ "mysql","pgsql"]
    },function (answers){
        this.config.set({sql:answers.sql});
        this.config.save();
        done();
    }.bind(this));
};

Generator.prototype.askConfirm = function(){
    var done = this.async();
    this.prompt({
        type    : 'confirm',
        name    : 'confirm',
        message : 'Are you ready?',
        default : true
    },function(answers){
        if(!answers.confirm){
            process.exit(0);
        }
        done();
        this.composeWith('koa:common',{options:{
            name:this.config.get('name'),
            sql:this.config.get('sql')
        }});
    }.bind(this));
};