'use strict';

//设置 node环境为开发环境'development', 生产环境 'production'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//日志开启行号
process.env.LOGGER_LINE = true;

process.env.IDENTIFY = new Date().getTime();

// 引入依赖包文件
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    confing = require("./config/config"),//配置文件
    i18n = require('i18n'),//国际化
    RedisStore = require('connect-redis')(session);
    var RequestHelper = require("./tools/HttpPromise");

    global.$http = new RequestHelper() ;
    
var app = express();
//日志配置
require('pomelo-logger').configure('./config/log4js.json');
var logger = require('./tools/utils').logger;

// 视图引擎配置
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require("ejs").__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 日志
// var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {
//     flags: 'w',
//     encoding: 'UTF-8',
//     mode: 0666
// });
// app.use(logger('dev'));
// app.use(logger('dev', {stream: accessLogStream}));
//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理
app.use(bodyParser.json());
//用来解析我们通常的form表单提交的数据
app.use(bodyParser.urlencoded({extended: false}));
//处理请求的cookie
app.use(cookieParser(confing.session.secret));
//默认静态资源
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/client')));
app.use(express.static(path.join(__dirname, 'public')));

//国际化配置
i18n.configure(confing.i18n);
app.use(i18n.init);
app.use(setLocale);

// 定义setLocale中间件
function setLocale(req, res, next){
    var locale;
    // 当req进入i18n中间件的时候
    // 获取cookie中的locale数据
    if(req.signedCookies['locale']){
        locale = req.signedCookies['locale'];
    }
    // 获取浏览器第一个偏好语言，这个函数是express提供的
    else if(req.acceptsLanguages()){
        locale = req.acceptsLanguages();
    }
    // 没有语言偏好的时候网站使用的语言为中文
    else{
        locale = 'zh_CN';
    }
    // 如果cookie中保存的语言偏好与此处使用的语言偏好不同，更新cookie中的语言偏好设置
    if(req.signedCookies['locale'] !== locale){
        res.cookie('locale', locale, { signed: true, httpOnly: true });
    }
    // if(req.signedCookies['locale'] == locale){
    //     res.cookie('locale', locale, { signed: true, httpOnly: true });
    // }
    // 设置i18n对这个请求所使用的语言
    req.setLocale(locale);
    next();
};

//session-redis配置
app.use(session({
    key: confing.session.key,
    secret: confing.session.secret,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore(confing.redis),
    cookie: {maxAge: 60 * 1000 * 30}
}));

// 路由中间件
require('./routes')(app);
// require('./socketServer');

module.exports = app;
