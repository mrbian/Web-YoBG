var path = require('path');
var fs = require('fs');

module.exports = {
    db: {
        name: 'mysql',
        username: 'name',
        pwd: 'pwd',
        host:'127.0.0.1',
        database: 'dbname',
        toString() {
            return `${this.name}://${this.username}:${this.pwd}@${this.host}/${this.database}`;
        }
    },
    redis: {
        port: '6379',
        host: '127.0.0.1',
        pwd: ''
    },
    log: {
        _dir: undefined,
        dir()  {
            if (!this._dir) {
                this._dir = path.join(__dirname, '..', 'log');
            }
            return this._dir;
        },
        access() {
            return path.join(this.dir(), 'acces.log');
        },
        error() {
            return path.join(this.dir(), 'error.log');
        }
    },
    root: __dirname + '/../',
    appname : 'appname'
};
