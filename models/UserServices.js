/**
 * 用户业务处理
 */
'use strict';

//引入相关组件
var encryption = require('../tools/encryption');
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var constant = require("../config/constant")
var redis = require("../tools/redis");
var logger = require('../tools/utils').logger;
var haiyao = require('../tools/utils');
var http = require('http') ;
//登录
exports.login = function(req, res) {

    var userInfo ;
    res.render('login',{user:userInfo})
    /*
    var name = req.body.account ;
    var pwd = req.body.pwd ;
    var cid = req.body.cid ;
    httpUtil.postAndReturnJson(uris.USER_LOGIN,{account :name,password:pwd,source :cid},function (data) {
        if(data.flag==0){
            req.session.user = data.data;
            req.session.isLogin = true;
        }
        res.send(data);
    },function (error) {
        res.send(error);
    });
    */

};
//退出
exports.loginout = function(req, res) {
    req.session.isLogin = false;
    req.session.destroy(function (err) {
        // res.send(err);
    });
    res.redirect('/');
};
//测试
exports.getSession = function(req, res) {
    // console.log(req.session.id+"++++++++++++");
    var greeting = res.__('Hello');
    console.log("i18n:"+greeting);
    redis.set("test","123456test",30000,function (err,res) {

    });
    redis.get("test",function (err, res) {
        console.log("reids:-->" + res);
    });
    res.send("session:"+req.session.id+"   userinfo:"+JSON.stringify(req.session.user));

};
//注册
exports.reg = function(req, res) {
    var name = req.body.account ;
    var pwd = encryption.MD.hex_md5(req.body.pwd).toUpperCase();
    var nickName = req.body.nickname ;
    httpUtil.postAndReturnJson(uris.USER_REGISTER,{account :name,pwd:pwd,nickName :nickName,companyId:1},function (data) {
        res.redirect('/');
    },function (error) {
        res.send(error);
    });
};
//跳转到注册页面
exports.register = function(req, res) {
    var userInfo ;
    res.render('register',{user:userInfo})
};

exports.resetpass = function(req, res) {
     var userInfo ;
    res.render('resetPass',{user:userInfo})
};

//好友列表
exports.friends = function(req, res){
    var user = req.session.user ;
    if(user){
        var backdata = {} ;
        var pageNum = req.query.pageNum ;
        var pageSize = req.query.pageSize ;

        $http.addTask({
            url :uris.USER_FRIENDS //  '/user/friends/delete'
            ,method : "get"
            ,data : {companyId:user.companyId,userId:user.userId,pageNum:pageNum,pageSize:pageSize}
            ,dataType:"json"
            ,success:function(data){
                var _json =  data;
                backdata = _json;
            }
            ,error:function(error){
                console.info(error);
            }
        });
        // 运行控制方法 发送请求并返回多次请求的所有数据
        $http.run(function(){
            res.send(backdata);
        });
    }else{
        res.redirect('/');
    }    
};

//添加好友
exports.addFriends = function(req, res){
    httpUtil.postAndReturnJson(uris.USER_FRIENDS_ADD, req.body,function(data){
        res.send(data);
    });
};

//同意好友请求
exports.agreeFriends = function(req, res){
    httpUtil.postAndReturnJson(uris.USER_FRIENDS_AGREE, req.body, function(data){
        res.send(data);
    })
};
//拒绝好友申请
exports.refuseFriends = function(req, res){
    httpUtil.postAndReturnJson(uris.USER_FRIENDS_REFUSE, req.body, function(data){
        res.send(data);
    })
};

//删除好友
exports.delFriends = function(req, res){
    var user = req.session.user ;
    var backdata = {} ;
    var fid = req.body.friendId ;
    console.log("rrrrrr",user);
    
    $http.addTask({
        url :uris.USER_FRIENDS_DEL //  '/user/friends/delete'
        ,method : "post"
        ,data : {companyId:user.companyId,userId:user.id,friendId : fid}
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            backdata = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    // 运行控制方法 发送请求并返回多次请求的所有数据
    $http.run(function(){
        res.send(backdata);
    });
};
//邀请好友
exports.inviteFriends = function(req, res){
    var user = req.session.user ;
    var backdata = {} ;
    var fid = req.body.friendId ;

    $http.addTask({
        url :uris.USER_FRIENDS_INVITE //  '/user/friends/invite'
        ,method : "get"
        ,data : {companyId:user.companyId,userId:user.id,friendId : fid}
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            backdata = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    // 运行控制方法 发送请求并返回多次请求的所有数据
    $http.run(function(){
        res.send(backdata);
    });
};
//跟踪好友
exports.traceFriends = function(req, res){
    var user = req.session.user ;
    var backdata = {} ;
    var fid = req.body.friendId ;
    
    $http.addTask({
        url :uris.USER_FRIENDS_TRACE //  '/user/friends/trace'
        ,method : "get"
        ,data : {companyId:user.companyId,userId:user.id,friendId : fid}
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            backdata = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    // 运行控制方法 发送请求并返回多次请求的所有数据
    $http.run(function(){
        res.send(backdata);
    });
};



//赠送礼物
exports.giveGift = function(req, res){
    //var id = req.session.user.userId ;
    var giftId = req.body.giftId ,
        roomId = req.body.roomId ,
        giftGroup = req.body.giftGroup ,
        giftNum = req.body.giftNum ,
        giftromm = req.body.roomId ,
        acd = req.body.acd ,
        giftData = {} ;
    $http.addTask({
        url :uris.USER_GIVE_GIFT //  '/v1/gift/give' 送礼物
        ,method : "post"
        ,data : {
            anchorId : acd
            ,companyId: 1
            ,giftId : giftId
            ,userId : req.session.user.id
            ,roomId : giftromm
            ,giftNum: giftNum
        }
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            giftData.res = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    $http.run(function(){
        res.send(giftData.res) ;
    });
};

//关注主播
exports.followAnchor = function (req, res) {
    var test = req.body.anchorId ;
    httpUtil.postAndReturnJson(uris.USER_FOLLOW_ANCHOR, {companyId: 1,anchorId:test,userId:req.session.user.id}, function(data){
        res.send(data);
    });
};

//关注主播列表
exports.followAnchors = function (req, res) {
    httpUtil.getJson(uris.USER_FOLLOW_ANCHOR_LIST, req, function(data){
        res.send(data);
    });
} 
//用户举报
exports.saveUserReport = function (req, res) {
    // USER_REPORT_SAVE  /v1/reportAndFeedback/userReported/save 用户举报
    var reportData ,
        o = {
            companyId : req.session.user.companyId ,
            userId : req.session.user.companyId , 
            userName : req.session.user.name ,
            type : req.body.type , 
            beUserId : req.body.beUserId , 
            beUserName : req.body.beUserName  
        } ;
    console.log('o...',o)
    $http.addTask({
        url :uris.USER_REPORT_SAVE //   /v1/reportAndFeedback/userReported/save 用户举报
        ,method : "post"
        ,data : o
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            reportData = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    })
    $http.run(function(){
        console.log('reportData...',reportData)
        res.send(reportData) ;
    });
};

//更新用户
exports.updateUser = function (req, res) {
    console.log('qqqqqqqqq',req.session.user)
    var user = req.session.user ;
    var userData = {
        companyId: user.companyId,
        id:user.id
    }
    var bodyData = req.body;
    console.log('111--',userData)
    console.log('222--',bodyData)
    var jsonData = eval('('+(JSON.stringify(userData)+JSON.stringify(bodyData)).replace(/}{/,',')+')');

    console.log('123123--',jsonData)
    httpUtil.postAndReturnJson(uris.USER_UPDATE_USER, jsonData, function(data){
        if(data.number==0){
            req.session.user = eval('('+(JSON.stringify(user)+JSON.stringify(bodyData)).replace(/}{/,',')+')')
        }

        res.send(data);
    });
};
//更新用户session
exports.updateSession = function (req, res) {
    console.log("========",req.session.user);
    var bodyData = req.body;
    for(var o in bodyData){
        req.session.user[o] = bodyData[o];
        console.log("+++",o);
    }
    //req.session.user;
    
    res.send(1);
};