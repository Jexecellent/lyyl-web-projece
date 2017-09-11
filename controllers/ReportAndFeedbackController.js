/**
 * Created by dell on 2017/5/15.
 */

'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var reportAndFeedbackService  = require('../models/ReportAndFeedbackService');

router.get('/roomReported/list', reportAndFeedbackService.roomReportedList);
router.post('/roomReported/save', reportAndFeedbackService.addRoomReport);
router.post('/userReported/save', reportAndFeedbackService.addUserReport);
router.post('/feedback/save', reportAndFeedbackService.addFeedback);

module.exports = router;
