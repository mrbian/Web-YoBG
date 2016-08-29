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
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var Generator = yeoman.Base.extend({
    constructor : function (){
        yeoman.Base.apply(this, arguments);
        this.props = {};
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
// require("../src/prompts")(Generator);
require("../src/write")(Generator);
// require("../src/install")(Generator);

module.exports = Generator;