/**
 * 排行榜业务处理
 */
'use strict';

//引入相关组件
var express = require('express');
var uris = require("../config/uris");
var config = require("../config/config");
var router = express.Router();

var rankingService = {
    //默认数据列表
    initialList : function(req, res){
        var rankData = {

        };
        //主播魅力(财富)日榜
        $http.addTask({
            url:uris.RANK_ANCHOR_WEALTH_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png',
                                "wealth": 0
                            })
                        }
                    }
                }
                rankData.anchorWealthDay = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });
        //主播魅力(财富)周榜
        $http.addTask({
            url:uris.RANK_ANCHOR_WEALTH_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png',
                                "wealth": 0
                            })
                        }
                    }
                }
                rankData.anchorWealthWeek = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //主播魅力(财富)月榜
        $http.addTask({
            url:uris.RANK_ANCHOR_WEALTH_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png',
                                "wealth": 0
                            })
                        }
                    }
                }
                rankData.anchorWealthMonth = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //主播魅力(财富)总榜
        $http.addTask({
            url:uris.RANK_ANCHOR_WEALTH_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png',
                                "wealth": 0
                            })
                        }
                    }
                }
                rankData.anchorWealthTotal = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });

        //粉丝贡献日榜
        $http.addTask({
            url:uris.RANK_PLAYER_SPEND_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerSpendDay = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //粉丝贡献周榜
        $http.addTask({
            url:uris.RANK_PLAYER_SPEND_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerSpendWeek = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //粉丝贡献月榜
        $http.addTask({
            url:uris.RANK_PLAYER_SPEND_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerSpendMonth = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //粉丝贡献总榜
        $http.addTask({
            url:uris.RANK_PLAYER_SPEND_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerSpendTotal = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });

        //主播周星榜(本周)
        $http.addTask({
            url:uris.RANK_ANCHOR_STAR_CUR
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 7){
                        for(var i = 0; i < 7 - arr.length; i++){
                            curArr.push({
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorStarCur = arr.concat(curArr);
            }
            ,error:function(error){
            }
        });
        //主播周星榜(上周)
        $http.addTask({
            url:uris.RANK_ANCHOR_STAR_PRE
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 7){
                        for(var i = 0; i < 7 - arr.length; i++){
                            curArr.push({
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorStarPre = arr.concat(curArr);
            }
            ,error:function(error){
            }
        });

        //人气主播日榜
        $http.addTask({
            url:uris.RANK_ANCHOR_FANS_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorFansDay = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });
        //人气主播周榜
        $http.addTask({
            url:uris.RANK_ANCHOR_FANS_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorFansWeek = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //人气主播月榜
        $http.addTask({
            url:uris.RANK_ANCHOR_FANS_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorFansMonth = arr.concat(curArr)
                console.log('qqq',rankData.anchorFansMonth)

            }
            ,error:function(error){
            }
        });
        //人气主播总榜
        $http.addTask({
            url:uris.RANK_ANCHOR_FANS_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.anchorFansTotal = arr.concat(curArr)


            }
            ,error:function(error){
            }
        });

        //粉丝周星榜(本周)
        $http.addTask({
            url:uris.RANK_PLAYER_STAR_CUR
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 7){
                        for(var i = 0; i < 7 - arr.length; i++){
                            curArr.push({
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerStarCur = arr.concat(curArr);
            }
            ,error:function(error){
            }
        });
        //粉丝周星榜(上周)
        $http.addTask({
            url:uris.RANK_PLAYER_STAR_PRE
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 7){
                        for(var i = 0; i < 7 - arr.length; i++){
                            curArr.push({
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerStarPre = arr.concat(curArr);
            }
            ,error:function(error){
            }
        });

        //胜率榜
        $http.addTask({
            url:uris.RANK_PLAYER_WINRATE
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerWinRate = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });

        //财富榜
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERWEALTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerWealth = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });

        //消费榜(日榜)
        $http.addTask({
            url:uris.RANK_PLAYER_CONSUME_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerConsumeDay = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //消费榜(周榜)
        $http.addTask({
            url:uris.RANK_PLAYER_CONSUME_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerConsumeWeek = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //消费榜(月榜)
        $http.addTask({
            url:uris.RANK_PLAYER_CONSUME_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerConsumeMonth = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //消费榜(总榜)
        $http.addTask({
            url:uris.RANK_PLAYER_CONSUME_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerConsumeTotal = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });

        //胜利榜(日榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERWIN_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerWinDay = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //胜利榜(周榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERWIN_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerWinWeek = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //胜利榜(月榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERWIN_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerMonth = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });
        //胜利榜(总榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERWIN_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerTotal = arr.concat(curArr)


            }
            ,error:function(error){
            }
        });

        //游戏达人榜(日榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERSTAR_DAY
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerStarDay = arr.concat(curArr)
            }
            ,error:function(error){
            }
        });
        //游戏达人榜(周榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERSTAR_WEEK
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerStarWeek = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });
        //游戏达人榜(月榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERSTAR_MONTH
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerStarMonth = arr.concat(curArr)

            }
            ,error:function(error){
            }
        });
        //游戏达人榜(总榜)
        $http.addTask({
            url:uris.RANK_PLAYER_PLAYERSTAR_TOTAL
            ,method:"get"
            ,data:{companyId:1}
            ,dataType:"json"
            ,success:function(data){
                if(data.data && data.data.length){
                    var arr = data.data;
                    var curArr = [];
                    if(arr.length < 10){
                        for(var i = 0; i < 10 - arr.length; i++){
                            curArr.push({
                                "id": null,
                                "anchorId": null,
                                "anchorName": "虚位以待",
                                "anchorIcon": './static/img/tou.png'
                            })
                        }
                    }
                }
                rankData.playerPlayerStarTotal = arr.concat(curArr)


            }
            ,error:function(error){
            }
        });

        $http.run(function(){
            res.render('rank', {rankData:rankData,user:''});
        });
    }
};


module.exports = rankingService;