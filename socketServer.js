//socket.io 服务端
'use strict';
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('./config/config');
const sio = require('socket.io');
const io = sio.listen(server);
var mq = require('./rabbitMQClient');
var logger = require('./tools/utils').logger;
var textEncoding = require('text-encoding');
var messageObj = require('./models/message');
var textDecoder = textEncoding.TextDecoder;
//socket.io 默认跟express端口一样
server.listen(config.chat.port,process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,function () {
    logger.info('Express server listening on %d, in %s mode', config.chat.port, app.get('env'));
});

/**
 * 接收消息回调
 * @param msg
 */
var receiveNotify = function(msg) {
    logger.info('receiveNotify message = %s', msg);
    sendMsg(msg);
}
var receiveNotify2 = function(msg){
    logger.info('receiveNotify2 message = %s', msg);
    sendMsg(msg);
}
var sendMsg = function(obj){
    console.log('sendMsg:'+obj);
    if(obj.data && obj.data instanceof Uint8Array){
        //如果是BufferArray，则转换
        var msg = new textDecoder('utf-8').decode(obj.data);
        if(msg){
            obj.message = msg;
        }
    }
    //向同一个房间的用户广播消息
    io.sockets.in(obj.roomId).emit("new message",obj);
}

var numUsers = 0;

io.on('connection', function (socket) {
    logger.info('%s|%s',socket.id,'connected.');
    var addedUser = false;
    //进入房间时触发，数据类型为{roomId:xxx,userId:xxx,userName:xxx,vip:xxx}
    //如果为游客，数据类型只需要roomId
    socket.on('getIntoRoom', function(data){
        //进入房间
        if(!data.roomId){
            //如果roomId为空，则不予链接，断开
            socket.disconnect();
            logger.error('%s getIntoRoom but roomId is null.', socket.id);
            return;
        }
        //链接mq,并根据不同链接，创建链接到不同的queue上, 并接受消息
        var exchangeN = mq.createConnection('node-subscribe-event'+data.roomId,
            'node-subscribe-event-queue-'+process.env.IDENTIFY,receiveNotify);
        //var exchangeN = mq.createConnection('node-subscribe-event','node-subscribe-event-queue-'+data.roomId,receiveNotify2);
        //加入socket分组
        socket.join(data.roomId);
        //把房间id保存到socket里
        socket.roomId = data.roomId;
        socket.username = data.username;
        //广播谁进入房间
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
        logger.error('%s getIntoRoom success. socket join to group [%s] ', data.username, data.roomId);
    });
    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        /**
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
         **/
        logger.debug('username:%s send new message [%s] ',socket.username, JSON.stringify(data));
        //push to mq
        mq.publish("",{message:data,roomId:socket.roomId,username:socket.username});
    });

    // when the client emits 'add user', this listens and executes
    /**
    socket.on('add user', function (username) {
        if (addedUser) return;
        userIds.push(this.id);
        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });
    **/
    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
        //剔除分组
        socket.leave(socket.roomId);
    });
});

module.exports = server;