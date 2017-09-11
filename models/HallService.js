/**
 * 大厅业务处理
 */
'use strict';

//引入相关组件
var express = require('express');
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require('../config/config');
var HallService = {};
HallService.hall = function(req,res) {
	//console.log('params....',req.params);
	var 
	n = req.params.num||0 , // 这是玩法 playType 1. 主播发牌， 2. 主播陪玩， 3. 比赛场
	idx = req.query.idx||0 ,// 这是房间的级别 1. 新手房 2. 普通房 3. 高手房
	cur;
	if(n && n > 3 ) {
		cur = req.query.cur ;
	}else{
		cur = n ;
	}
	
	var reqObj ={};

	if(n!==0) {
		reqObj.playType = n;
	}
	if(idx!==0) {
		reqObj.roomType = idx;
	}

	// 保存请求的数据
	var pageData={
		list:[]
	};
	// 侧边栏比赛场级别
	var lev = [7,8,9,10,11,12,13,14,15,16,17,18] ;
	console.log('N->', n ,idx);
	// gameType 1. web 德州，2. h5 德州，3. 斗地主 4. 麻将
	$http.addTask({
		url :uris.INDEX_ROOMLIST  //   '/index/roomList'
		,method : "get"
		,data : reqObj
		,dataType:"json"
		,success:function(data) {
			var _json =  data;
			// console.log('dataList->', data)
			pageData.list= _json;
		}
		,error:function(error){
			console.info(error);
		}
	});
	$http.run(function() {
		res.render('hall', {pageData:pageData,lev:lev,cur:cur,idx : idx});
	});
}
HallService.find=function(req,res){
 	var param = {};
    httpUtil.getJson('http://192.168.1.170:8081/index/roomList',param,function (data) {
       	console.log(data);
    },function (error) {
    	console.log(error);
    });
};

module.exports = HallService;
