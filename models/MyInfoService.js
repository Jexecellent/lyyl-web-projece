/**
 * 个人中心业务处理
 * Created by Bean on 2017/6/5.
 */
'use strict';

//引入相关组件
var express = require('express');
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require('../config/config');
var myInfoService = {};
myInfoService.myInfo = function(req,res) {
    var user = req.session.user ;
    if(req.session.user.anchorInfoBean){
        user = req.session.user.anchorInfoBean ;
    }
    console.log(user)
    if(user){
        res.render('myInfo/personal',{act : 1,pageData:user});
    }else{
        res.redirect('/');
    }
}
myInfoService.mymessage = function(req,res) {
    var jsonData = {
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6,
        type : req.query.mType || 1
    }
    httpUtil.getAndReturnJson(uris.MESSAGE_MY_LIST,req, jsonData , function(data){
        res.render('myInfo/mymessage',{act : 2,pageData:data});
    });

}
myInfoService.messagedetail = function(req,res){
    var jsonData = {
        id:req.query.id
    }
    httpUtil.getAndReturnJson(uris.MESSAGE_INFO,req, jsonData , function(data){
        console.log("aaa",data)
        res.render('myInfo/messagedetail',{act : 2,pageData:data});
    });

}
myInfoService.myfocus = function(req,res){
    var jsonData = {
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6
    }
    httpUtil.getAndReturnJson(uris.ANCHOR_ANCHOR_FOLLOW_LIST,req, jsonData , function(data){
        console.log('------------',data);
        res.render('myInfo/myfocus',{act : 3,pageData:data});
    });

}
myInfoService.myreport = function(req,res){

    var pageData;
    var userId = req.session.user.id;
    var urlArr = [
        uris.USER_REPORT_RECHARGE,
        uris.USER_REPORT_GAME,
        uris.USER_REPORT_GIFT
    ]
    var jsonData = {
        playerId: userId,
        userId: userId,
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6,
        rType:req.query.rType || 0
    }
    if(req.query.startTime){
        jsonData.startTime = req.query.startTime;
    }
    if(req.query.endTime){
        jsonData.endTime = req.query.endTime;
    }
    $http.addTask({
        url :urlArr[jsonData.rType]  //
        ,method : 'get'
        ,data : jsonData
        ,dataType:"json"
        ,success:function(data) {
            pageData= data;
            console.log('/////',data)
        }
        ,error:function(error) {
            console.info(error);
        }
    });

    $http.run(function() {
        console.log(pageData)
        res.render('myInfo/myreport', {act : 4,pageData:pageData,rType:jsonData.rType});
    });

}
myInfoService.myfriend = function(req,res){
    var jsonData = {
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6,
    }
    httpUtil.getAndReturnJson(uris.USER_FRIENDS,req, jsonData , function(data){
        res.render('myInfo/myfriend',{act : 5,pageData:data});
    });
    
}
myInfoService.myintegral = function(req,res){
    var user = req.session.user ;

    res.render('myInfo/myintegral',{act : 6 , user : user});
}
myInfoService.myvip = function(req,res){
    res.render('myInfo/myvip',{act : 7});
}
myInfoService.myanchor = function(req,res){
    var user = req.session.user.anchorInfoBean ;
    var anchorCenter = {};
    //主播资料
    $http.addTask({
        url :uris.ANCHOR_GETANCHORINFO
        ,method : "get"
        ,data : {companyId:1,anchorId:2}//user.id,user.companyId
        ,dataType:"json"
        ,success:function(data){
            anchorCenter.info =  data;
             console.log('111111111',anchorCenter.info)
        }
        ,error:function(error){
            console.info(error);
        }
    });
    // 运行控制方法 发送请求并返回多次请求的所有数据
    $http.run(function(){
        res.render('myInfo/myanchor',{act : 8,anchorCenter: anchorCenter});
    });
}
/*
 * 直播设置
 */
myInfoService.liveset = function(req,res) {
    var userId = req.session.user.id || req.session.user.userId;
    // 左侧菜单相关
    var pageData = {act:9};

       $http.addTask({
        url :uris.USER_LIVE_SET  //
        ,method : 'get'
        ,data : {userId: userId}
        ,dataType:"json"
        ,success:function(data) {
            pageData.setting= data.data;
        }
        ,error:function(error) {
            console.info(error);
        }
    });

    $http.run(function() {
        console.log(pageData)
        res.render('myInfo/liveset', pageData);
    });
}
myInfoService.manager = function(req,res) {
    var jsonData = {
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6,
        roomId:req.session.user
    }
    httpUtil.getAndReturnJson(uris.ANCHOR_MANAGER_LIST,req, jsonData , function(data){

        console.log("555555",data)
        res.render('myInfo/manager',{act : 9,pageData:data});
    });
}
myInfoService.blacklist = function(req,res) {
    var jsonData = {
        pageNum:req.query.pageNum || 1,
        pageSize:req.query.pageSize || 6,
        roomId:req.session.user
    }
    httpUtil.getAndReturnJson(uris.ANCHOR_BLACKLIST,req, jsonData , function(data){

        console.log("555555",data)
        res.render('myInfo/blacklist',{act : 9,pageData:data});
    });
}
myInfoService.livereport = function(req,res) {
    res.render('myInfo/livereport',{act : 10});
}
myInfoService.liveearnings = function(req,res){
    res.render('myInfo/liveearnings',{act : 11});
}
myInfoService.find=function(req,res) {
    var n = req.params.num ,idx = req.query.idx ,cur;
    if(n && n > 3 ){
        cur = req.query.cur ;
    }else{
        cur = n ;
    }
    // 保存请求的数据
    var pageData={
        list:[]
    };
    // 侧边栏比赛场级别
    var lev = [7,8,9,10,11,12,13,14,15,16,17,18] ;
    $http.addTask({
        url :uris.INDEX_ROOMLIST  //   '/index/roomList'
        ,method : "get"
        ,data : {}
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            pageData.list= _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    $http.run(function(){
        console.log(pageData)
        res.render('hall', {pageData:pageData,lev:lev,cur:cur,idx : idx});
    });
};

module.exports = myInfoService;