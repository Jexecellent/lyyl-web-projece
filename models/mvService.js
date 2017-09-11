/**
 * 主播业务处理
 */

'use strict';

var express = require('express');
var uris = require("../config/uris");
var config = require("../config/config");
var router = express.Router();
var mvService = {
    //默认信息
    mv: function (req, res) {
        var videoList = {
            recommend:[],
            other:[],
            videoInfo:[],
            commentList:[]
        };
        //推荐视频列表
        $http.addTask({
            url: uris.VIDEO_RECOMMENDVIDEOLIST
            , method: "get"
            , data: {companyId: 1,pageSize:10,pageNum:1}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                videoList.recommend = _json;
            }
            , error: function (error) {
            }
        });
        //其他视频列表
        $http.addTask({
            url: uris.VIDEO_ANCHOR_LIST
            , method: "get"
            , data: {companyId: 1,anchorId:req.query.anchorId}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                videoList.other = _json;
            }
            , error: function (error) {
            }
        });
        //视频基本信息
        $http.addTask({
            url: uris.VIDEO_VIDEO_INFO
            , method: "get"
            , data: {companyId: 1,videoId:req.query.id}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                videoList.videoInfo = _json;
            }
            , error: function (error) {
            }
        });

        $http.run(function () {
            res.render('mv', {videoList: videoList, user: ''});
        });
    },
    //添加评论
    comment: function (req, res) {
        var commentList ={
            addComment:[]
        };
        $http.addTask({
            url: uris.COMMENT_SAVEVIDEOCOMMENT
            , method: "get"
            , data: {companyId: 1,content:req.query.content,entityId:req.query.videoId,createName:req.query.userName}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                commentList.addComment = _json;
            }
            , error: function (error) {
            }
        });
        $http.run(function () {
            res.send(commentList);
        });
    },
    //评论列表
    cList: function (req, res){
        var commentList ={
            cList:[]
        };
        $http.addTask({
            url: uris.COMMENT_LISTVIDEOCOMMENT
            , method: "get"
            , data: {companyId:1,videoId:req.query.videoId,pageNum:req.query.current,pageSize:8}
            , dataType: "json"
            , success: function (data) {
                var _json = data;
                commentList.cList = _json;
            }
            , error: function (error) {
            }
        });
        $http.run(function () {
            res.send(commentList);
        });
    }

};
module.exports =mvService;
