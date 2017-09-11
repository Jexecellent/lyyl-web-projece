/**
 * 排行榜相关路由控制器
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var rankingService  = require('../models/RankingListService');

router.get('/', rankingService.test);

module.exports = router;
