$(function() {
   var hrefArr = document.getElementsByTagName('a'); //获取这个页面的所有A标签
   var thirdparty = getPar("thirdparty");
   for( var i=0; i<hrefArr.length; i++ ) {
       //全部url链接后面加上渠道来源;
	   if($.trim(hrefArr[i].href)!=""&&hrefArr[i].href.indexOf("javascript")==-1&&hrefArr[i].href.indexOf("thirdparty")==-1){
	       if(hrefArr[i].href.indexOf('?') != -1){
	           hrefArr[i].href = hrefArr[i].href+"&thirdparty="+thirdparty;
	       }else {
	           hrefArr[i].href = hrefArr[i].href + "?thirdparty="+thirdparty; //修改语句
	       }
	   }
   }
    user.alertModal();
    user.closeAlert();
    $("#regImmediately").click(function() {  //立即注册
        $("#loginCen").hide();
        $("#regCen").show();
    });
    user.panelSwitch();
    /***整体框架****/
    $('.kefulink').click(function() {
        //转向网页的地址;
        var url='http://www.71chat.com/scsf/core/styleConfig.visitorView.do?cmpcd=178019&currentUrl=http%3A%2F%2Fgame.13322.com%2F%23%2F&topicId=148168926681177&topicName=%E6%B8%B8%E6%88%8F%E5%B9%B3%E5%8F%B0&explorer=SouGouBrowser%201.0';
        var name = "";
        var iWidth = 800; //弹出窗口的宽度;
        var iHeight = 600; //弹出窗口的高度;
        var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
        window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
        return false;
    })
        
    var yijianFankui = "", fangjianTousu = ""; // 选项模板
    $('#yijian-option div').each(function(index, el) {
        var value = $(this).attr('data-value'),
            text = $(this).text();
        yijianFankui += '<input class="raido" type="radio" name="recall" value="' + value + '">' + text + '&nbsp;'
    });
    $('#jubao-option div').each(function(index, el) {
        var value = $(this).attr('data-value'),
            text = $(this).text();
        fangjianTousu += '<div class="jubao" data-val="' + value + '">' + text + '</div>'
    });
    
    //意见反馈
    $(document).on('click', '.rebutton1', function(e) {
        e.stopPropagation();
        var choseType = $('input[name="recall"]:checked').val(),
            title = $.trim($('input[name="title2"]').val()),
            atrea = $.trim($('#text2').val());
            titleLength=title.length;
            atreaLength=atrea.length;
        if (choseType == undefined) {
            layer.tips('请选择反馈类型','.type')
            return false;
        } else if (title == "") {
            layer.tips('请输入反馈标题','input[name="title2"]')
            return false;
        } else if (atrea == "") {
            layer.tips('请输入反馈内容','#text2')
            return false;
        }else if(titleLength>20){
            layer.tips('反馈标题不能超过20字','input[name="title2"]')
            return false;
        }else if( atreaLength>300){
           layer.tips('内容不能超过300字','#text2')
            return false;
        }else {
            var data = $('#yjfk').serialize()
            jsonAjax("post", "/room/feedbackSave", data, "json", function(data) {
                if (data.number == '0') {
                    layer.msg('提交成功，感谢你的宝贵意见',{anim:0} ,function(){
                        layer.closeAll();
                    });
                } else {
                    layer.msg('error !',{anim:0} ,function(){
                        layer.closeAll();
                    });
                }
            });
        }
    })
    $(document).on('click', '#recall', function() {
        layer.closeAll();
        var html = '<form id="yjfk"><div class="recall"><div class="type">类型：'+ yijianFankui +'</div><div class="title">标题：<input style="vertical-align:-3px" type="text" maxlength="20" name="title2" placeholder="请输入反馈内容"></div><div class="area">内容：<textarea id="text2" name="context" placeholder="请输入反馈内容" maxlength="300"></textarea></div><div class="rebutton rebutton1 active">立即反馈</div></div></form>'
        layer.config({
            title: '意见反馈'  //意见反馈
        });
        var cc = layer.open({
            type: 1,
            skin: 'layer-ext-moon', //加载新皮肤
            shadeClose: true, //开启遮罩关闭
            content: html,
            area: ['480px', '430px']
        });
    })
    //房间投诉
    $(document).on('click', '.jubao', function(e) {
        e.stopPropagation();
        $('.jubao').removeClass('active');
        $(this).addClass('active');
        var val = $(this).attr('data-val');
        $('input[name="reson"]').val(val);
    })
    $(document).on('click', '.rebutton2', function(e) {
        e.stopPropagation();
        var $this = $('.rebutton2');
        var title =$.trim($('input[name="title1"]').val()),
            atrea = $('input[name="reson"]').val();
        if (title == "" || isNaN(title)) {
           layer.tips('房间号不能为空或格式不对','input[name="title1"]') //'房间号不能为空或格式不对'
            $this.addClass('active');
            return false;
        } else if (atrea == "") {
             layer.tips('请输选择举报类型','.title')  //'请输选择举报类型'
            $this.addClass('active');
            return false;
        } else {
            var title1 = $('input[name="title1"]').val();
            var reson = $('input[name="reson"]').val();
            var data = {
                title1: title1,
                reson: reson ,
                type : 2  // 标记
            }
            jsonAjax("post", "/room/feedbackSave", data, "json", function(data) {
                console.log(data)
                if (data.number == '0') {
                    layer.msg('举报成功',{anim:0} ,function(){  //'举报成功！
                        layer.closeAll();
                    });

                } else {
                    layer.msg('没有找到房间',{anim:0} ,function(){
                    });
                    
                }
            });
            $this.addClass('active');
        }
    })
    $(document).on('click', '#roomcall', function(e) {
        e.stopPropagation();
        var html = "<from id='fjts'> <div class='recall'><div class='title houser2'>房间号：<input type='text' name='title1' placeholder='请输入房间号'><input type='hidden' name='reson'></div><div class='title'>请输选择举报类型</div>" + fangjianTousu + "<div class='rebutton rebutton2 active'>立即举报</div></div></from>"
        layer.config({
            title: '房间举报'
        });
        var bb = layer.open({
            type: 1,
            skin: 'layer-ext-moon', //样式类名
            shadeClose: true, //开启遮罩关闭
            content: html,
            area: ['480px', '440px']
        });
    })

    var locurl = window.document.location.href;
    var locurls = locurl.split('/');
    var locurlsLength = locurls.length - 1;
    var navIndex = locurls[locurlsLength];
    $(window).resize(function(event) {
        var winW = $(document).width();
        var DEFAULT_VERSION = "8.0";
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("msie") > -1;
        var safariVersion;
        if (isIE) {
            safariVersion = ua.match(/msie ([\d.]+)/)[1];
        }
        if (safariVersion <= DEFAULT_VERSION) {
            // 进行你所要的操作
            if (winW < 1363) {
                $('.nav').css('width', '1366px');
            } else {
                $('.nav').css('width', '100%');
            }
        }
    });
    // 消息弹窗
    // 弹窗显示
    $('.nav-message span').hover(function(e) {
        e.stopPropagation();
        var _this = $(this);
        $('.toparrow').hide();
        $('.message-box').hide();
        _this.find('.toparrow,.message-box').show();
        var url = "";
        var id = $(this).find("ul").attr("id");
        var html = "<div class=\"errornav\">"+i18nValueJson.web_jzz+"</div>"
        _this.children("div").children("ul").html(html);
        if (id == "history") {
            url = path + "/history/findHistoryDetailById.html";
        } else if (id == "concern") {
            url = path + "/concern/findConcernDetailById.html";
        } else if (id == "report") {
            //url = path + "/report/findReport?reportType=2&pageCount=6";
        	url = path+"/report/findNavReport"
        } else if (id == "message") {
            url = path + "/message/findMessageById.html";
        } else if (id == "friends"){
            url = path + "/friends/findFriendsById.html";
        } else {     
            return false;
        }
        jsonAjaxText('post', url, {
            'n': 5
        }, 'json', function(data) {
            var rows = data.obj;
            if (rows == 0 || rows ==null||rows=='') {
                var html = "<div class=\"errornav\"><div class=\"error-context\" style='overflow:hidden'><img class='fl' style='margin:18px 0px 0px 34px' src=\""+getRootPath()+"/views/static/img/empty.png\"><p class='fl' style='margin:64px 0px 0px 34px;height:100%;line-height:100%;text-align:center;font-size:16px;color:#999'>"+i18nValueJson.web_ndlbkkry+"</p></div></div>"
                _this.find("ul").html(html);
                _this.find('.scrollbar').hide();
                _this.find('.viewport').addClass('short').height(140);
            } else {
                _this.find('.scrollbar').show();
                _this.find('.viewport').removeClass('short');
                if (id == "report") {
                    rows;
                }
                var boxHtml = "";
                var tableType = 1;
                for (var i = 0; i < rows.length; i++) {
                    if (id == "history") {
                        if (rows[i].isonline == 0) {
                            boxHtml += " <li><a href='javascript:void(0)' ><div class='fl'><img class='zhubo gayimg' src='" + (rows[i].headicon || getRootPath() + "/views/static/img/tou.png") + "' alt="+i18nValueJson.web_zb+"></div>" + " <div class='fl minmessage'><div class='name'>" + rows[i].nickName + "</div><div class='num'><div class='fl'>" + "<img class='zhibosanImg' src='" + getRootPath() + "/views/static/img/zhibo3.png' alt='' >" + typeChange(0, 1) + "</div><div class='clearb'></div> </div></div><div class='fr roomnavname'>"+rows[i].remark+"</div><div class='clearb'></div></a></li>";
                        } else {
                            boxHtml += " <li><a href='javascript:void(0)' onclick='enterroomformsubmit(" + rows[i].roomId + ")' ><div class='fl'><img class='zhubo ' src='" + (rows[i].headicon || getRootPath() + "/views/static/img/tou.png") + "' alt="+i18nValueJson.web_zb+"></div>" + " <div class='fl minmessage'><div class='name'>" + rows[i].nickName + "</div><div class='num'><div class='fl'>" + "<img src='" + getRootPath() + "/views/static/img/zhibo2.png' alt='' >" + typeChange(rows[i].concernNum, 1) + "</div><div class='clearb'></div> </div></div><div class='fr roomnavname'>"+rows[i].remark+"</div><div class='clearb'></div></a></li>";
                        }
                    }else if (id == "friends") {
                        if (rows[i].isOnline == 0) {
                           boxHtml += " <li><a href='" + path + "/friends/list?pageIndex=1&pageSize=5'><div class='fl'><img class='zhubo gayimg' src='" + getPicUrl(rows[i].headIcon) +"' style='background:#afafaf;'></div>" + " <div class='fl minmessage'><div class='name'>" + rows[i].nickName + "</div><div class='num'><div class='fl'>" + "<img src='" + getVip(rows[i].vip) + "'/><img src='" + getGrade(rows[i].levels) + "'>" + "</div><div class='clearb'></div> </div></div><div class='fr roomnavname' style='color:#afafaf;margin-top:18px;'>"+getOnline(rows[i].isOnline)+"</div><div class='clearb'></div></a></li>";
                        }else{
                            boxHtml += " <li><a href='" + path + "/friends/list?pageIndex=1&pageSize=5'><div class='fl'><img class='zhubo' src='" + getPicUrl(rows[i].headIcon) + "'></div>" + " <div class='fl minmessage'><div class='name'>" + rows[i].nickName + "</div><div class='num'><div class='fl'>" + "<img src='" + getVip(rows[i].vip) + "'/><img src='" + getGrade(rows[i].levels) + "'>" + "</div><div class='clearb'></div> </div></div><div class='fr roomnavname' style='margin-top:18px;'>"+getOnline(rows[i].isOnline)+"</div><div class='clearb'></div></a></li>";
                        }
                    } else if (id == "concern") {
                        boxHtml += " <li><a href='javascript:void(0)' onclick='enterroomformsubmit(" + rows[i].roomId + ")'><div class='fl'><img class='zhubo' src='" + (rows[i].headIcon || getRootPath() + "/views/static/img/tou.png") + "' alt="+i18nValueJson.web_zb+"></div>" + " <div class='fl minmessage'><div class='name'>" + rows[i].nickName + "</div><div class='num'><div class='fl'>" + "<img src='" + getRootPath() + "/views/static/img/zhibo2.png' alt='' >" + typeChange(rows[i].concernNum, 1) + "</div><div class='clearb'></div> </div></div><div class='fr roomnavname'>"+rows[i].sign+"</div><div class='clearb'></div></a></li>";
                    } else if (id == "report") {
                        var newDate = rows[i].reportTime;
                        //var d = new Date(newDate);    //根据时间戳生成的时间对象
                        var date = rows[i].reportTimeStr;//(d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + (d.getHours()) + ":" + (d.getMinutes()) + ":" +(d.getSeconds());
                        //加上胜负+-号，给胜负份额添加颜色
                        var board = rows[i].boardresult;
                        if(board==0){
                        	var divhtml = "<div class='num fr' style='color:red'>" +"-"+ rows[i].income + "</div>";
                        }else if(board==1){
                        	var divhtml = "<div class='num fr' style='color:green'>" +"+"+ rows[i].income + "</div>";
                        }else{
                        	var divhtml = "<div></div>";
                        }
                        //充值报表
                        if(rows[i].type ==1){
                        	boxHtml += " <li><a href='" + path + "/report/enterReportPage.html?reportType=1'><div class='yd'>" + rows[i].title + "</div><div class='minmessage'> <div class='name fl'>" + date + "</div> "+divhtml+" </div> </a></li>";
                        }
                        //游戏报表
                        if(rows[i].type ==2){
                        	boxHtml += " <li><a href='" + path + "/report/enterReportPage.html?reportType=2'><div class='yd'>" + rows[i].title + "</div><div class='minmessage'> <div class='name fl'>" + date + "</div> "+divhtml+" </div> </a></li>";
                        }
                        //礼物报表
                        if(rows[i].type ==3){
                        	boxHtml += " <li><a href='" + path + "/report/enterReportPage.html?reportType=3'><div class='yd'>" + rows[i].title + "</div><div class='minmessage'> <div class='name fl'>" + date + "</div> "+divhtml+" </div> </a></li>";
                        }
                    } else if (id == "message") {
                    	if(rows[i].tableType!=undefined){
                    		tableType =rows[i].tableType;
                    	}
                    		
                        var newMessageDate = rows[i].sendTime;
                        var e = new Date(newMessageDate);    //根据时间戳生成的时间对象
                        var messageDate =  (e.getMonth() + 1) + "/" + (e.getDate()) + "/" + (e.getHours()) + ":" + (e.getMinutes());
                        boxHtml += "<li><a href='" + path + "/message/enterMessageConcent/md-" + rows[i].messageId + "_rd-" + rows[i].reptId + "_tt-"+ tableType+".html'; ><div class='top'>" + rows[i].title + "<span style='float:right;'>"+ messageDate +"</span>"+"</div><div class='bottom '>"+"<span>"+ rows[i].content + "</span>"+"</div><div class='clearb'></div></a></li>";
                    }
                }
                $("#" + id + "").html(boxHtml);
                // 滚动条
                if (rows.length <= 6) {
                    _this.find('.scrollbar').hide();
                    var minheight=_this.find('.viewport').find('li').height();
                    _this.find('.viewport').height((rows.length) * minheight);
                    var $scrollNav = $('.scrollbar1');
                    $scrollNav.tinyscrollbar();
                    var $setscroll = $scrollNav.data("plugin_tinyscrollbar");
                    $setscroll.update();
                } else {
                    var minheight=_this.find('.viewport').find('li').height();
                    _this.find('.viewport').height(minheight*6);
                    var $scrollNav = $('.scrollbar1');
                    $scrollNav.tinyscrollbar();
                    var $setscroll = $scrollNav.data("plugin_tinyscrollbar");
                    $setscroll.update();
                }
            }
        }, _this.find("ul"));
    }, function(e) {
        var id = $(this).children("div").children("ul").attr("id");
        e.stopPropagation();
        $('.toparrow').hide();
        $('.message-box').hide();
    });
    $('#keyWords').click(function(e) {
        $(this).removeAttr('placeholder');
        e.stopPropagation();
    });
    // 弹窗关闭
    $(document).click(function(e) {
        e.stopPropagation();
        $('.toparrow').hide();
        $('.message-box').hide();
        /*$('#keyWords').animate({
            width: '134px'
        }, 200);*/
       // $('#keyWords').attr('placeholder', i18nValueJson.web_souzbfj).next('a').removeClass('button2').addClass('button')
    })
        
    // 搜索栏
    /*$('#keyWords').focus(function(event) {
        $(this).animate({
            width: '134px'
        }, 200);
        $(this).next('a').removeClass('button').addClass('button2');
    })*/
    // 点击搜索
    $('#search').on('click', function(e) {
        var pattern = new RegExp("[`~!@#$^&%*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        var keyWords = $.trim($('#keyWords').val());
        if (keyWords != "") {
            if(pattern.test(keyWords)){  
               // alert("非法字符！");  
                $("#keyWords").attr("value","");  
                $("#keyWords").focus();  
                return false;  
            }  
            var url = getRootPath() + "/1/hall/kw-" + keyWords + "_ci-" + ci + ".html";
            window.location.href = url;
        }
    })
        // 回车功能
    $(document).keypress(function(event) {
        var key = event.which;
        var keyWords = $.trim($('#keyWords').val());
        if (key == 13 && keyWords != "" && keyWords.length > 0) {
            window.location.href = path + "/hall/kw-" + keyWords + "_ci-" + ci + ".html";
        }
    });

    /**
     * 相册点击查看大图功能
     */
    /*$(document).on('click','#albumImg>ul li',function(event){
        var e = event || window.event ;
        e.stopPropagation() ;   
       console.log('event....',$(this).index())     
    })*/
    $(document).on('click', '#albumImg>ul li', function() {
        //var check = $('#album').children().length;
        //var checkclass = $('.video-list').hasClass('active');
        var index = $(this).index();
        //if (!checkclass) {
            //$('.video-list').addClass('active');
            var img = $('#albumImg .video-img');
            var html1 = "";
            var html2 = "";
            img.each(function() {
                var src = $(this).attr('src');
                html1 += " <li class=\"swiper-slide\"><span></span><img src=\"" + src + "\" alt=\"\"></li>";
                html2 += "<li class=\"swiper-slide active-nav\"><img src=\"" + src + "\" alt=\"\"></li>";
            });
            $('#album').html(html1);
            $('#thumbnail').html(html2);
        //}
        //pohotojs.init(index);
        $('.pc-slide-cover').css('display','block');
        photo(index) ;
        //$('.keBody,.keBody2').css('visibility', 'visible');
    })
    $(document).on('click','a.close-pc-slide',function(){
        $('.pc-slide-cover').css('display','none');
    })
    function photo(num){
        var viewSwiper = new Swiper('.view .swiper-container', {
            initialSlide : num  ,
            onSlideChangeStart: function() {
                updateNavPosition()
            }
        })
        $('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
            e.preventDefault()
            if (viewSwiper.activeIndex == 0) {
                viewSwiper.swipeTo(viewSwiper.slides.length - 1, 1000);
                return
            }
            viewSwiper.swipePrev()
        })
        $('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
            e.preventDefault()
            if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
                viewSwiper.swipeTo(0, 1000);
                return
            }
            viewSwiper.swipeNext()
        })
        var previewSwiper = new Swiper('.preview .swiper-container', {
            initialSlide : num ,
            visibilityFullFit: true,
            slidesPerView: 'auto',
            onlyExternal: true,
            onSlideClick: function() {
                viewSwiper.swipeTo(previewSwiper.clickedSlideIndex)
            }
        })
        updateNavPosition()
        function updateNavPosition() {
            $('.preview .active-nav').removeClass('active-nav')
            var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
            //console.log(activeNav.index())
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > previewSwiper.activeIndex) {
                    var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                    previewSwiper.swipeTo(activeNav.index() - thumbsPerNav)
                } else {
                    previewSwiper.swipeTo(activeNav.index())
                }
            }
        }
    } 
 // 渠道统计
    /*(function() {
        var hm_t = document.createElement("script");
        hm_t.setAttribute('id', 'hmw3g9kd4kx8yqgo');
        hm_t.src = "http://union.13322.com/traffic/scripts/traffic.js?v=2&vnp56ams";
        var s_t = document.getElementsByTagName("script")[0];
        s_t.parentNode.insertBefore(hm_t, s_t);
    })();*/
});
/**
 * data-toggle:操作类型
 * data-target:目标层id
 * @type {Object}
 */
var user = {
    alertModal: function() {
        //弹出模态框
        $("[data-toggle='modal']").click(function() {
            var id = $(this).attr("data-target");
            $("#" + id).show();
            $(".bg").show()
        });
    },
    closeAlert: function() {
        //关闭按钮
        $("[data-toggle='close']").click(function() {
            var id = $(this).attr("data-target");
            $("#" + id).find("input").empty();
            $("#" + id).find(".errMsg").empty();
            $("#" + id).find("img.checkMsg").remove();
            $("#" + id).hide();
            $(".bg").hide();
        });
    },
    panelSwitch: function() {
        //面板切换
        $("[data-toggle='tab-panel'] a").click(function() {
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            var id = $(this).attr("data-target");
            $("#" + id).find(".tab-item").eq(index).show().siblings().hide();
        });
    }
}
var validate = {
    checkUser: function(id) {
        var user = $(id).val();
        if (user.length <= 0) {
            validate.assembledData();
            return pmsg.yhmbnwk;
        }
        return "";
    },
    checkPhone: function(id) {
        var reg = /^1[3-9]\d{9}$/;
        var phone = $(id).val();
        if (phone.length <= 0) {
            return pmsg.qsrsjhm;
        }
        if (!reg.test(phone)) {
            return pmsg.sjhmgsbzq;
        }
        return "";
    },
    checkPsw: function(id, reid) {
        var newPsw = $(id).val();
        var rePsw = $(reid).val();
        if (newPsw.length <= 0) {
            return pmsg.mmbnwk;
        }
        if (rePsw.length <= 0) {
            return pmsg.qsrqrmm;
        }
        if (rePsw.length > 0 && rePsw != newPsw) {
            return pmsg.lcmmsybyz;
        }
        return "";
    },
    checkOnePsw: function(id) {
        var newPsw = $(id).val();
        if (newPsw.length <= 0) {
            return pmsg.mmbnwk;
        }
        return "";
    },
    checkCode: function(id) {
        var NO = $(id).val();
        if (NO.length <= 0) {
            return pmsg.qsyyzm;
        }
        return "";
    }
};
/************************分页跳转******************************/
/**
urlprams:为控制器名称如：http://localhost:8080/VideoGameWeb/message/enterMessage/pn-3.html
         参数为message/enterMessage；
*/
function pageJump(urlprams) {
    $('.page-component-submit').on('click', function() {
        var num = parseInt($('.page-component-jumptxt').val());
        var totalNum = $('#pages-container').data("pc");
        if (num && num <= totalNum) {
            formsubmit(num);
        }
    })
}
/************************验证码******************************/
var countdown = 60;
function settime(id) {
    if (countdown == 0) {
        $(id).removeAttr("disabled");
        $(id).val(pmsg.fsyzm);
        countdown = 60;
        return false;
    } else {
        $(id).attr("disabled", "disabled");
        $(id).val(pmsg.zzfs + "(" + countdown + ")");
        countdown--;
        setTimeout(function() {
            settime(id);
        }, 1000);
    }
}
//js获取项目根路径，如： http://localhost:8080/VideoGameWeb
//全局地址头 imageUrl    
function getRootPath() {
    //获取当前网址，如： http://localhost:3000/?thirdparty=1
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： VideoGameWeb/share/meun.jsp
    var pathName = window.document.location.pathname;
    
    var pos = curWwwPath.indexOf(pathName);
    
    //var pos = curWwwPath.indexOf('?');
    
    //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos);
    
    //获取带"/"的项目名，如：/VideoGameWeb
    
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    
    return (localhostPath + projectName);
    
    // return 'http://192.168.2.45:3000';
}
function change(lang) {
    window.location.href = "/lang/"+lang;
}
//判断是否在线
function getOnline(idx){
    var p = "" ; 
    if(idx == 0){
        p = "离线";
    }else{
        p = "在线中";
    }
    return p;
}
//截取图片地址
function getPicUrl(picUrl){
    var url = "";
    if(picUrl){
        var urlIndex = picUrl.indexOf("|")+1;
        url = imageUrl+picUrl.substring(urlIndex,picUrl.length);
        console.log(urlIndex);
    }else{
        url = getRootPath()+"/views/static/img/tou.png";
    }
    return url;
}

//得到vip
function getVip(vip){
    var imgUrl = "";
    imgUrl = getRootPath()+'/views/static/img/levles/vip/'+vip+'.png';
    return imgUrl;
}

//得到用户等级
function getGrade(grade){
    var djUrl = "";
    djUrl = getRootPath()+'/views/static/img/levles/lv/'+grade+'.png';
    return djUrl;
}
// ajax请求方法
function jsonAjax(type, url, param, datat, callback) {
    $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: datat,
        success: callback,
        error: function(err) {
            layer.alert(err)
        }
    });
}
// 防止弹出ajax请求
function jsonAjaxText(type, url, param, datat, callback, el) {
    $.ajax({
        type: type,
        url: url,
        data: param,
        dataType: datat,
        success: callback,
        error: function() {
            var html = "<div style=\"width:100%;font-size:12px;color:red;text-align:center;height:40px;line-height:40px;\">获取失败！</div>"
            el.html(html);
        }
    });
}
//分页查询表单提交方法
function formsubmit(pageIndex) {
    $('#pageIndex').val(pageIndex);
    $('#formselect').submit();
}
//跳转到第几页查询
function formsubmitgo() {
    $('#pageIndex').val($('#gopageindex').val());
    $('#formselect').submit();
}
//页面选项卡切换
function formsubmittabbar(reportType) {
    $('#reportType').val(reportType);
    $('#tabbarform').submit();
}
//进入房间post提交
function enterroomformsubmit(id) {
    window.location.href = path +"/anchorroomvideo/enterRoomPage/" + "id-" + id + ".html";
}
//返回到大厅
function gaBackHall(){
    window.location.href = path + "/hall/all.html";
}
//进入包厢
function enterBalcony(roomId, password, flag){
	if(password){
		if(flag){
		    window.location.href = path +"/anchorroomvideo/enterRoomPage/" + "id-" + roomId + ".html?password=" + password + "&flag=1";
		}else{
		    window.location.href = path +"/anchorroomvideo/enterRoomPage/" + "id-" + roomId + ".html?password=" + password;
		}
	}else{
	    window.location.href = path +"/anchorroomvideo/enterRoomPage/" + "id-" + roomId + ".html";
	}
}
//进入无视频包厢
function enterPCBalcony(roomId, password, flag) {
	if(password){
		if(flag){
		    window.location.href = path +"/noVideoRoom/enterNoVideoRoom/" + "id-" + roomId + ".html?password=" + password + "&flag=1";
		}else{
		    window.location.href = path +"/noVideoRoom/enterNoVideoRoom/" + "id-" + roomId + ".html?password=" + password;
		}
	}else{
	    window.location.href = path +"/noVideoRoom/enterNoVideoRoom/" + "id-" + roomId + ".html";
	}
}
//验证包厢名
function verifyName(obj){
	var rn = $(obj);
	var roomName = rn.val();
	if(roomName.len()>2&&roomName.len()<23){
		rn.siblings(".eror").hide();
		nFlag = true;
	}
	else{
		rn.siblings(".eror").show();
		nFlag = false;
	}
}
//验证包厢密码
function verifyPassword(obj){
	var rp = $(obj);
	var password = rp.val();
	if(password.length>2&&password.length<17&&!/[\u4e00-\u9fa5]/g.test(password)&&password.indexOf(" ")==-1){
		rp.siblings(".eror").hide();
		pFlag = true;
	}
	else{
		rp.siblings(".eror").show();
		pFlag = false;
	}
}
String.prototype.len = function(){ 
    return this.replace(/[^\x00-\xff]/g, "xx").length; 
}

//验证包厢提交的内容
var nFlag = false;
var pFlag = false;
//创建包厢
function createBalcony(ctxpath, platFormUrl){
	verifyName(document.getElementsByClassName("roomNamei"));
	verifyPassword(document.getElementById("roomPassword"));
	if(!nFlag||!pFlag){return;}

	var data = {
		roomName:$('input#roomName').val(),
		password:$('#roomPassword').val(),
		type:$('input[name=fapai]:checked').val(),
		blind:$('#blindSlider').text(),
		expire:$('#balconyTimeSlider').text()
	}
	if(!data.roomName || !data.password){
		stateroom.paramFail();
		return;
	}
	$.ajax({
		url:ctxpath + '/balcony/creation',
		data:data,
		type:'post',
		dataType:'json',
		success:function(result){
			var code = result.code;
			if(!code){
				if(data.type == 1){
					enterBalcony(result.roomId, result.password, true);
				}else{
					enterPCBalcony(result.roomId, result.password, true);
				}
			}else if(code == 5){
				stateroom.creatFail(platFormUrl);
			}else if(code == 4){
				stateroom.withoutLoggon();
			}else{
				stateroom.otherFail(result.msg);
			}
		},
		error:function(result){
			alert('系统繁忙，请稍后再试');
		}
	});
}
//进入无视频房间post提交
function noVideoroomformsubmit(id) {
    window.location.href = path +"/noVideoRoom/enterNoVideoRoom/" + "id-" + id + ".html?thirdparty="+getPar("thirdparty");;
}

//空值转换
function typeChange(data, type) {
    if (type == 1) {
        return data == undefined ? 0 : data;
    } else {
        return data == undefined ? "" : data;
    }
}
//Flash用到的获取平台地址
function getPlatformUrl() {
    return platformUrl;
}
function getPayUrl(){
    return 'http://127.0.0.1/'
}
//Flash用到的获取游戏信息
/*function getPlatInfo() {
    var $acd = $('.decTitleR h3').attr("data-acd") ;
    var $rid = $('#rid').val() ;
    return {
        acd : $acd ,
        rid : $rid 
    }

}*/
//flash 用到刷新用户信息
function refreshUserInfo(){
    jsonAjax("post", path + "/user/getUser", {}, "json", function(data) {
        if (data.code == 0) {
            $("#gold_label").text(data.gold);
            $("#dou_label").text(data.dou);
        }
    });
}
//flash 添加好友
function addFriend(idx){
    var html = '<div class="jwhyFlashBox"><p class="Flashtitle">请输入验证信息</p><textarea class="jwhyFlashCont" placeholder="我是..." maxlength="20" style="width:270px;height:65px"></textarea></div>';
    layer.config({
            title: "添加好友"
        });
    var flashTitle = layer.open({
        btn:['取消','添加'],
        skin:'layer-ext-moon',
        shadeClose:true,
        content:html,
        yes: function() {
            layer.closeAll();
        },
        btn2: function(){
            var name = $('.layui-layer-title').html();
            var verifyCon = $('.jwhyFlashBox .jwhyFlashCont').val();
            var con =  "验证信息："+verifyCon; 

            var flashData = {
                title:name,
                friendId:idx
            }
            if (!verifyCon) {
                layer.alert('请输入验证信息!', {
                    icon: 0,
                    skin: 'layer-ext-moon'
                });
                return false;
            } else {
                flashData.content = con;
            }

            $.ajax({
                type: "post",
                data: flashData,
                url: path + '/friends/notice',
                dataType: "json",
                success: function(data) {
                     if(data.code == 108){
                        layer.msg("已经是好友！");
                     }else if(data.code == 109){
                        layer.msg("重复提交！");
                     }else if(data.code == 0){
                        layer.msg("提交申请成功，请等待好友同意!");
                     }else if(data.code == 106){
                        $('#login_a').click();
                        console.log("失去登录状态！");
                     }
                },
                error:function(){
                    console.log("error!");
                }
            });
        }
    });
} 
// APP下载
function downloadApp(mark){
    $.ajax({
        type: "get",
        data: {type:mark},
        url: path + '/downloadApk/appToApkDownload.html',
        dataType: "json",
        success: function(data) {
             console.log('test..',data);
             if(data.success!=-1){
                window.location.href = data.success
             }else{
                alert('文件不存在!')
             }
        },
        error:function(){
            console.log("error!");
        }
    });
}

$(document).on('mouseover','.userName,.userAll',function(){
    $('.userList').css('display','block');
})
$(document).on('mouseleave','.userName,.userAll',function(){
    $('.userList').css('display','none');
})
$('.userList li').eq(1).css('border-top','none')

//获取地址栏参数
function getParameter(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return "";
}
function getPar(name) {
    var par = getParameter(name);
    if (par=="")
        return "1";
    else
        return par;
}
//百度统计
/*var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?"+baiduCode;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();*/

/*window._CWiQ = window._CWiQ || [];
window.BX_CLIENT_ID = 36968; // 帐号ID
(function() {
    var c = document.createElement('script')
       ,p = 'https:'==document.location.protocol;
    c.type = 'text/javascript';
    c.async = true;
    c.src = (p?'https://':'http://')+'tp.ana.pjdsp.com/boot/0';
    var h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(c, h);
})();*/

