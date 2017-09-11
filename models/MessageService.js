/**
 * 消息
 * Created by hxl on 2017/5/17.
 */
'use strict';

var logger = require('../tools/utils').logger;
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require("../config/config");

//个人消息列表
exports.myList = function(req, res){
    var jsonData = {
        pageNum:req.query.pageNum,
        pageSize:req.query.pageSize,
        type:req.query.type
    }
    httpUtil.getAndReturnJson(uris.MESSAGE_MY_LIST,req, jsonData , function(data){
        res.send(data);
    });
};

//消息详情
exports.info = function (req, res) {
    httpUtil.getJson(uris.MESSAGE_INFO, req, function (data) {
        res.send(data);
    })
};

//删除消息
exports.msgDelete = function (req, res) {
    httpUtil.postAndReturnJson(uris.MESSAGE_DELETE,req.body, function(data){
        res.send(data);
    });
}

//删除全部
exports.clearAll = function(req, res) {
    httpUtil.postAndReturnJson(uris.MESSAGE_CLEAN, req.body, function(data){
        res.send(data);
    });
};

//删除多个
exports.deletes = function (req, res) {
    var user = req.session.user ;
    var jsonData = {
        companyId: user.companyId,
        userId:user.id,
        idstr:req.body.idstr
    }
    httpUtil.postAndReturnJson(uris.MESSAGE_DELETES, jsonData, function(data){
        res.send(data);
    });
}
