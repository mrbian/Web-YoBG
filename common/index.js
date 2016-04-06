/**
 * Created by 55456 on 2016/4/6.
 */
var path = require('path');
var util = require('util');
//直接引入另一个Generator不会触发yo，因为被引用的这个yo根本没有被创建，我们只是用它的方法，真正exports的还是这里的Generator
var scirptBase = require('../script-base');

var Generator = module.exports = function Generator(){
    scirptBase.apply(this,arguments);
};

util.inherits(Generator,scirptBase);

Generator.prototype.createTemplate = function (){
    var configs = this.options;
    //this.log(configs);
    this.setupEnv();
    this.setupConfig();
    //this.InstallPackage();
};