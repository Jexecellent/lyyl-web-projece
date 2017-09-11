/**
 * 路由转发配置
 */

'use strict';
var path = require('path');
var _ = require('lodash');
var logger = require('./tools/utils').logger;

// 自定义路由控制文件
var config = require('./config/config');
var uris = require('./config/uris');
var urltool = require('url');
var redis = require("./tools/redis");
var index = require('./controllers/IndexController');
var users = require('./controllers/UserController');
var hall = require('./controllers/HallController');
var anchor = require('./controllers/AnchorController');
var mv = require('./controllers/mvController');
var rankingList = require('./controllers/RankController');
var room = require('./controllers/RoomController');
var upload = require('./controllers/UploadController');
var reportAndFeedback = require('./controllers/ReportAndFeedbackController');
var message = require('./controllers/MessageController');
var myInfo = require('./controllers/MyInfoController');
var activePage = require('./controllers/ActivePageController');
var admin = require('./controllers/Admin') ;
module.exports = function (app) {
    app.enable('trust proxy');

    //拦截处理res.send i18n返回
    app.use(function(req, res, next) {
        var __send = res.send;
        //重新定义send方法
        res.send = function(data){
            //处理
            if(typeof(data) == "object"){
                try {
                    var i18nVal = req.__(data.number);
                    if(i18nVal){
                        data.detailMsg = i18nVal;
                    }
                }catch (e) {
                    logger.error('error: %s',e.stack);
                }
            }
            return __send.apply(res, [data]);
        };
        if(next){
            next();
        }
    });

    //登录拦截
    app.use(function (req, res, next) {
        var url = req.originalUrl;
        var hasNext = true;
        if ((/^[/]upload[/]/.test(url) ||
            /^[/]raf[/]/.test(url) ||
            /^[/]myInfo[/]/.test(url) ||
            /^[/]user[/]friends[/]/.test(url)||
            /^[/]user[/]give[/]/.test(url)||
            /^[/]user[/]follow[/]/.test(url)||
            /^[/]user[/]feedback[/]/.test(url)||
            /^[/]message[/]/.test(url))
            && !/(.js|.html|.css)$/.test(url)) {
            //需要已登录才能访问的url
            var curUser = req.session ? req.session.user : null;
            if (!curUser) {
                hasNext = false;
                logger.error('unauthentication session id %s', req.session ? req.session.id : null);
                if (req.xhr) {
                    res.send({code: 403});
                } else {
                    res.render('403', {message: 'unauthentication', error: {}});
                }
                res.status(403);
            }else {
                //把用户信息添加到req里
                var params = {};
                params.companyId = curUser.companyId;
                params.userId = curUser.id;
                params.userName = curUser.name;
                if (req.method === 'GET') {
                    req.query = _.merge(req.query, params);
                } else if (req.method === 'POST') {
                    if (req.headers['content-type'].indexOf('multipart/form-data;') == -1) {
                        req.body = _.merge(req.body, params);
                    }else {
                        req.body.userId = curUser.id;
                    }
                }
            }
        }
        res.locals.session = req.session;//把session信息写到页面上
        if(hasNext) {
            next();
        }
    });

    app.use('/', index);
    app.use('/user', users);
    app.use('/hall', hall);
    app.use('/rankingList', rankingList);
    app.use('/anchor', anchor);
    app.use('/mv', mv);
    app.use('/room', room);
    app.use('/upload', upload);
    app.use('/raf',reportAndFeedback);
    app.use('/message', message);
    app.use('/myInfo', myInfo);
    app.use('/activePage', activePage);
    app.use('/admin',admin);
    
    // 对前端ajax请求的转换
    app.use('/tranApi', function(req, res) {
        var url2  = req.url,   // 入口URL
            met = req.method, // 请求方式
            query = req.query; // 请求的query 字符串

        var uObj = new urltool.parse(url2);
        var apiName = query.api;
        // 请求的真实URL
        var url = '';
        if(apiName && apiName !== '') {
            var url = uris[apiName];
        }

        var _json;
        if('userId' in req.body) {
            req.body.userId = req.session.user.id;
        }
        
        $http.addTask({
            url : url + '?companyId=1&' + uObj.query
            ,method : met
            ,data : req.body
            ,dataType:"json"
            ,success:function(data) {
                _json = data;
                // 如果是用户登录接口， 就设置Session
                if(apiName === 'USER_LOGIN') {
                     if(data.flag==0) {

                        req.session.user = data.data;
                        req.session.isLogin = true;
                    }
                }
            }
            ,error:function(error) {
                console.info(error);
            }
        });
        // 运行控制方法 发送请求并返回多次请求的所有数据
       $http.run(function() {
           res.json(_json);
        });
    });
    /*
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        //res.status(err.status || 500);
        if(err.status == 404){
            if(req.xhr){
                res.send({code:404});
            }else {
                res.render('404');
            }
        }else {
            if(req.xhr){
                res.send({code:404});
            }else {
                res.render('error', {message:'internal error',error:err});
            }
        }
    });
    */

    // All other routes should redirect to the index.html
   /* app.route('/!*')
        .get(function (req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });*/
};
