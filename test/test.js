/**
 * Created by 55456 on 2016/4/6.
 */
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var path = require('path');
describe('yo koa', function () {
    // before(function (done) {
    //     helpers.run(require.resolve('../app'))
    //         .withGenerators([[helpers.createDummyGenerator(), 'koa:common']])
    //         // .withPrompts({ name:"koa" })
    //         // .withPrompts({ sql:"mysql" })
    //         // .withPrompts({ confirm:true })
    //         .on('ready', function (generator) {
    //         })
    //         .on('end', function(){
    //             assert.file(['koa/webpack.config.js']);
    //             done();
    //         });
    // });
    it('generate directory and files',function (done){
        helpers.run(require.resolve('../app'))
            .withGenerators([[helpers.createDummyGenerator(), 'koa:common']])
            // .withPrompts({ name:"koa" })
            // .withPrompts({ sql:"mysql" })
            // .withPrompts({ confirm:true })
            .on('ready', function (generator) {
            })
            .on('end', function(){
                assert.file(['koa/webpack.config.js']);
                done();
            });
    });
    // it('generate views directory and files');
    // it('generate instances directory and files');
});