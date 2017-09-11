
/**
 * 主播相关路由控制器
 */
'use strict' //声明为严格模式

var express = require('express');
var router = express.Router();
var AnchorService = require('../models/AnchorService');

router.get('/', AnchorService.anchor);
router.get('/getAnchorInfo', AnchorService.AnchorInfo);//主播切换列表
router.get('/anchorSearch', AnchorService.anchorSearch);//搜索主播
router.post('/destroy', AnchorService.destroy);//取消关注
module.exports = router;