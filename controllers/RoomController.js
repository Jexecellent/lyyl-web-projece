/**
 * 房间相关路由控制器
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var roomService  = require('../models/RoomService');

router.get('/', roomService.enterRoom);
router.post('/feedbackSave', roomService.feedbackSave);
router.get('/flash', roomService.flash);

router.post('/roomCreate', roomService.roomCreate);

module.exports = router;
