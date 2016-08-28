// parties
var koa = require('koa');
var koaBody = require('koa-body');
var staticServer = require('koa-static');
var favicon = require('koa-favicon');
var koaValidate = require('koa-validate');

// local module
var path = require('path');

// my module
var cache = require('./instances/cache');
var router = require('./routes/index');
var log = require('./instances/log.js');

// ------------------------------------------------
var app = koa();
var port = 8765;
app.env = 'development';

// static file
app.use(staticServer(path.join( __dirname, 'public')));
// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));
// http parse
app.use(koaBody());
//request validate
app.use(koaValidate());
// route
app.use(router);

app.on('error', (err, ctx) => {
    console.log(err);
    log.error('server error', err, ctx);
 });
app = app.listen(port);
module.exports = app;