/**
 * 上下文对象
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
var context;
<% if(version === "koa1") { %>
module.exports = {
    get : function() {
        return context;
    },
    set : function(ctx) {
        context = ctx;
    }
};
<% }else { %>
export default {
    get : function() {
        return context;
    },
    set : function(ctx) {
        context = ctx;
    }
};
<% } %>
