/**
 * 首页业务处理
 */
'use strict';

//引入相关组件
var express = require('express');
var Urlutil = require('url');
var encryption = require('../tools/encryption');
var config = require('../config/config');
var uris = require('../config/uris');
var httpUtil = require("../tools/HttpUtil");
//首页
var IndexService={
	index:function(req,res) {
		

		var pageData={
			list:[],
			randomRoom : []
		};
		//console.log('session.....',req.session.user)
		//var test = req.session.user ;
		// 请求数据
		$http.addTask({
			url :uris.INDEX_ROOMLIST //  '/index/roomList'
			,method : "get"
			,data : {}
			,dataType:"json"
			,success:function(data){
				var _json =  data;
				pageData.list = _json;

				// console.log('Data 1-->', data);
			}
			,error:function(error){
				console.info(error);
			}
		});
		$http.addTask({
			url :uris.INDEX_RANDOMROOM //  '/index/randomRoom'
			,method : "get"
			,data : {}
			,dataType:"json"
			,success:function(data) {
				pageData.randomRoom = data;
			}
			,error:function(error){
				console.info(error);
			}
		});
		// 运行控制方法 发送请求并返回多次请求的所有数据
		$http.run(function(){
			res.render('homePage1', {pageData:pageData,user:''});
		});

	},
	find:function(req,res){
			 httpUtil.getJson(uris.USER_FRIENDS, req,function(data){
	       		res.send(data);
		     },function(e){
		        logger.error('get friends error. query:%s, error:%s', JSON.stringify(req.query||{}), e.stack);
		    });
	},
	lang:function (req, res) {
	    var lang = req.params.lang;
        // lang = isNaN(lang) ? 'zh' : lang;
        //console.log("lang:" + lang);
        var cen_lang = req.signedCookies['locale'];
        //console.log("cookie:-->" + cen_lang);
        // res.clearCookie("locale");
        res.cookie('locale', lang, { signed: true, httpOnly: true });
        res.redirect("back");
    },
	roomlist:function(req,res){
		var pageData={
			list:[]
		};
		$http.addTask({
			url :uris.INDEX_ROOMLIST //  '/index/roomList'
			,method : "get"
			,data : {}
			,dataType:"json"
			,success:function(data){
				var _json =  data;
				pageData.list = _json;
			}
			,error:function(error){
				console.info(error);
			}
		});
		// 运行控制方法 发送请求并返回多次请求的所有数据
		$http.run(function(){
			res.send(pageData);
		});
	}	
};

module.exports = IndexService;