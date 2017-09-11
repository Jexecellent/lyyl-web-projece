/**
 * 用户相关路由控制器
 * @type {*}
 */
'use strict' //声明为严格模式

var express     = require('express');
var router      = express.Router();
var userService  = require('../models/UserServices');

router.get('/login', userService.login);//登陆

router.post('/reg', userService.reg);//注册

router.get('/register', userService.register);//跳转到注册页面

router.get('/resetpass', userService.resetpass);//跳转到注册页面



router.get('/logout',userService.loginout) ; // 退出登录
router.get("/getSession",userService.getSession);//测试获取session信息
router.get('/friends/list', userService.friends); //好友列表
router.post('/friends/add', userService.addFriends);//添加好友
router.post('/friends/agree',userService.agreeFriends);//同意好友
router.post('/friends/refuse', userService.refuseFriends);//拒绝好友
router.post('/friends/delete', userService.delFriends);//删除好友
router.get('/friends/invite', userService.inviteFriends);//邀请好友
router.get('/friends/trace', userService.traceFriends);//跟踪好友
router.post('/give/gift', userService.giveGift);//送礼物
router.post('/follow/anchor', userService.followAnchor);//关注主播
router.post('/feedback/saveUserReport', userService.saveUserReport);//举报用户
router.get('/follow/anchor/list', userService.followAnchors);//关注主播列表

router.post('/updateuser', userService.updateUser);//更新用户
router.post('/updatesession', userService.updateSession);//更新用户

module.exports = router;
