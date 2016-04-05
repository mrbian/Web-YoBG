/**
 * Created by 55456 on 2016/4/5.
 */
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    start: function () {
        var done = this.async();
        this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Please enter your project name',
            default : this.appname
        }, function (answers) {
            this.config.set({name:answers.name});
            done();
        }.bind(this));
    },
    chooseSql: function(){
        var done = this.async();
        this.prompt({
            type    : 'list',
            name    : 'sql',
            message : "Please select the sql you want to use",
            choices : [ "mysql","pgsql"]
        },function (answers){
            this.config.set({sql:answers.sql});
            done();
        }.bind(this));
    },
    end : function(){
        this.config.save();
        var configs = this.config.getAll();
        this.log(configs);
    }
});