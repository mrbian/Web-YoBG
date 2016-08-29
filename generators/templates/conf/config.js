/**
 * 整个程序的配置文件
 *
 * @author <%= author %>
 * @createDate <%= date %>
 */
<% if (version === "koa2") { %
import path from "path";
<% } else {%>
var path = require("path");
<% } %>
const Config = {
    db:{
        host : "127.0.0.1",
        name : "<%= sql %>",
        user : "<%= sql %>",
        pwd : "password",
        dbname : "dbname",
        toString() {
            return `${this.name}://${this.user}:${this.pwd}@${this.host}:${this.port}/${this.dbname}`;
        }
    },

    redis:{
        host : "127.0.0.1",
        pwd : "",
        prefix : "xueban3"
    },

    ftp : {
        host : "127.0.0.1",
        user : "ftpUser",
        password : "ftpPassword"
    },

    log : {
        path : path.join(__dirname,"../"),
        name : "<%= project %>.log",
        toString(){
            return path.join(this.path,this.name);
        }
    }
};

<% if (version == "koa2") { %>
export default Config;
<% }else { %>
module.exports = Config;
<% } %>