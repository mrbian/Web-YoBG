var bunyan = require('bunyan');
var path = require('path');
var fs = require('fs');

var globalConfig = require('./config.js');
var logConfig = globalConfig.log,
    accessPath = logConfig.access(),
    errorPath = logConfig.error();

if (!fs.existsSync(logConfig.dir())) {
    fs.mkdirSync(logConfig.dir());
}

var logger = bunyan.createLogger({
    name: 'foundationLog',
    streams: [
        {
            level: 'info',
            path: accessPath
        },
        {
            level: 'debug',
            path: accessPath
        },
        {
            level: 'error',
            path: errorPath
        },
        {
            level: 'fatal',
            path: errorPath
        }
    ],
});

logger._error = logger.error;
logger.error = function () {
    logger._error.apply(this, arguments);
};

module.exports = logger;
