/*
*  Promise解决一步加载无法获取渲染数据问题
**/
var Q = require('q');
var qs = require('querystring')
var request = require('request');
var Extend=require("util")._extend;
var RequestHelper=function(){
    this.taskList=[];
};
RequestHelper.prototype.addTask=function(_opt){
    this.taskList.push(_opt);
}
RequestHelper.prototype.request=function(_opts){
    var _deferred= Q.defer();
    var _i_settings={
        url:""
        ,method:"get"
        ,data:{}
        ,dataType:"json"
        ,error:function(error){}
        ,success:function(sdata){}
    };
    _i_settings=Extend(_i_settings,_opts);
    if(_i_settings.method.toLocaleLowerCase()=="get"){
        var _realUrl=_i_settings.url+'?'+qs.stringify(_i_settings.data);
        console.info(_realUrl);
        var req2=request(_realUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var _res=body;
                try{
                    if(_i_settings.dataType=="json"){
                        _res=JSON.parse(_res);
                    }
                }catch (ex){
                    var _error_msg="nodejs can not trans this data to JSON format: "+body;
                    console.error("json translate error:"+_i_settings.url);
                    console.error(_error_msg);
                    console.error(body);
                    _deferred.reject(_error_msg);
                    return;
                }
                _deferred.resolve(_res);
            }else{
                var _error_msg="request helper error: can not request url:"+_realUrl+"";
                console.error(_error_msg);
                console.error(body);
                _deferred.reject(error);
            }
        });
    }else{
        //--post方式。
        request.post({
            url:_i_settings.url
            ,form:_i_settings.data
        },function(err,response,body){
            if (!err && response.statusCode == 200) {
                var _res=body;
                try{
                    if(_i_settings.dataType.toLocaleLowerCase()=="json"){
                        _res=JSON.parse(_res);
                    }
                }
                catch (ex){
                    var _error_msg="nodejs can not trans this data to JSON format: "+body;
                    console.error("json translate error:"+_i_settings.url);
                    console.error(_error_msg);
                    console.error(body);
                    _deferred.reject(_error_msg);
                    return;
                }
                _deferred.resolve(_res);
            }else{
                var _error_msg="request helper error: can not request url:"+_i_settings.url+"";
                console.error(_error_msg);

                console.error(err);
                console.error(body);

                _deferred.reject(err);
            }
        });

    }


    var _promise= _deferred.promise;
    _promise.then(_i_settings.success,_i_settings.error);
    return _promise;
};
RequestHelper.prototype.run=function(onDone){
    var me=this;
    var taskList=this.taskList;
    if(taskList.length<=0){
        if(onDone){
            onDone();
        }
        return;
    }
    var _now_taskReq=[];
    for(var i=0;i< this.taskList.length;i++){
        var _taskItem={
            url:""
            ,success:function(parameter){ }
            ,error:function(parameter){}
            ,method:"get"
            ,data:{}
            ,dataType:"json"
        };
        Extend(_taskItem,this.taskList[i]);
        var _promise=me.request(_taskItem);
        _now_taskReq.push(_promise);
    }
    //--检查是不是有多于或等于一个任务。
    if(_now_taskReq.length<=0){
        var _warning_msg="request helper warning:task list has less than 1 task,do not send any request now.";
        console.info(_warning_msg);
        if(onDone){
            onDone();
        }
        return;
    }
    Q.all(_now_taskReq)
        .spread(function(){}).done(function(){
        if(onDone){
            onDone();
        }
    });

};
module.exports=RequestHelper;