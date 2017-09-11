/**
 * Created by dell on 2017/5/15.
 */
var logger = require('../tools/utils').logger;
var httpUtil = require("../tools/HttpUtil");
var uris = require("../config/uris");
var config = require("../config/config");

//举报房间列表
exports.roomReportedList = function(req, res){
        var params = {};
        httpUtil.getAndReturnJson(uris.ROOM_REPORT_LIST,req,params, function(data){
            logger.info('response data:%s', data);
            res.send(data);
        }, function(e){
            logger.error('get /reportAndFeedback/roomReported/list error.',e);
        });
};
//保存房间举报
exports.addRoomReport = function(req, res){
    httpUtil.postAndReturnJson(uris.ROOM_REPORT_SAVE,req.body,function (data) {
        res.send(data);
    });
}

//用户举报
exports.addUserReport = function(req, res) {
    httpUtil.postAndReturnJson(uris.USER_REPORT_SAVE,req.body,function (data) {
        res.send(data);
    });
}

//意见反馈
exports.addFeedback = function(req, res){
    httpUtil.postAndReturnJson(uris.FEEDBACK_SAVE,req.body,function (data) {
        res.send(data);
    });
}