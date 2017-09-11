
/**
 * 大厅相关路由控制器
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var hallService  = require('../models/HallService');

router.get('/', hallService.hall);//大厅
router.get('/:num', hallService.hall);//大厅

module.exports = router;