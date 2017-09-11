/**
 * 个人信息相关路由控制器
 * Created by Bean on 2017/6/5.
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var myInfoService  = require('../models/MyInfoService');

router.use('/',checkLogin );
router.get('/', myInfoService.myInfo);//
router.get('/mymessage', myInfoService.mymessage);//
router.get('/messagedetail', myInfoService.messagedetail);//
router.get('/myfocus', myInfoService.myfocus);//
router.get('/myreport', myInfoService.myreport);//
router.get('/myfriend', myInfoService.myfriend);//
router.get('/myintegral', myInfoService.myintegral);//
router.get('/myvip', myInfoService.myvip);//
router.get('/myanchor', myInfoService.myanchor);//
router.get('/liveset', myInfoService.liveset);//
router.get('/manager', myInfoService.manager);//
router.get('/blacklist', myInfoService.blacklist);//
router.get('/livereport', myInfoService.livereport);//
router.get('/liveearnings', myInfoService.liveearnings);//

function  checkLogin(req,res,next){
    if(!req.session.user){
        res.redirect('/');
    }
    next();
}
module.exports = router;