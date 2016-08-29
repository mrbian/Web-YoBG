/**
 * 主程序代码
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if (version === "koa2") { %>
// local module
import fs from "fs";
import path from "path";

// library module
import Koa from "koa";
import morgan from "koa-morgan";
import serve from "koa-static";
import convert from "koa-convert";
import validate from "koa-validate";
import bodyParser from "koa-bodyparser";

// my module
import routeMiddleWare from "./router/index.js";
import oAuthMiddleWare from "./OAuth/index.js";

// my config
import pkg from "./package.json";

const port = pkg.port;

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,"./access.log"),
    {flags:"a"}
);


const app = new Koa();

app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser());
app.use(convert(serve(__dirname + "/public")));
validate(app);
app.use(routeMiddleWare());
app.use(oAuthMiddleWare());

app.listen(port);

export default app;

<% } else { %>
// library module
var koa = require("koa");
var koaBody = require("koa-body");
var staticServer = require("koa-static");
var favicon = require("koa-favicon");
var koaValidate = require("koa-validate");

// local module
var path = require("path");

// my module
var cache = require("./lib/cache");
var router = require("./router/index");
var log = require("./instances/logger");

// my config
var pkg = require("./package.json");
var port = pkg.port;

// ------------------------------------------------
var app = koa();
app.env = "development";

// static file
app.use(staticServer(path.join( __dirname, "public")));
// favicon
app.use(favicon(__dirname + "/public/favicon.ico"));
// http parse
app.use(koaBody());
//request validate
app.use(koaValidate());
// route
app.use(router);

// app.on("error", (err, ctx) => {
//     console.log(err);
//     log.error("server error", err, ctx);
//  });
app = app.listen(port);
module.exports = app;
<% } %>