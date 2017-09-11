/**
 * 配置api地址
 */
module.exports = {

    /*********************************************用户接口地址*************************************/
    USER_LOGIN : "/v1/user/login", //登陆
    USER_LOGOUT : "/v1/user/logout",//退出
    USER_REGISTER : "/v1/user/register",//注册
    USER_RESETPASS : "/v1/user/resetPassword",//重置密码
    USER_FRIENDS : '/v1/user/friends/list',//好友列表
    USER_FRIENDS_ADD : '/v1/user/friends/add',//添加好友
    USER_FRIENDS_AGREE : '/v1/user/friends/agree',//同意好友请求
    USER_FRIENDS_REFUSE : '/v1/user/friends/refuse',//拒绝好友请求
    USER_FRIENDS_DEL : '/v1/user/friends/delete',//删除好友
    USER_FRIENDS_INVITE : '/v1/user/friends/invite',//邀请好友
    USER_FRIENDS_TRACE : '/v1/user/friends/trace',//跟踪好友
    USER_GIVE_GIFT : '/v1/gift/give',//送礼物
    USER_FOLLOW_ANCHOR : '/v1/anchor/follow',//关注主播
    USER_FOLLOW_ANCHOR_LIST : '/v1/anchor/follow/list',//关注主播列表
    
    USER_LIVE_SET : '/v1/anchor/settingLive',//直播设置
    USER_START_LIVE: '/v1/anchor/startLive',// 开始直播
    USER_STOP_LIVE : '/v1/anchor/stopLive',//  关闭直播
    GET_SMSCODE : '/v1/user/getSmsCode',//  关闭直播

    USER_UPDATE_USER : '/v1/user/updateuser',//  更新用户
    USER_ADD_AUDIT : '/v1/audit/addUserAudit',//  增加头像审核
    USER_GET_AUDIT : '/v1/audit/getUserAudit',//  获取头像审核状态

    LIVE_REFRESH_AUTHKEY : '/v1/room/refreshAuthKey', // 刷新串流码


    LIVE_RECORD : '/v1/anchor/liveRecord', // 直播记录

    USER_REPORT_RECHARGE : '/v1/user/rechargeReport', // 充值报表
    USER_REPORT_GAME : '/v1/user/findGameReport', // 游戏报表
    USER_REPORT_GIFT : '/v1/user/userGiftLog', // 礼物报表

    /*********************************************上传文件接口地址*************************************/

    UPLOAD_IMG : '/api/v1/upload/img/fastfds',
    UPLOAD_VIDEO: '/api/v1/video/upload',

    /*********************************************举报以及反馈接口地址**********************************/

    ROOM_REPORT_LIST : '/v1/reportAndFeedback/roomReported/list',
    user_report_list : '/v1/reportAndFeedback/userReported/list',
    FEEDBACK_LIST : '/v1/reportAndFeedback/feedback/list',
    FEEDBACK_INFO : '/v1/reportAndFeedback/feedback/info',
    ROOM_REPORT_INFO : '/v1/reportAndFeedback/roomReported/info',
    USER_REPORT_INFO : '/v1/reportAndFeedback/userReported/info',
    REPORT_FEEBACK_REPLY : '/v1/reportAndFeedback/reply',
    ROOM_REPORT_SAVE : '/v1/reportAndFeedback/roomReported/save', // 房间举报
    USER_REPORT_SAVE : '/v1/reportAndFeedback/userReported/save', // 用户举报
    FEEDBACK_SAVE : '/v1/reportAndFeedback/feedbackSave/save', // 保存反馈信息

    /*********************************************消息接口地址**********************************/
    MESSAGE_MY_LIST : '/v1/message/my/list',//个人消息列表
    MESSAGE_MY_NUM : '/v1/message/my/num',//个人消息数
    MESSAGE_INFO : '/v1/message/info',
    MESSAGE_DELETE : '/v1/message/reptmsg/delete',
    MESSAGE_CLEAN : '/v1/message/clean',
    MESSAGE_DELETES : '/v1/message/reptmsgs/delete',
    /*********************************************首页接口地址**********************************/
    INDEX_ROOMLIST : '/v1/index/roomList' ,
	INDEX_RANDOMROOM :  '/v1/index/randomRoom',
    /*********************************************房间接口地址**********************************/
   ROOM_GETROOMINFO:'/v1/room/getRoomInfo', // 进入房间
   ROOM_FINDGAMEROOMINFO: '/v1/room/findGameRoomInfo' ,

    ROOM_CREATEBALCONY: '/v1/room/createBalcony' ,
    /*********************************************主播接口地址**********************************/
    ANCHOR_ANCHORLIST:'/v1/anchor/anchorList', // 主播列表
    ANCHOR_GETANCHORINFO:'/v1/anchor/getAnchorInfo', // 主播基本信息
    ANCHOR_GETANCHORMVLIST:'/v1/anchor/getAnchorMvList', // 主播mv
    ANCHOR_GETANCHORALBUM:'/v1/anchor/getAnchorAlbum', // 主播相册
    ANCHOR_LISTPHOTO:'/v1/anchor/listPhoto', // 查询相册内的相片
    ANCHOR_FINDANCHORPHOTO:'/v1/anchor/findAnchorPhoto', // 主播5张相片
    ANCHOR_FOLLOW_CANCEL:'/v1/anchor/follow/cancel', //取消关注

    ANCHOR_ANCHOR_FOLLOW_LIST:'/v1/anchor/follow/list', // 关注主播列表

    ANCHOR_MANAGER_LIST:'/v1/anchor/listManager', // 管理员列表
    ANCHOR_MANAGER_ADD:'/v1/anchor/addManager', // 添加管理员
    ANCHOR_MANAGER_DEL:'/v1/anchor/delManager', // 解除管理员
    ANCHOR_BLACKLIST:'/v1/anchor/listBlackList', // 黑名单列表
    ANCHOR_BLACKLIST_RM:'/v1/anchor/rmBlackList', // 解禁黑名单
    ANCHOR_RELEASE_LIST:'/v1/anchor/listRelease', // 解禁黑名单记录



    ANCHOR_SAVEORUPDATEPHOTO:'/v1/anchor/saveOrUpdatePhoto', // 保存和修改相片
    ANCHOR_ADDORUPDATEALBUM:'/v1/anchor/addOrUpdateAlbum', // 添加或修改相册
    ANCHOR_DELALBUM:'/v1/anchor/delAlbum', // 删除相册
    ANCHOR_DELPHOTO:'/v1/anchor/delPhoto', // 删除相片
    ANCHOR_FINDCITY:'/v1/city/findCity', // 查询省市区

    ANCHOR_UPDATEANCHOR:'/v1/anchor/updateAnchor', // 修改主播资料
    VIDEO_DELETEVIDEO:'/v1/video/deleteVideo', // 删除视频
    VIDEO_UPDATEVIDEO:'/v1/video/updateVideo', // 更新视频

    DICTIONARY_FIND:'/v1/dictionary/find', // 获取星座



    /*********************************************榜单接口地址**********************************/
    RANK_ANCHOR_WEALTH_DAY:'/v1/rank/anchor/wealth/day', // 主播魅力(财富)日榜
    RANK_ANCHOR_WEALTH_WEEK:'/v1/rank/anchor/wealth/week', // 主播魅力(财富)周榜
    RANK_ANCHOR_WEALTH_MONTH:'/v1/rank/anchor/wealth/month', // 主播魅力(财富)月榜
    RANK_ANCHOR_WEALTH_TOTAL:'/v1/rank/anchor/wealth/total', // 主播魅力(财富)总榜

    RANK_PLAYER_SPEND_DAY:'/v1/rank/player/spend/day', // 粉丝贡献日榜
    RANK_PLAYER_SPEND_WEEK:'/v1/rank/player/spend/week', // 粉丝贡献周榜
    RANK_PLAYER_SPEND_MONTH:'/v1/rank/player/spend/month', // 粉丝贡献月榜
    RANK_PLAYER_SPEND_TOTAL:'/v1/rank/player/spend/total', // 粉丝贡献总榜

    RANK_ANCHOR_STAR_CUR:'/v1/rank/anchor/star/cur', // 主播周星榜(本周)
    RANK_ANCHOR_STAR_PRE:'/v1/rank/anchor/star/pre', // 主播周星榜(上周)

    RANK_ANCHOR_FANS_DAY:'/v1/rank/anchor/fans/day', // 人气主播日榜
    RANK_ANCHOR_FANS_WEEK:'/v1/rank/anchor/fans/week', // 人气主播周榜
    RANK_ANCHOR_FANS_MONTH:'/v1/rank/anchor/fans/month', // 人气主播月榜
    RANK_ANCHOR_FANS_TOTAL:'/v1/rank/anchor/fans/total', // 人气主播总榜

    RANK_PLAYER_STAR_CUR:'/v1/rank/player/star/cur', // 粉丝周星榜(本周)
    RANK_PLAYER_STAR_PRE:'/v1/rank/player/star/pre', // 粉丝周星榜(上周)

    RANK_PLAYER_WINRATE:'/v1/rank/player/winRate', // 胜率榜

    RANK_PLAYER_PLAYERWEALTH:'/v1/rank/player/playerWealth', // 财富榜

    RANK_PLAYER_CONSUME_DAY:'/v1/rank/player/consume/day', // 消费榜(日榜)
    RANK_PLAYER_CONSUME_WEEK:'/v1/rank/player/consume/week', // 消费榜(周榜)
    RANK_PLAYER_CONSUME_MONTH:'/v1/rank/player/consume/month', // 消费榜(月榜)
    RANK_PLAYER_CONSUME_TOTAL:'/v1/rank/player/consume/total', // 消费榜(总榜)

    RANK_PLAYER_PLAYERWIN_DAY:'/v1/rank/player/playerWin/day', // 胜利榜(日榜)
    RANK_PLAYER_PLAYERWIN_WEEK:'/v1/rank/player/playerWin/week', // 胜利榜(周榜)
    RANK_PLAYER_PLAYERWIN_MONTH:'/v1/rank/player/playerWin/month', // 胜利榜(月榜)
    RANK_PLAYER_PLAYERWIN_TOTAL:'/v1/rank/player/playerWin/total', // 胜利榜(总榜)

    RANK_PLAYER_PLAYERSTAR_DAY:'/v1/rank/player/playerStar/day', // 游戏达人榜(日榜)
    RANK_PLAYER_PLAYERSTAR_WEEK:'/v1/rank/player/playerStar/week', // 游戏达人榜(周榜)
    RANK_PLAYER_PLAYERSTAR_MONTH:'/v1/rank/player/playerStar/month', // 游戏达人榜(月榜)
    RANK_PLAYER_PLAYERSTAR_TOTAL:'/v1/rank/player/playerStar/total', // 游戏达人榜(总榜)



    /*********************************************mv接口地址**********************************/
    VIDEO_RECOMMENDVIDEOLIST:'/v1/video/recommendVideoList', // 推荐视频列表
    VIDEO_ANCHOR_LIST:'/v1/video/anchor/list', // 其他视频列表
    VIDEO_VIDEO_INFO:'/v1/video/videoInfo', // 视频基本信息
    COMMENT_LISTVIDEOCOMMENT:'/v1/comment/listVideoComment', // 评论列表
    COMMENT_SAVEVIDEOCOMMENT:'/v1/comment/saveVideoComment', // 添加评论
    VIDEO_APPRECIATEVIDEO:'/v1/video/appreciateVideo', // 点赞


    /*********************************************礼物列表地址**********************************/
    FIGT_LIST_WEB:'/v1/gift/list/web', // 礼物列表
    USER_LOGIN : '/v1/user/login'
};