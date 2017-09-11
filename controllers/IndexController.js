
/**
 * 首页相关路由控制器
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var indexService  = require('../models/IndexService');

router.get('/', indexService.index);//首页
router.get('/lang/:lang', indexService.lang);//切换语言
router.get('/roomlist', indexService.roomlist);//切换语言

module.exports = router;
