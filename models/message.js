/**
 * 聊天消息对象
 * Created by hxl on 2017/5/15.
 */

exports.message = function Message(){
    this.message = null;
    this.userId = null;
    this.userName = null;
    this.vip = null;
    this.level = null;
    this.type = 0;//消息类型0：文本消息
}
