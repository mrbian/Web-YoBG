/**
 * debug 实例
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if (version === "koa2") { %>
import debug from "debug";
export default debug("<%= project %>");
<% } else { %>
var debug = require("debug");
module.exports = debug("<%= project %>");
<% } %>