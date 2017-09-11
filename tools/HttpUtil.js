var http = require("http");
var urlUtil = require('url');
// var file = require("./file");
var config = require('../config/config');
var querystring = require('querystring');
var logger = require('../tools/utils').logger;
var _ = require('lodash');
var HttpUtil = {
    //get提交url，返回html数据
    get: function (url, req, param, success, error) {
        if(!success){
            logger.error('success function undefined.');
            return;
        }
        try {
            //从原request里找出参数
            var query = req.query;
            query = _.merge(param||{},query||{});
            var params = querystring.stringify(query);
            var opt = {
                host: config.api_config.hostname,
                port: config.api_config.port,
                path: config.api_config.path+url+"?"+params,
                method: 'GET'
            };

            http.get(opt, function (res) {
                var result = "";
                res.setEncoding("UTF-8");
                res.on("data", function (data) {
                    result += data;
                });
                res.on('error', error||function(e){
                    logger.error('get http exception, host:%s|port:%s|path:%s|error:%s', opt.host,opt.port,opt.path,e.stack);
                    });
                res.on('end', function () {
                    (success||function(){
                        logger.error('on end request not function defined.');
                    })(result);
                });
            }).on('error', this.requestError);
        }catch (e) {
            logger.error('exception : %s', e.stack);
            res.end();//结束响应
        }
    },
    post: function (url, body, acceptType, contentType, success, error) {
        var bodyString = "";
        if (body != null && contentType == "application/json") {
            bodyString = JSON.stringify(body);
        }
        else if (body != null && contentType == "application/x-www-form-urlencoded") {
            bodyString = querystring.stringify(body);
        }
        var opts = {
            hostname: config.api_config.hostname,
            port: config.api_config.port,
            path: config.api_config.path + url,
            method: 'POST',
            headers: {
                'Accept': acceptType,
                'Content-Type': contentType,
                'Content-Length': bodyString.length
            }
        }

        var req = http.request(opts, function (res) {

            var result = "";
            res.setEncoding("UTF-8");
            res.on("data", function (data) {
                result += data;
            });
            res.on('error', error||function(e){
                    logger.error('get http exception, hostname:%s|port:%s|path:%s|error:%s', opts.hostname,opts.port,opts.path,e.stack);
                });
            res.on('end', function () {
                (success||function(){
                    logger.error('on end request not function defined.');
                })(result);
            });

        });
        req.on('error', this.requestError);
        // file.writeInFile(req);
        req.write(bodyString);
        req.end();
    },
    //提交表单参数，并返回html内容
    postAndReturnHtml: function (url, body, success, error) {
        var urlConfig = urlUtil.parse(url);
        var contentType = "application/x-www-form-urlencoded";
        var acceptType = "text/html";
        this.post(urlConfig.hostname, urlConfig.port, urlConfig.path, body, acceptType, contentType, success, this.responseError);
    },
    getJson:function(url, req, success, error){
        this.get(url,req,null,function(data){
            var data = JSON.parse(data);
            success(data);
        },this.responseError(error));
    },
    //get提交url参数，并返回json数据
    getAndReturnJson: function (url,req,params, success, error) {
        this.get(url,req,params, function (data) {
            var data = JSON.parse(data);
            success(data);
        }, this.responseError(error));
    },
    //提交json参数，并返回json
    postAndReturnJson: function (url, body, success, error) {
        try {
            var contentType = "application/x-www-form-urlencoded";
            var acceptType = "application/json";
            // var urlConfig = urlUtil.parse(url);
            this.post(url, body, acceptType, contentType, function (data) {
                var data = JSON.parse(data);
                (success||function(){
                    logger.error('success function undefined.');
                })(data);
            }, this.responseError(error));
        }catch (e) {
            logger.error('postAndReturnJson exception: %s',e.stack);
            (error||function(){
                logger.error('error function is undefined.');
            })(e)
        }
    },
    requestError: function (error) {
        //console.log("请求失败--"+error.message);
        logger.error('请求失败-- %s', error.message);
        return;
    },
    responseError: function (error) {
        return error || function (e) {
                //console.log("响应失败--" + e.message);
                logger.error('响应失败-- %s', e.message);
            };
    }
}
module.exports = HttpUtil;