/**
 * 消息
 * Created by hxl on 2017/5/17.
 */
'use strict';

var express     = require('express');
var router      = express.Router();
var message = require('../models/MessageService');

router.get('/my/list', message.myList);
router.get('/info', message.info);
router.post('/delete/one', message.msgDelete);
router.post('/delete/more', message.deletes);
router.post('/clean', message.clearAll);

module.exports = router;
