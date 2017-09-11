//活动中心页面

"use strict";

// 引入相关组件
var express = require("express");
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require("../config/config");
var ActivePageService = {};



ActivePageService.test = function(req,res){
    // 这是一个死页面 没有接口
    res.render("activePage");
}

module.exports = ActivePageService;