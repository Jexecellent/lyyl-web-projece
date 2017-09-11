/**
 * Created by Bean on 2017/6/19.
 */
'use strict';

//引入相关组件
var express = require('express');
var Urlutil = require('url');
var encryption = require('../tools/encryption');
var config = require('../config/config');
var uris = require('../config/uris');
var httpUtil = require("../tools/HttpUtil");
var api = {
    admin : function(req,res){
        res.render('client/admin');
    },
    login : function(req,res){

        req.body['source'] = 1 ;
        req.body['loginType'] = 1 ;
        req.body['loginType'] = 1 ;
        var _json ;
        $http.addTask({
            url :uris.USER_LOGIN //  '/index/roomList'
            ,method : "post"
            ,data : req.body
            ,dataType:"json"
            ,success:function(data){
                _json =  data;
            }
            ,error:function(error){
                console.info(error);
            }
        });
        // 运行控制方法 发送请求并返回多次请求的所有数据
        $http.run(function(){
            res.send(_json);
        });
    }
}

module.exports = api ;