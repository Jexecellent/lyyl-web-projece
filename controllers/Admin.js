/**
 * Created by Bean on 2017/6/19.
 */
/**
 * 后台相关路由控制器
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var adminService  = require('../models/AdminService');

router.get('/', adminService.admin);
router.post('/login', adminService.login);


module.exports = router;