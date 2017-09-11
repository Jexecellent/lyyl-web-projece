//用于玩家鉴权不成功重新加载房间列表
function roomlistreload() {
	var rootpath = getRootPath();
	console.log('rootpath....',rootpath)
	layer.alert('房间请求失败', function() {
		//alert(1)
		//window.location.href = rootpath;
	})
}
// 代开新页面
function openNewRoom(roomID) {
	var currRoomid = $('#wrap').attr('data-roomId');
	if (roomID !== currRoomid) {
		var url = path + "/anchorroomvideo/enterRoomPage/id-" + roomID + ".html";
		window.open(url);
	}

}
// 视频滚动条
function veidoScrool() {
	var $scrollbarveido = $('#scrollbarveido');
	$scrollbarveido.tinyscrollbar();
	var scrollbarveido = $scrollbarveido.data("plugin_tinyscrollbar")
	scrollbarveido.update();
}
//聊天滚动条
function chatScrool() {
	var $scrollbarChat = $(".scrollbarChat");
	$scrollbarChat.tinyscrollbar();
	var check = $('.roomChat-scroll').hasClass('roomChat-scroll-disabled')
	var scrollbarChat = $scrollbarChat.data("plugin_tinyscrollbar");
	if (!check) {
		scrollbarChat.update('bottom');
	} else {
		scrollbarChat.update('relative');
	}
}
// 表情滚动条
function faceScrool() {
	var $scrollbarFace = $(".scrollbarFace");
	$scrollbarFace.tinyscrollbar();
	var scrollbarFace = $scrollbarFace.data("plugin_tinyscrollbar");
	scrollbarFace.update();
}
$(function() {
	//debugger;
	//closeBar()
	veidoScrool()
	// 第一次加载进来视频区域的大小
	setVwh();

	// 变动时设置视频区大小
	$(window).resize(function(event) {
		//closeBar()
		chatScrool();
		setVwh();
		veidoScrool();
	});
	// 侧边栏收齐
	var container = $('#all-video-list-container');
	$('.toggle-btn').click(function(event) {
		var check = $('#wrap').attr('data-colse');
		if (check == "on") {
			container.css('marginLeft', '107px');
			$('#wrap').attr('data-colse', 'off');
		} else {
			container.css('marginLeft', '285px');
			$('#wrap').attr('data-colse', 'on');
		}
		$('.sidebar-container').show();
		$(this).parents('.sidebar-container').hide();
		setVwh();
	});
	/*大厅左侧边栏收缩*/
    $(".navLeft .sideclose").click(function(){
        var _this = $(this);
        $(".navLeft").toggle();
        if(_this.parent().hasClass('navLeftIn')){
            $(".hallCon,.roomCon").css({"marginLeft":"287px"});
        }
        if(_this.parent().hasClass('navLeftOut')){
            $(".hallCon,.roomCon").css({"marginLeft":"107px"});
        }
        setVwh();
    })

	//	自适应关闭左右栏
	function closeBar() {
		var w = $(window).width();
		var container = $('#all-video-list-container');
		if (w <= 1600) {
			container.css('marginLeft', '107px');
			$('#wrap').attr('data-colse', 'off');
			$('.room-container').addClass('room-chat-collesped')
			$('.sidebar-container').hide();
			$('.sidebar-collapsed').show();
		}

		if (w <= 1366) {
			$('.room-container').addClass('room-chat-collesped')

		} else {
			$('.room-container').removeClass('room-chat-collesped')
		}
		setVwh();
	}
	// 右边栏伸缩 hhly
	$('.room-chat-expand-btn').click(function() {
		var check = $('.roomRight').hasClass('room-chat-collesped')
		if (!check) {
			$('.roomRight').addClass('room-chat-collesped')
		} else {
			$('.roomRight').removeClass('room-chat-collesped')
		}
		setVwh();
	});
	// 视频大区长度 hhly
	function veidoW() {
		var winW = $(window).width();
		var checkleft = $('.sidebar-long').is(":hidden");
		var checkright = $('.room-no-notice').hasClass('room-chat-collesped');
		if (!checkleft) {
			var winL = $('.sidebar-long').width(); // 260px
		} else {
			var winL = $('.navLeftIn').width() - 10;
		}
		if (!checkright) {
			var winR = $('.roomRight').width(); // 326px
		} else {
			var winR = $('.room-chat-expand-btn').width();
		}
		//console.log('winW...',winW,'winL...',winL,'winR...',winR);
		var vW = winW - winL - winR - 45 - 48; //
		//console.info('vW...',vW)
		return vW;
	}
	// 视频区域宽高计算 hhly
	function setV(el) {
		var getv = veidoW();
		var winH = $('#scrollbarveido').height();
		if (getv < 1000) {
			$('#scrollbarveido .viewport').width(getv).height(winH - 60).addClass('viewport2')
		} else {
			$('#scrollbarveido .viewport').width(getv).height(winH).removeClass('viewport2')
		}
		getv = getv < 1000 ? 1000 : getv;
		$('#js-live-room-normal-left').width(getv);
		var vW = el.width(getv);
		var vH = getv * 0.6;
		el.height(vH);
		var contextH = $('#js-live-room-normal-left').height();
		//		$('#scrollbarveido .scrollbar').height(contextH);
		//		$('#scrollbarveido .scrollbar .track').height(contextH);
		//var toTop = $('#js-room-video').offset().top;
		//$('.list-container').scrollTop(toTop);
		veidoScrool();
	}
	// 设置视频区宽高
	function setVwh() {
		var nowW = veidoW();
		var roomvideo = $('.room-video');
		setV(roomvideo);
	}

	//关注
	$('#attention').click(function() {

		var num = parseInt($('#attentionNum').text());
		callback = function(data) {
			if (data.status == 1) {
				$('#attention').hide();
				$('#cancelAttention').show();
				$('#attentionNum').text(num + 1);
			} else if(data.status == 70001) {
				$('#login_a').click();
			}else {
				layer.alert(data.message);
			}
		}
		jsonAjax("post", path + "/concern/saveConcern", {
			id: $("#attentionNum").data('anchorid')
		}, "json", callback);
	});
	//取消关注
	$('#cancelAttention').click(function() {

		var num = parseInt($('#attentionNum').text());
		callback = function(data) {
			if (data.status == 1) {
				$('#cancelAttention').hide();
				$('#attention').show();
				$('#attentionNum').text(num - 1);
			} else {
				layer.alert(data.message);
			}
		}
		jsonAjax("post", path + "/concern/updateConcernStatus", {
			id: $("#attentionNum").data('anchorid')
		}, "json", callback);
	});
	
	// 私聊拉升
	$('.room-chat-privatechat-arrow').click(function(event) {

		var el = $(this),
			check = el.hasClass('up');
		if (check) {
			el.removeClass('up');
			$('.room-chat-container,.room-chat-privatechat').removeClass('change')
		} else {
			el.addClass('up')
			$('.room-chat-container,.room-chat-privatechat').addClass('change')
		}
		chatScrool();
		privateChatScrool();
	});
	// 字体选择
	$('.chatColor').click(function(event) {
		event.stopPropagation();
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
		
			return false;
		}

		var check = $(this).hasClass('chatvip');
		var level = parseInt($(this).attr('data-level')),
			color = $(this).attr('data-color'),
			userLevels = $(this).attr('data-id');
		if (check) {
			if (videoUserVip >= level || userLevels >= level) {
				$('.chatColor').removeClass('selected');
				$(this).addClass('selected');
				chatFontColor = color;
			}
		} else {
			if (videoUserGrade >= level || userLevels >= level) {
				$('.chatColor').removeClass('selected');
				$(this).addClass('selected');
				chatFontColor = color;
			}
		}
		$('.room-chat-tool-color-panel').hide();
		$('.room-chat-tool-color').removeClass('room-chat-tool-color-open');
	});
	// tips显示 在用
	$(document).on('mouseover', '.room-chat-tool,.chatColor', function() {
		var data = $(this).attr('data-tips');
		var that = this;
		if (data) {
			layer.tips(data, that);
		}
	})
	$(document).on('mouseout', '.room-chat-tool,.chatColor', function() {
		layer.closeAll();
	})
	// 聊天操作
	$(document).click(function(event) {
		event.stopPropagation();
		// $('.room-chat-tool-scroll').removeClass('room-chat-tool-scroll-disabled');
		// $('.room-chat-tool-gift').removeClass('room-chat-tool-gift-open');
		$('.room-chat-tool-emoji').removeClass('room-chat-tool-emoji-open');
		$('.room-chat-tool-color').removeClass('room-chat-tool-color-open');
		$('.room-chat-tool-gift-forbid-panel').hide();
		$('.room-chat-tool-emoji-panel').hide();
		$('.room-chat-tool-color-panel').hide();
	});
	$('.room-chat-tool-scroll').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}

		// $('.room-chat-tool-gift').removeClass('room-chat-tool-gift-open');
		$('.room-chat-tool-emoji').removeClass('room-chat-tool-emoji-open');
		$('.room-chat-tool-color').removeClass('room-chat-tool-color-open');
		$('.room-chat-tool-gift-forbid-panel').hide();
		$('.room-chat-tool-emoji-panel').hide();
		$('.room-chat-tool-color-panel').hide();
		event.stopPropagation();
		var check = $(this).hasClass('room-chat-tool-scroll-disabled')
		if (check) {
			$(this).removeClass('room-chat-tool-scroll-disabled')
			$(this).attr('data-tips', '关闭滚屏')
		} else {
			$(this).addClass('room-chat-tool-scroll-disabled')
			$(this).attr('data-tips', '开启滚屏')
		}
		chatScrool();
	});
	$('.room-chat-tool-gift').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}

		// $('.room-chat-tool-scroll').removeClass('room-chat-tool-scroll-disabled');
		$('.room-chat-tool-emoji').removeClass('room-chat-tool-emoji-open');
		$('.room-chat-tool-color').removeClass('room-chat-tool-color-open');
		$('.room-chat-tool-emoji-panel').hide();
		$('.room-chat-tool-color-panel').hide();
		event.stopPropagation();
		var check = $(this).hasClass('room-chat-tool-gift-open')
		if (check) {
			isRefuseGift = false;
			$(this).removeClass('room-chat-tool-gift-open')
			$('.room-chat-tool-gift-forbid-panel').hide();
			$(this).attr('data-tips', '礼品屏蔽');
			var html = "<li class='room-chat-item room-chat-message'><span class='room-chat-content' style='color:red'><span class='room-chat-systems'></span>礼品消息屏蔽已解除</span></li>"
			$('.room-chat-messages').append(html);

		} else {
			isRefuseGift = true;
			$(this).addClass('room-chat-tool-gift-open')
			$('.room-chat-tool-gift-forbid-panel').show();
			$(this).attr('data-tips', '解除礼物屏蔽');
			var html = "<li class='room-chat-item room-chat-message'><span class='room-chat-content' style='color:red'><span class='room-chat-systems'></span>礼品消息已屏蔽</span></li>"
			$('.room-chat-messages').append(html);
		}
	});
	$('.room-chat-tool-emoji').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}
		// $('.room-chat-tool-scroll').removeClass('room-chat-tool-scroll-disabled');
		// $('.room-chat-tool-gift').removeClass('room-chat-tool-gift-open');
		$('.room-chat-tool-color').removeClass('room-chat-tool-color-open');
		$('.room-chat-tool-gift-forbid-panel').hide();
		$('.room-chat-tool-color-panel').hide();
		event.stopPropagation();

		var check = $(this).hasClass('room-chat-tool-emoji-open')
		if (check) {


			$(this).removeClass('room-chat-tool-emoji-open')
			$('.room-chat-tool-emoji-panel').hide();
		} else {

			$(this).addClass('room-chat-tool-emoji-open')
			$('.room-chat-tool-emoji-panel').show();
		}
		faceScrool();
	});
	$('.room-chat-tool-color').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}
		// $('.room-chat-tool-scroll').removeClass('room-chat-tool-scroll-disabled');
		// $('.room-chat-tool-gift').removeClass('room-chat-tool-gift-open');
		$('.room-chat-tool-emoji').removeClass('room-chat-tool-emoji-open');
		$('.room-chat-tool-gift-forbid-panel').hide();
		$('.room-chat-tool-emoji-panel').hide();
		$('.room-chat-tool-color-panel').hide();
		event.stopPropagation();

		var check = $(this).hasClass('room-chat-tool-color-open')
		if (check) {
			$(this).removeClass('room-chat-tool-color-open')
			$('.room-chat-tool-color-panel').hide();

		} else {
			$(this).addClass('room-chat-tool-color-open')
			$('.room-chat-tool-color-panel').show();

		}
	});
	// 礼物操作
	// 显示隐藏
	// var ullength = $('.moveUl').children('li').size();
	// var ys = ullength % 6;
	// $('.blank').width((6 - ys) * 60);
	// $('.moveUl li').click(function(event) {
	// 	$('.gift-info-panel').removeClass('out').show();
	// });
	// $('#gift-content').mouseleave(function(event) {
	// 	$('.gift-info-panel').addClass('out').hide();
	// 	console.log("执行了鼠标移出方法");
	// });
	// $('.control,.blank').mouseover(function(event) {
	// 	$('.gift-info-panel').addClass('out').hide();
	// });
	 
	$(document).on('click', '.lw-items', function() {
		resetData();
		var $this = $(this);
		var index = $this.index();
		if (!index < 7) {
			index = index % 6;
		}
		var nowLeft = '';
		if (index == 5) {
			nowLeft = 90;
			$('.gift-info-panel-arrow1,.gift-info-panel-arrow2,.gift-info-panel-fill').css('left', '76%')
		} else if (index == 4) {
			nowLeft = 90;
			$('.gift-info-panel-arrow1,.gift-info-panel-arrow2,.gift-info-panel-fill').css('left', '60%')
		} else {
			$('.gift-info-panel-arrow1,.gift-info-panel-arrow2,.gift-info-panel-fill').css('left', '50%')
			nowLeft = (-113) + (index * 60)
		}
		$('.gift-info-panel').css('left', nowLeft + 'px');
		// 数据改变
		var id = $this.attr('data-id'),
			name = $this.attr('data-name'),
			bi = $this.attr('data-bi'),
			dec = $this.attr('data-dec'),
			yan = $this.attr('data-yan');
		url = $this.attr('data-img');
		$('.giftsend').attr('data-type', id);
		$('.giftsend').attr('data-giftName', name);
		$('.giftname').text(name);
		$('.giftbi').text(bi);
		$('.giftdec').text(dec);
		$('.giftyan').text(yan);
		$('.giftimg').attr('src', url);
		$('.gift-info-panel').removeClass('out').show();
	})
	// 礼物点击弹出框
	$(".infoRight li").mouseover(function(e) {
		var id = $(this).attr('data-id') ;
	    $(".giftName").text($(this).data("name"));
	    $(".giftBi").text($(this).data("bi"));
	    $(".giftDec").text($(this).data("dec"));
	    $(".giftExc span").text($(this).data("yan"));
	    $(".giftL img").attr("src", $(this).data("img"));
	    $('.giftsend').attr('data-type', id);
	    var _index = $(this).index();
	    gmr = -151+_index*60;
	    tmr = 0;
	    if(gmr>54){
	    	gmr = 54;
	    	tmr = 35+(_index-4)*60;
	    }
	    $(".giftInfo").stop().animate({marginLeft:gmr+"px"},200);
	    $(".triangleDown").stop().animate({marginLeft:tmr+"px"},200);
	    $(".giftInfo").show();
	})
	$(".infoRight").mouseleave(function(e) {
	    var e = e || window.event ;
	    e.stopPropagation() ;
	    $(".giftInfo").hide();
	    $('.giftB a').removeClass('active') ;
	    $('.giftR input[type="text"]').val(1) ;
	});
	$(document).on('click','.giftB a',function(e){
	    
	    var num = $(this).text();
	    //alert(num)
	    $(this).addClass('active').siblings('a').removeClass('active') ;
	    $('.giftR input[type="text"]').val(num) ;
	})
	//关闭礼物弹窗
	$(document).on('click','.giftClose',function(){
		$('.gift-info-panel').addClass('out').hide();
	});
		// 金币选择
	$('.giftnum').click(function(event) {
		resetData();
		$('.giftnum').removeClass('cur');
		$(this).addClass('cur');
		var val = $(this).attr('data-gift-number');
		$('#giftval').val(val);
	});
	// 连送功能
	var giftContinue = "";
	var giftConTime = 0;
	var giftTolTime = 2000;

	function giftConFn() {
		giftConTime += 50;
		var el = $('.giftsend span.process')
		if (giftConTime >= giftTolTime) {
			el.css('width', '100%');

			var giftType = $('.giftsend').attr('data-type'),
				giftromm = $('.giftsend').attr('data-room'),
				giftName = $('.giftsend').attr('data-giftname'),
				giftNum = parseInt($.trim($('#giftval').val())),
				group = parseInt($('.giftsend').attr('data-group'));
				//flash = getSWF('moveflash');
			if (group > 1) {
				/*flash.sendGiftMessages({
					giftId: giftType,
					giftName: giftName,
					giftNum: giftNum,
					giftGroup: group,
					isRunning: true
				})*/
			}
			timeRest();
		} else {
			var rate = (((giftConTime / giftTolTime).toFixed(2)) * 100) + '%';
			el.css('width', rate);
		}
	}
	// 判断是否开启连送
	function isOpenSend() {
		var num = $('.giftsend').attr('data-click')
		if (num == 1) {
			return true;
		} else {
			return false;
		}
	}
	// 时间函数复位
	function timeRest() {
		$('.giftsend .lainsong').hide().addClass('out');
		$('.giftsend .lainsong .double-num').text(0);
		$('.giftsend').attr('data-click', 1);
		$('.giftsend').attr('data-group', 0);
		$('.giftsend').attr('data-giftName', '');
		giftConTime = 0;
		clearInterval(giftContinue);
		$('.giftsend .process').css('width', '0%');
	}
	// 复位
	function resetData() {
		$('.giftnum').removeClass('cur');
		$('#giftval').val(1);
		$('.error').hide();
		timeRest();
	}
	// 发送赠送礼物请求
	$('.giftsend').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();			
			return false;
		}
		//取消绑定
		$('#gift-content').unbind("mouseleave");
		// 防止重复点击
		var check = isOpenSend();
		/*if (!videoStatus) {
			layer.tips('服务器没有连接成功', '#giftval', {
				tips: 1,
				time: 2000
			});
			return false;
		}*/
		if (check/* && videoStatus*/) {
			$('.giftsend').attr('data-click', 0);
			var giftType = $(this).attr('data-type'),
				giftroom = $(this).attr('data-room'),
				giftName = $(this).attr('data-giftname'),
				giftNum = $('#giftval').val(),
				acd = $(this).attr('data-acd');
				//alert(giftroom)
			if (giftNum == "" || isNaN(giftNum)) {
				giftNum = parseInt($.trim($('#giftval').val()));
				layer.tips('请输入数字', '#giftval', {
					tips: 1,
					time: 2000
				});
				return false;
			} else {
                var nowGroup = parseInt($('.giftsend').attr('data-group'));
                $('.giftsend').attr('data-group', nowGroup + 1);
                var group = parseInt($('.giftsend').attr('data-group'));
				jsonAjax("post", "/user/give/gift", {
					giftId: giftType,
					roomId: giftroom,
                    giftGroup: group,
					giftNum: giftNum,
					acd: acd 
				}, "json", function(data) {
					$('.giftsend').attr('data-click', 1);
					console.log(data) ;
					/*if (data.code == 0) {
						//重新绑定
						$('#gift-content').mouseleave(function(event) {
							$('.gift-info-panel').addClass('out').hide();
						});
						//隐藏送礼物
						$('.wrap_lw').hide();
						//更新金豆显示
						if (data.type == 1) {
							$("#dou_label").text(data.balance_dou);
						}
						//更新金币显示
						if (data.type == 2) {
							$("#gold_label").text(data.balance_gold);
						}
						// 发送广播
						clearInterval(giftContinue);
						giftConTime = 0;
						giftContinue = setInterval(giftConFn, 50);
						// var nowGroup = parseInt($('.giftsend').attr('data-group'));
						// $('.giftsend').attr('data-group', nowGroup + 1);
						var giftType = $('.giftsend').attr('data-type'),
							giftromm = $('.giftsend').attr('data-room'),
							giftName = $('.giftsend').attr('data-giftname'),
							giftNum = parseInt($.trim($('#giftval').val())),
							// group = parseInt($('.giftsend').attr('data-group')),
							flash = getSWF('moveflash');
						if (group > 1) {
							$('.giftsend .lainsong').addClass('out');
							$('.giftsend .lainsong .double-num').text(group);
							$('.giftsend .lainsong').show().removeClass('out');
						}
						flash.sendGiftMessages({
								giftId: data.giftId,
								giftName: data.giftName,
								giftNum: data.giftNum,
								giftGroup: group,
								isRunning: false
							})
							// 主播下线
					} else if (data.code == 5) {
						layer.tips('主播已离线，无法赠送礼物！', '#giftval', {
							tips: 1,
							time: 2000
						});
						return false;
						// 用户未登录
					} else if (data.code == 3) {
						$("#login_a").click();
						return false;
					} else if (data.code == 7) {
						timeRest();
						layer.confirm('金币不足，前往充值？', {
							btn: ['前往', '放弃'] //按钮
						}, function() {
							var url = $('.playbutton').attr('href');
							window.open(url)
						}, function() {
							layer.closeAll();
						});
						return false;
					} else {
						timeRest();
						layer.alert(data.msg);
						return false;
					}*/
				});
			}
		}
		event.stopPropagation();
	});
	$('#giftval').on('input change', function() {
		timeRest();
		var giftNum = $(this).val();
		$('.giftnum').removeClass('cur')
		if (giftNum == "" || isNaN(giftNum)) {
			layer.tips('请输入数字', '#giftval', {
				tips: 1,
				time: 2000
			});
			return false;
		} else {
			layer.closeAll()
		}

		if(giftNum>1314){
			$(this).val(1314)
		}
	})
	// 滚动到可视
	//var toTop = $('#js-room-video').offset().top;
	//$('.list-container').scrollTop(toTop);
	
	/**
	 *
	 * @type {[type]}
	 */
	/*var mul = $('.moveUl');
	$(document).on('click', '.g-img-pre', function() {
		var lastEl = mul.find('li').last().remove();
		mul.prepend(lastEl)
	})
	$(document).on('click', '.g-img-next', function() {
		var firstEl = mul.find('li:eq(0)').remove()
		mul.append(firstEl)
	})*/
	// 表情区域防止冒泡
	$('.room-chat-tool-emoji-panel').click(function(event) {
		event.stopPropagation();
	});
	// 默认表情和vip表情互换
	$('.defalut').click(function(event) {
		$('.room-chat-tool-emoji-group div').removeClass('active');
		$(this).addClass('active');
		$('.hlly-emoji-panel').hide();
		$('.emoji-defalut').show();
		faceScrool();
	});

	$('.vip').click(function(event) {
		// videoUserVip ${videogameweb_user_key.vip}
		if (videoUserVip != "" && videoUserVip != 0) {
			$('.room-chat-tool-emoji-group div').removeClass('active');
			$(this).addClass('active');
			$('.hlly-emoji-panel').hide();
			$('.emoji-vip').show();
			faceScrool();
		} else {
			layer.tips('达到VIP等级可以解锁', '.room-chat-tool-emoji-group .vip', {
				tips: 1,
				time: 2000
			});
		}
	});
	//滚动条
	//veidoScrool();
	//chatScrool();
	//privateChatScrool();
	//startInterval();
	setTimeout(function(){
		$('.qiuguanzhu').show();
	},40000) ;
	var checkSiez=$('.qiuguanzhu').size();
	if(checkSiez>0){
		setTimeout(function(){
			$('.songliwu').show();
		},50000)
	}else{
		setTimeout(function(){
			$('.songliwu').show();
		},40000)
	}

	setTimeout(function(){
		$('.qiuguanzhu').hide();
		$('.songliwu').hide();
	},60000)

	$('.closefong').on('click',function(){
		$('.qiuguanzhu').hide()
	})
	$('.closeSong').on('click',function(){
		$('.songliwu').hide()
	})
});

//每隔5秒刷新房间和队列数据
/*function startInterval() {
	var href = location.href;
	var roomId = href.substring(href.indexOf('-') + 1, href.lastIndexOf('.'));
	setInterval(function() {
		jsonAjax("get", path + "/anchorroomvideo/getQueueData", {
			roomId: roomId
		}, "json", function(data) {
			$('#actorNo').text(data.actorNo);
			$('#queueNo').text(data.queueNo);
			$('#lookNo').text(data.lookNo);
		});
	}, 60000);
}*/


