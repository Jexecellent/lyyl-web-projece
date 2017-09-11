/**
 * 房间业务处理
 */
'use strict';

//引入相关组件
var express = require('express');
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var api_config = require('../config/config').api_config;

exports.enterRoom = function (req, res) {
    var roomId = req.query.id ;
    var anchorId = req.query.acd ;
    var companyId = req.query.com ;
    var pageData = {session: req.session, anchor:false, cur:1,lev:[],idx:1};
    $http.addTask({
        url :uris.ROOM_GETROOMINFO //  '/v1/room/getRoomInfo' 获取房间信息
        ,method : "get"
        ,data : {roomId : roomId, companyId:companyId}
        ,dataType:"json"
        ,success:function(data) {
            console.log('roomInfo->', data);
            pageData.roomInfo = data;
        }
        ,error:function(error){
            console.info(error);
        }
    });

    if(anchorId!=0) {
        //获取主播MV
        $http.addTask({
            url :uris.ANCHOR_GETANCHORMVLIST //  '/v1/anchor/getAnchorMvList' 获取主播MV
            ,method : "get"
            ,data : {anchorId : anchorId,companyId:companyId}
            ,dataType:"json"
            ,success:function(data) {
                var _json =  data;
                pageData.anchorMV = _json;
            }
            ,error:function(error){
                console.info(error);
            }
        });
        //获取主播信息
        $http.addTask({
            url :uris.ANCHOR_GETANCHORINFO //  '/v1/anchor/getAnchorInfo' 获取主播信息
            ,method : "get"
            ,data : {anchorId : anchorId,companyId:companyId}
            ,dataType:"json"
            ,success:function(data){
                pageData.anchor = data.data;
            }
            ,error:function(error){
                console.info(error);
            }
        });
        //获取主播5张照片
        $http.addTask({
            url :uris.ANCHOR_FINDANCHORPHOTO //  '/v1/anchor/getAnchorInfo' 获取主播5张照片
            ,method : "get"
            ,data : {anchorId : anchorId,companyId:companyId}
            ,dataType:"json"
            ,success:function(data){
                var _json =  data;
                pageData.anchorPhoto = _json;
            }
            ,error:function(error){
                console.info(error);
            }
        });
        // 获取礼物列表
        $http.addTask({
            url :uris.FIGT_LIST_WEB //  '/v1/gift/list/web' 获取礼物列表
            ,method : "get"
            ,data : {companyId:companyId}
            ,dataType:"json"
            ,success:function(data){
                var _json =  data;
                pageData.giftList = _json;
            }
            ,error:function(error){
                console.info(error);
            }
        });
    }
    // 运行控制方法 发送请求并返回多次请求的所有数据
    $http.run(function() {

        res.render('roomIndex', pageData);
    });

   // res.send("测试方法");
};
exports.feedbackSave = function(req,res){
    var pageData = {} ,url;
    var data = {
        companyId : req.session.user.companyId,
        userId : req.session.user.id ,
        userName : req.session.user.name
    } ;
    if(req.body.type){
        url = uris.ROOM_REPORT_SAVE ;  // '/v1/reportAndFeedback/roomReported/save', // 房间举报
        data.room = req.body.title1 ;
        data.type = req.body.reson ;
    }else{
        url = uris.FEEDBACK_SAVE ; //  '/v1/reportAndFeedback/feedbackSave/save', // 保存反馈信息
        data.type = req.body.recall ;
        data.title = req.body.title2  ;
        data.content = req.body.context ;
    }
    $http.addTask({
        url : url
        ,method : "post"
        ,data : data
        ,dataType:"json"
        ,success:function(data){
            var _json =  data;
            pageData.res = _json;
        }
        ,error:function(error){
            console.info(error);
        }
    });
    $http.run(function(){
        res.send(pageData.res) ;
    });
};
exports.flash = function(req,res){
    var roomId = parseInt(req.query.roomId) ,
        anchorId = parseInt(req.query.acd),
        o = {
            roomId : roomId ,
            anchorId : anchorId ,
            userId : req.session.user?req.session.user.id: 0 ,
            deviceType : 1 ,
            companyId : 1
        },
        token = '',
        _json;

    $http.addTask({
        url :uris.ROOM_FINDGAMEROOMINFO //  '/v1/room/findGameRoomInfo' 获取房间游戏信息
        ,method : "get"
        ,data : o
        ,dataType:"json"
        ,success:function(data) {
            _json = data;
            token = data.data.token
            console.log('roomGameinfo->', data);
        }
        ,error:function(error) {
            console.info(error);
        }
    }) ;
     $http.run(function(){
         var userToken = req.session.user?req.session.user.token: 0 ;
         if(_json.data) {
             _json.data.language = req.locale||'zh_CN' ;
             _json.data.userLoginFlag = userToken ;
             _json.data.gameServerIp = '192.168.2.10' ;
             _json.data.gamePort = '9090' ;
             _json.data.token = 'token=' + token;
             _json.data['userId'] = req.session.user?req.session.user.id: 0 ;
             _json.data.backApihost = 'http://' + api_config.hostname + ':' + api_config.port + api_config.path
             console.log(req.locale,_json) ;
             res.send(_json)
         }else{
             res.send({code:401})
         }


    });
}

//创建包厢
exports.roomCreate = function (req, res) {
    httpUtil.postAndReturnJson(uris.ROOM_CREATEBALCONY,req.body, function(data){
        res.send(data);
    });
}
//room.js 相关方法在这里处理
// var express = require('express');
// var router = express.Router();
// var fs = require('fs') ;
// var encryption = require('../tools/encryption');
// var server = require('http').createServer();
// const sio = require('socket.io');
// const io = sio.listen(server);
// var  amqp  = require('amqp');
// //var rabbitMQ = amqp.createConnection({host : '192.168.1.198'});
// server.listen(3001);
// //console.log(rabbitMQ);
// router.get('/', function (req,res) {
//     var userInfo ;
//     if(encryption.USER_INFO){
//         userInfo = encryption.USER_INFO ;
//     }
//     var id = req.query.cur ;
//     var doc = JSON.parse(fs.readFileSync('../public/data.json',{encoding:'utf8'}));
//     res.render('roomIndex',{data : doc  ,cur : id ,idx : id ,user : userInfo });
// });
// /*rabbitMQ.on('ready', function() {
//  rabbitMQ.queue('testQ1', { autoDelete: false, durable: false, exclusive: false }, function(q) {
//  q.bind('#'); // Catch all messages
//  q.subscribe(function (message) {
//  obj = JSON.parse(message.data.toString());
//  console.log(obj)
//  //io.sockets.in(obj.id).emit('message', obj);
//  });
//  });
//  });*/
// /*rabbitMQ.on('ready', function () {
//  io.on('connection', function (socket) {
//  var queue = rabbitMQ.queue('testQ1');
//
//  queue.bind('#'); // all messages
//
//  queue.subscribe(function (message) {
//  console.log('message-name',message)
//  //socket.emit('message-name', message);
//  });
//  });
//  });*/
// var exchName = 'topic'; //exhange 名称
// var routeKey = 'topic'; // 路由键
// var connOptions = {
//     host: '192.168.1.198',
//     port: 5672,
//     login: 'admin',
//     password: 'admin',
//     authMechanism: 'AMQPLAIN',
//     vhost: '/',
//     ssl: {
//         enabled : false
//     }
// }
//
// var exchOption = {
//     type: 'topic'
//     ,durable: true
//     ,autoDelete: false
//     ,confirm: false
// }
//
// var messOption = {
//     contentEncoding: 'utf-8'
//     ,deliveryMode: 1
// }
//
// //var message = fs.readFileSync('2.txt').toString('utf-8');
// var conn = amqp.createConnection(connOptions); //连接rabbitmq
// var n = 100000; // 循环数
//
// var messFunc = function(e){
// }
//
// var exchFunc = function(exchange){
//     now = new Date();
//     mill = now.getMilliseconds();
//     console.log(now,mill);
//     //[此处是我问题的点]
//     for (var i = 0; i <n; i++) {
//         exchange.publish(routeKey,new Buffer('Hello,World'),'',messFunc); //发布消息 因为exchange属性confirm为false，此处不会回调messFunc
//     }
//     now = new Date();
//     mill = now.getMilliseconds();
//     console.log(now,mill);
// }
//
// var connFunc = function(){
//     console.log('ready');
//     var exch = conn.exchange(exchName,exchOption,exchFunc); //获取exchange 生成生产者
// }
//
// conn.on('ready',connFunc); //rabbitmq连接成功调用connFunc
// /*io.on('connection',function(socket){
//  //console.log('/////////...........',socket)
//  //注册publish事件，以响应客户端提交的请求
//  /!*		socket.on('publish',function(data){
//  //data就是聊天信息
//  //还需要传递一个信息，谁发的聊天信息
//  //向自己发送一个事件
//  //socket.emit('chat',data);
//  socket.emit('chat',{msg:data,user:socket.user});
//  //向其他所有客户端发送事件
//  //socket.broadcast.emit('chat',data);
//  socket.broadcast.emit('chat',{msg:data,user:socket.user});
//  });*!/
//
//  //注册login事件，处理客户端发送的登录事件
//  /!*	socket.on('login',function(data){
//  //更新在线人数
//  count++;
//  //保存用户
//  users[data] = data;
//  socket.user = data; //将用户昵称作为socket对象的user属性来保存
//  //向其他用户广播，xxx来了，欢迎一下
//  socket.broadcast.emit('signin',data);
//  //向所有的用户更新状态信息
//  socket.emit('sys_signin',{count : count,users : users});
//  socket.broadcast.emit('sys_signin',{count : count,users : users});
//  });*!/
//
//  //当用户离开的时候，注册disconect方法
//  /!*socket.on('disconnect',function(){
//  console.log('a user disconnect');
//  //更新在线人数 pwd --查看当前是哪个目录  cd dir --移动到某个目录
//  count--;
//  //删除当前连接的socket用户
//  var user = socket.user;
//  delete users[socket.user];
//  //需要广播，通知大家，xxx离开了
//  socket.broadcast.emit('logout',user);
//  //需要更新在线用户状态，包括在线人数和用户列表
//  socket.broadcast.emit('sys_signin',{count : count,users : users});
//  });*!/
//  });*/
// function substitute(str, o, type, regexp) {
//     var replaceArr = [];
//     var replaceStr = str.replace(regexp || /\[\:([^\]]+)?\]/g, function(match, name) {
//         replaceArr.push(match);
//         if (type == 1) {
//             // var emiStr=(o[name] === undefined) ? "[:" + name + "]" : "[:" + o[name] + "]";
//             if (!o[name]) {
//                 var length = match.length;
//             }
//             return match;
//             // return {match:match,emiStr:emiStr};
//         } else {
//             return type;
//         }
//     });
//     var o = {
//         replaceArr: replaceArr,
//         replaceStr: replaceStr
//     };
//     return o;
// }
//
// module.exports = router;