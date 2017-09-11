/**
 * 主播业务处理
 */

'use strict';

var express = require('express');
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require("../config/config");
var router = express.Router();
var AnchorService = {
    //默认信息
    anchor: function (req, res) {
        var anchor = {
            anchorList:[],
            basicInfo:[],
            MvList:[],
            AlbumList:[],
            findPhoto:[]
        };
        //主播列表
        $http.addTask({
            url: uris.ANCHOR_ANCHORLIST
            , method: "get"
            , data: {companyId: 1}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchor.anchorList = _json;
            }
            , error: function (error) {
            }
        });
        //基本信息
        $http.addTask({
            url: uris.ANCHOR_GETANCHORINFO
            , method: "get"
            , data: {companyId: 1}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchor.basicInfo = _json;
            }
            , error: function (error) {

            }
        });
        //主播mv
        $http.addTask({
            url: uris.ANCHOR_GETANCHORMVLIST
            , method: "get"
            , data: {companyId: 1,anchorId:""}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchor.MvList = _json;
            }
            , error: function (error) {

            }
        });
        //主播5张相片
        $http.addTask({
            url: uris.ANCHOR_FINDANCHORPHOTO
            , method: "get"
            , data: {companyId: 1,anchorId:""}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchor.findPhoto = _json;
            }
            , error: function (error) {

            }
        });
        //相册列表
        $http.addTask({
            url: uris.ANCHOR_GETANCHORALBUM
            , method: "get"
            , data: {companyId: 1,anchorId:"1"}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchor.AlbumList = _json;
            }
            , error: function (error) {

            }
        });
        $http.run(function () {
            res.render('anchor', {anchor: anchor, user: ''});
        });
    },
    //主播资料切换
    AnchorInfo:function(req, res){
        var anchorInformation  = {
            Info:[],
            MvList:[],
            AlbumList:[],
            findPhoto:[]
        };
        var test = req.query.anchorId ;
        //基本信息
        $http.addTask({
            url: uris.ANCHOR_GETANCHORINFO
            , method: "get"
            , data: {companyId: 1,anchorId:test}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchorInformation.Info = _json;
            }
            , error: function (error) {
            }
        });
        //主播mv
        $http.addTask({
            url: uris.ANCHOR_GETANCHORMVLIST
            , method: "get"
            , data: {companyId: 1,anchorId:test}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchorInformation.MvList = _json;
            }
            , error: function (error) {
            }
        });
        //主播5张相片
        $http.addTask({
            url: uris.ANCHOR_FINDANCHORPHOTO
            , method: "get"
            , data: {companyId: 1,anchorId:test}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchorInformation.findPhoto = _json;
            }
            , error: function (error) {
            }
        });
        //主播相册
        $http.addTask({
            url: uris.ANCHOR_GETANCHORALBUM
            , method: "get"
            , data: {companyId: 1,anchorId:test}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchorInformation.AlbumList = _json;
            }
            , error: function (error) {
            }
        });
        $http.run(function () {
            res.send(anchorInformation);
        });
    },
    //搜索主播列表
    anchorSearch:function(req, res){
        var anchorSearch  = {
            anchorList:[]
        };
        var anchorName = req.query.anchorId ;
        //搜索主播
        $http.addTask({
            url: uris.ANCHOR_ANCHORLIST
            , method: "get"
            , data: {companyId: 1,anchorName:anchorName}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                anchorSearch.anchorList = _json;
            }
            , error: function (error) {
            }
        });
        $http.run(function () {
            res.send(anchorSearch);
        });
    },
    //取消关注
    destroy:function(req, res){
        var user = req.session.user ;
        var jsonData = {
            companyId: user.companyId,
            userId:user.id,
            anchorId:req.body.anchorId
        }
        httpUtil.postAndReturnJson(uris.ANCHOR_FOLLOW_CANCEL, jsonData, function(data){
            res.send(data);
        });

        // var destroy  = {
        //     destroyData:[]
        // };
        // var anchorName = req.body.anchorId ;
        // //取消关注
        // $http.addTask({
        //     url: uris.ANCHOR_FOLLOW_CANCEL
        //     , method: "post"
        //     , data: {companyId: 1,anchorName:anchorName}
        //     , dataType: "json"
        //     , success: function (data) {
        //         var _json = data;
        //         destroy.destroyData = _json;
        //         console.log('2222',destroy.destroyData)
        //     }
        //     , error: function (error) {
        //     }
        // });
        // $http.run(function () {
        //     res.send(destroy);
        // });
    }
};
module.exports = AnchorService;
