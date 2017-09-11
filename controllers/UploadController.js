/**
 * Created by hxl on 2017/5/13.
 */
'use strict';

var express     = require('express');
var router      = express.Router();
var uploadService  = require('../models/UploadService');

router.post('/image', uploadService.image);//上传单张
//router.post('/images', uploadService.images);//上传多张,先不支持
router.post('/video', uploadService.video);

module.exports = router;

