
/**
 * 主播相关路由控制器
 */
'use strict' //声明为严格模式

var express = require('express');
var router = express.Router();
var mvService = require('../models/mvService');

router.get('/', mvService.mv);
router.get('/comment', mvService.comment);
router.get('/cList', mvService.cList);
module.exports = router;