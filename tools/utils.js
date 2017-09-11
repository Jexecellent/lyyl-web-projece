/**
 * Created by hxl on 2017/5/13.
 */
var i18n = require('i18n');
var getlocalHost = function () {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var localIp = "";
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (localIp){ return; }
            if (iface.address && iface.address != "127.0.0.1") {
                localIp = iface.address;
            }
        });
    });

    return localIp;
};
var haiyao = {
    localHost : getlocalHost(),
    version : 2
};

/*
const log4js = require('log4js');
log4js.loadAppender('log4js-kafka-appender');
log4js.addAppender(log4js.appenders['log4js-kafka-appender']({
        host: '192.168.1.193',
        port: 9092,
        topic: 'weblog',
        level: 'INFO',
        converter: function(loggingEvent){
            const data = {
                data: loggingEvent.data,
                level: loggingEvent.level.levelStr,
                startTime: loggingEvent.startTime,
                categoryName: loggingEvent.categoryName
            };
            return JSON.stringify(data);
    }}));
*/
//统一日志
//haiyao.restlogger = require('pomelo-logger').getLogger('haiyaorest-log');
var infologger = require('pomelo-logger').getLogger('info-log');
var errorlogger = require('pomelo-logger').getLogger('error-log');

haiyao.logger = {
    info:infologger.info,
    error:errorlogger.error,
    debug:console.debug
}

//每次系统重启时生成版本号
haiyao.version = new Date().getTime();

/**
 * 取客户端用户ip
 * @param req
 * @returns {*}
 */
haiyao.getClientIp = function(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

haiyao.isAjax = function (req) {
    if (req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest') {
        // 是AJAX请求
        return true;
    } else {
        // 普通请求
        return false;
    }
};

module.exports = haiyao;