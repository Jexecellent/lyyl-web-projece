/**
 * Created by dell on 2017/5/11.
 */
'use strict';

//noinspection JSUnresolvedFunction
var amqp = require("amqp");
var logger = require('./tools/utils').logger;
var config = require('./config/config');

var exchName = "directExchange";
var routeKey = "topic"; // 路由键
var ra_queue_name = "default_";

var connOptions = config.mq;

var exchOption = {
    type: 'fanout',
    durable: true,
    autoDelete: false,
    confirm: true
};

var messageOption = {
    contentEncoding:'utf-8',
    deliveryMode: 2
};

var conn;
var receiveNotify  = null;
//var logger = require('./log').logger("rabbitmq");
conn = amqp.createConnection(connOptions);

// function receiveNotify(msg){
//     console.log("receive message: "+msg);
// }
var message = {"user":666,"code":1000};

var basic_qos_emitted = false;
var _exchange = null;
conn.on('ready',function() {
    //logger.info("rabbitmq is ready ... ");
    console.log("rabbitmq is ready ... ");

    // conn.queue('queue_chat_notify', { autoDelete: false, durable: true }, function(queue) {
    //     queue.subscribe(function (msg) {
    //         console.log("queue_chat_notify consumer msg : " + msg);
    //         //receiveNotify(msg.data);
    //     });
    // });

    //var exch = conn.exchange(exchName, exchOption);
    //exchFunc(exch);
    //init();

});

//初始化exchang queue,派发以及队列
function init() {
    var e = conn.exchange(exchName, {type: 'fanout'});
    conn.queue(ra_queue_name, function(q) {
        //q.bind(e, ra_queue_name);//第二个参数跟匹配模式有关,fanout:'',direct:'队列名'
        q.bind(e, '');
        q.subscribe({ ack: true, prefetchCount: 0 }, function(msg) {
            console.log("subscribe..="+msg.msg)
            receiveNotify(msg);
        });

        q.on('basicQosOk', function() {
            basic_qos_emitted = true;
        });

        // for (var i = 0; i <20; i++) {
        //     e.publish(ra_queue_name, { foo: 'bar' });
        // }
    });
    _exchange = e;
}

conn.on('close', function(){
    console.log("rabbitmq is close");
});

conn.on('error', function (error) {
    console.log('Connection error : ' + error);
});

exports.createConnection = function(exchange_name,queue_name, subscribeCallbackFun) {
    //console.log("createConnection r1 : " + r1);
    //receiveNotify = r1;
    exchName = exchange_name;
    ra_queue_name = queue_name;
    receiveNotify = subscribeCallbackFun;
    init();
}
exports.publish = function(routeKey, message) {
    //conn.publish(routeKey, message);
    //conn.createCh
    //e.publish(routeKey, message);
    try {
        _exchange.publish(ra_queue_name,message);
    }catch(e) {
        logger.error('publish to mq exception.'+e);
    }

};