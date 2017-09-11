// 改变状态
var userId = "";
var videoFor = 0;
var videoStatus = false;
var videoUserType = "";
var videoUserName = $('.user-middle-name').text();
var videoUserTargetName = "";
var videoUserId = "";
var videoUserGrade = "";
var videoUserVip = '';
var chatRoomUser = {};
var isShutUp = false;
var isRefuseGift = false;
var setPayTime = 6000;
var bannerTime1,
	bannerTime2,
	bannerTime3,
	btime1 = setPayTime,
	btime2 = setPayTime,
	btime3 = setPayTime,
	nowTime1 = 0,
	nowTime2 = 0,
	nowTime3 = 0;
var chatFontColor = "";
// 屏蔽用户列表
var hideUserList = {};
var chatWordNum = 0;
var chatIntervalTime = 5000;
var timeArr;
// 增加用户
function addUser(key, name) {
	if (!chatRoomUser[name]) {
		chatRoomUser[name] = key;
	}
}
//视频私聊
function flashSiLiao(name) {
	var text = '@' + name + ' ';
	$('.room-chat-texta').val(text)
 
}

function videoPingBi(o) {
	var id = o.actorId;
	var name = o.userName;
	var hasPin = hideUserList[id];
	if (!hasPin) {
		$('.room-chat-com' + id).find('.chat-pbyh').addClass('chat-pbxx').text(i18nValueJson.web_page_jcpb);//'"+i18nValueJson.web_page_nyd+"'
		$('.room-chat-com' + id).find('.chat-siyh').remove();
		var nocticeHtml = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_nyd+"<span style='color:#ff66ff'>" + name + "</span>屏蔽</li>"
		$('.room-chat-messages').append(nocticeHtml);
		if (!hideUserList[id]) {
			hideUserList[id] = true;
		} else {
			hideUserList[id] = true;
		}
	} else {
		$('.room-chat-com' + id).find('.chat-pbyh').removeClass('chat-pbxx').text(i18nValueJson.web_page_slyh);
		$('.room-chat-com' + id).find('.chat-pbyh').parent().append("<li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>");
		var nocticeHtml = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_nyd+"<span style='color:#ff66ff'>" + name + "</span>"+i18nValueJson.web_page_jcpb+"</li>"
		$('.room-chat-messages').append(nocticeHtml);
		hideUserList[id] = false;
	}
	$('.room-chat-user-info').hide();
}
// 监听聊天条数,删除超过的条数
function lisenChatIteams() {
	var el = $('.room-chat-messages'),
		childEl = el.find('.room-chat-message'),
		count = childEl.size(),
		cut = 350;
	if (count > cut) {
		var delCount = count - cut;
		for (var i = 0; i < delCount; i++) {
			childEl.eq(i).remove();
		}
	}
	chatScrool();
}
// 判断是否进入私聊
function isPrivateChat(str) {
	var reg = /^@([^\s]+)?\s/g;
	var check = reg.test(str);
	return check;
}
// 获取私聊名字
function getPrivateUserId(str) {
	var reg = /^@([^\s]+)?\s/g;
	var check = isPrivateChat(str);
	if (check) {
		var newstr = reg.exec(str);
		videoUserTargetName = newstr[1]
		return newstr[1];
	}
}
// 获取私聊内容
function getPrivateChatContext(str) {
	var regexp = /^@([^\s]+)?\s/g;
	return str.replace(regexp, '');
}
// 私聊滚动条
function privateChatScrool() {
	var $scrollbarFace = $(".scrollbarPrivateChat");
	$scrollbarFace.tinyscrollbar();
	var scrollbarFace = $scrollbarFace.data("plugin_tinyscrollbar");
	scrollbarFace.update('bottom');
}
// 接收系统消息
function systemMsg(data) {
	var msg = data.msg;
	console.log(data);
	var regexp = /\\?\{([^{}]+)\}/;
	r = regexp.exec(data.msg);
	if (r) {
		var stringObj = JSON.parse(r[0]);
		var num = stringObj.num;
		var name = stringObj.name;
		if (num) {
			var nameHtml = i18nValueJson.web_page_gx+"<span class='room-chat-user-name'>" + name + "</span>获得<span style='color:red;font-size:13px'>" + num + "</span>金豆"
			msg = nameHtml;
			var html = "<li class='room-chat-item room-chat-message room-chat-com" + id + "'  room-chat-com='" + id + "'  style='color:red;font-size:13px'><span class='room-chat-systems'></span>" + msg + "</li>";
			$('.room-chat-messages').append(html)
		} else {
			var id = stringObj.ID;
			var userType = stringObj.userType;
			var imgUrlTmp = stringObj.imgUrl;
			var imgUrl='';
			var imgIndex;
			if(imgUrlTmp){
                  imgIndex=imgUrlTmp.indexOf("|")+1; 
                  imgUrl = imageUrl+imgUrlTmp.substring(imgIndex,imgUrlTmp.length);
                  console.log(imgUrl);

			}else{
				imgUrl=getRootPath() + '/views/static/img/tou.png';
			}
			// var imgUrl = imgUrlTmp.indexOf("|") != -1 && imgUrlTmp != null ? systemImgUrl + imgUrlTmp.substring(imgUrlTmp.lastIndexOf("|") + 1) : getRootPath() + '/views/static/img/tou.png';
			var chatTarUserId = stringObj.userId;
			var conHtml = getControlHtml(id, userType, chatTarUserId);
			var grade = stringObj.grade;
			var vipGade = stringObj.vipGade;
			if (vipGade > 0) {
				var userTypeHtml ="";

                if(userType >0){
                	if(userType >1){
                		// userTypeHtml="<span class='room-chat-user-admin2'>管</span>"
                		userTypeHtml="<span class='room-chat-user-admin2'></span>"
                	}else{
                		// userTypeHtml="<span class='room-chat-user-admin'>管</span>"
                		userTypeHtml="<span class='room-chat-user-admin'></span>"
                	}
                }


				var gradeHtml = grade > 0 ? "<span class='room-chat-user-grade  room-chat-user-grade"+grade+"'></span>" : "";
				var icoguan = vipGade > 0 ? "<span class='room-chat-user-vipGade  room-chat-user-vipGade"+vipGade+"'></span>" : "";
				var userInfoHtml = "<div class='room-chat-user-info'><div class='layerclose'>×</div><div class='room-chat-user-info-top'><div class='imgs'><img src='" + imgUrl + "' alt=''></div><div class='infos'><div class='infos-userName'>" + name + "</div>" + gradeHtml + vipGadeHtml + "</div></div><div class='room-chat-user-info-bottom'><ul>" + conHtml + "</ul><div class='clearb'></div></div></div>"
				var nameHtml = "<span class='room-chat-user-name'>" + name + userInfoHtml + "</span>"
				var replaceHtml = userTypeHtml + vipGadeHtml + gradeHtml + nameHtml;
				msg = msg.replace(regexp, replaceHtml);
				var html = "<li class='room-chat-item room-chat-message room-chat-com" + id + "'  room-chat-com='" + id + "'  style='color:red;font-size:13px'><span class='room-chat-systems'></span>" + msg + "</li>";
				$('.room-chat-messages').append(html);
			}
		}
	} else {
		msg = msg;
		var html = "<li class='room-chat-item room-chat-message room-chat-com" + id + "'  room-chat-com='" + id + "'  style='color:red;font-size:13px'><span class='room-chat-systems'></span>" + msg + "</li>";
		$('.room-chat-messages').append(html)
	}
	lisenChatIteams()
}
// 禁言倒计时
function forbiTimeCount(chatIntervalTime) {
	isChatOpen = false;
	$('.room-chat-send').addClass('room-chat-disable')
	var timeTextBack = parseInt(chatIntervalTime);
	$('.room-chat-send').html("<span class='timeText'>" + timeTextBack + "</span>秒")
	liftTimeLimit(chatIntervalTime * 1000);
}
// 获取禁言消息
function forbidCallBack(data) {
	var id = data.actorId;
	var time = data.forbidTime;
	if (data.actorId == videoUserId) {
		clearInterval(liftTimeLimitArg);
		$('.room-chat-send').html('');
		liftTimeEach = 0;
		if (time > 0) {
			$('.room-chat-texta').attr('disabled', 'disabled');
			$('.room-chat-texta').attr('placeholder', i18nValueJson.web_page_nybjy);
			forbiTimeCount(data.forbidTime);
			isShutUp = true;
		} else {
			clearInterval(liftTimeLimitArg);
			isShutUp = false;
			isChatOpen = true;
			$('.room-chat-texta').removeAttr('disabled');
			$('.room-chat-texta').attr('placeholder', i18nValueJson.web_page_zlsrlt);
			$('.room-chat-send').removeClass('room-chat-disable').html(i18nValueJson.web_fs);
			isShutUp = false;
			isChatOpen = true;
			liftTimeEach = 0;
		}
	}
	if (time > 0) {
		if (data.name) {
			var html = "<li class='room-chat-item room-chat-message' ><span class='room-chat-systems'></span><span class='room-chat-user-name'>" + data.name + "</span><span style='color:red;font-size:13px'>:"+i18nValueJson.web_page_bjy + (time / 60) + "分钟</span></li>"
			$('.room-chat-messages').append(html)
			$('.room-chat-com' + id).find('.chat-yhjy').addClass('chat-jcjy').text('解除禁言');
		}

	} else {
		if (data.name) {
			var html = "<li class='room-chat-item room-chat-message' ><span class='room-chat-systems'></span><span class='room-chat-user-name'>" + data.name + "</span><span style='color:red;font-size:13px'>:"+i18nValueJson.web_page_jcjy+"</span></li>"
			$('.room-chat-messages').append(html)
			$('.room-chat-com' + id).find('.chat-yhjy').removeClass('chat-jcjy').text(i18nValueJson.web_page_yhjy);
		}

	}
	lisenChatIteams()
}
// 获取提升消息
function promoteCallBack(data) {
	if (data.actorId == videoUserId) {
		if (data.type == 1) {
			var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_ntswgl+"</li>"
			$('.room-chat-messages').append(html);
			videoUserType = 1;
			chatWordNum = 300;
			chatIntervalTime = 0;
			$('.room-chat-texta').attr({
				'maxlength': 300
			});
			$('.room-chat-com' + data.actorId).find('.chat-guanli').addClass('chat-jcgl').removeClass('chat-tsyh').text(i18nValueJson.web_page_JCGL);
			var el = $('.room-chat-com' + data.actorId);
			var one = el.find('.room-chat-user-vipGade');
			var two = el.find('.room-chat-user-grade');
			var three = el.find('.room-chat-user-name');
			// var addHtml = "<span class='room-chat-user-admin'>管</span>"
			var addHtml = "<span class='room-chat-user-admin'></span>";
			if (one.size()) {
				one.before(addHtml);
			} else if (two.size()) {
				two.before(addHtml);
			} else if (three.size()) {
				three.before(addHtml);
			}
			$('.room-chat-item').each(function(index, el) {
				var el = $(this).find('.room-chat-user-info');
				var html = "<li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>";
				el.find('.room-chat-user-info-bottom ul').append(html);
			});
			$('.room-chat-item').each(function(index, el) {
				var check = $(this).find('.room-chat-user-admin').size();
				if (check > 0) {
					$(this).find('.chat-yhjy').remove();
				}
			});
			$('.room-chat-com' + data.actorId).find('.chat-yhjy').remove();
		} else if (data.type == 2) {
			videoUserType = 0;
			if (videoUserVip && videoUserVip != "" && videoUserVip != 0) {
				// 可发送的字数
				chatWordNum = getWordNum('vip', videoUserVip);
				// 解除时间限制的时间
				chatIntervalTime = getSendTime('vip', videoUserVip);
			} else {
				chatWordNum = getWordNum('others', videoUserGrade);
				chatIntervalTime = getSendTime('others', videoUserGrade);
			}
			$('.room-chat-texta').attr({
				'maxlength': chatWordNum
			});
			var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_nbjcgl+"</li>"
			$('.room-chat-messages').append(html);
			$('.room-chat-com' + data.actorId).find('.chat-guanli').removeClass('chat-jcgl').addClass('chat-tsyh').text('提升管理');
			$('.room-chat-com' + data.actorId).find('.room-chat-user-admin').remove();
			$('.room-chat-message').each(function(index, el) {
				var el = $(this).find('.room-chat-user-info');
				var check = el.hasClass('room-chat-user-admin');
				if (!check) {
					var html = "<li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>";
					el.find('.room-chat-user-info-bottom ul').find('.chat-yhjy').remove();
				}
			});
		}
	} else {
		var name = data.userName;
		if (data.type == 1) {
			var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span><span class='room-chat-user-name'>" + name + "</span>被提升为管理</li>"
			$('.room-chat-messages').append(html)
			$('.room-chat-com' + data.actorId).find('.chat-guanli').addClass('chat-jcgl').removeClass('chat-tsyh').text(i18nValueJson.web_page_JCGL);
			$('.room-chat-com' + data.actorId).find('.chat-yhjy').remove();
			var el = $('.room-chat-com' + data.actorId);
			var one = el.find('.room-chat-user-vipGade');
			var two = el.find('.room-chat-user-grade');
			var three = el.find('.room-chat-user-name');
			// var addHtml = "<span class='room-chat-user-admin'>管</span>"
			var addHtml = "<span class='room-chat-user-admin'></span>";
			if (one.size()) {
				one.before(addHtml);
			} else if (two.size()) {
				two.before(addHtml);
			} else if (three.size()) {
				three.before(addHtml);
			}
			if (videoUserType > 1) {
				var html = "<li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>";
				$('.room-chat-com' + data.actorId).find('.room-chat-user-info-bottom ul').append(html);
			}
		} else if (data.type == 2) {
			var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span><span class='room-chat-user-name'>" + name + "</span>被解除管理</li>"
			$('.room-chat-messages').append(html)
			$('.room-chat-com' + data.actorId).find('.chat-guanli').removeClass('chat-jcgl').addClass('chat-tsyh').text('提升管理');
			$('.room-chat-com' + data.actorId).find('.room-chat-user-admin').remove();
			// if (videoUserType > 1) {
			// 	var html = "<li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>";
			// 	$('.room-chat-com' + data.actorId).find('.room-chat-user-info-bottom ul').append(html);
			// }
		}
	}
	lisenChatIteams()
}
// 全服广播
// 获取礼物消息
function getGiftMessages(data) {
	if (!isRefuseGift) {
		var id = data.id;
		//		var imgUrl = data.imgUrl ? data.imgUrl : getRootPath() + '/views/static/img/tou.png';
		var imgUrlTmp = data.imgUrl;
		var imgUrl='';
		var imgIndex;
			if(imgUrlTmp){
                  imgIndex=imgUrlTmp.indexOf("|")+1; 
                  imgUrl = imageUrl+imgUrlTmp.substring(imgIndex,imgUrlTmp.length);
                  console.log(imgUrl);
			}else{
				imgUrl=getRootPath() + '/views/static/img/tou.png';
			}
		var giftid = data.giftId;
		var giftName = data.giftName;
		var giftNum = data.giftNum;
		var giftGroup = data.giftGroup;
		var isRunning = data.isRunning;
		var userType = data.userType;
		var userName = data.name;
		var userGrade = data.grade;
		var userVipGade = data.vipLevel;
		var tolNum = giftGroup * giftNum;
		var chatUserId = data.userId;
		var chatTarUserId = data.tarUserId;
		var giftMinPng = $('#gift' + giftid).attr('data-min-img');
        var userTypeHtml='';
		if(userType>0){
			if(userType>1){
                // var userTypeHtml="<span class='room-chat-user-admin2'>管</span>";
                var userTypeHtml="<span class='room-chat-user-admin2'></span>";
			}else{
				// var userTypeHtml ="<span class='room-chat-user-admin'>管</span>";
				var userTypeHtml ="<span class='room-chat-user-admin'></span>";
			}
		}
		
		
		var gradeHtml = userGrade > 0 ? "<span class='room-chat-user-grade  room-chat-user-grade"+userGrade+"'></span>" : "";
		
		var vipGadeHtml = userVipGade > 0 ?"<span class='room-chat-user-vipGade  room-chat-user-vipGade"+userVipGade+"'></span>": "";
		// var str = "<span style='color:red;font-size:13px'>"+i18nValueJson.web_page_zszb+"<i class='icon-hlly-emoji icon-hlly-guangbo-" + giftid + "'></i>×" + giftNum + "</span>"
		var str = "<span style='color:#ffc600;font-size:13px'>"+i18nValueJson.web_page_zszb+"<img class='giftMinPng' src='" + giftMinPng + "'>×" + giftNum + "</span>"
		var html = "";
		var contrhtml = getControlHtml(id, userType, chatUserId);
		var userInfoHtml = "<div class='room-chat-user-info'><div class='layerclose'>×</div><div class='room-chat-user-info-top'><div class='imgs'><img src='" + imgUrl + "' alt=''></div><div class='infos'> <div class='infos-userName'>" + userName + "</div>" + userTypeHtml + vipGadeHtml + gradeHtml + "</div></div><div class='room-chat-user-info-bottom'><ul>" + contrhtml + "</ul><div class='clearb'></div></div></div>"
		if (!isRunning) {
			html = "<li room-chat-com='" + id + "' class=\"room-chat-item room-chat-message room-chat-com" + id + "  \">" + userTypeHtml + vipGadeHtml + gradeHtml + "<span class=\"room-chat-user-name\">" + userName + userInfoHtml + "</span><span class=\"room-chat-content\">" + str + "</span></li>";
			$('.room-chat-messages').append(html);
		} else {
			str = "<span style='color:#ffc600;font-size:13px'>"+i18nValueJson.web_page_hqlt+"<img class='giftMinPng' src='" + giftMinPng + "'>×" + giftNum + "×" + giftGroup + "组</span>"
			html = "<li room-chat-com='" + id + "' class=\"room-chat-item room-chat-message room-chat-com" + id + "  \"><span style='color:#ffc600'>["+i18nValueJson.web_page_zslw+"]</span>" + userTypeHtml + vipGadeHtml + gradeHtml + "<span class=\"room-chat-user-name\">" + userName + userInfoHtml + "</span><span class=\"room-chat-content\">" + str + "</span></li>";
			$('.room-chat-messages').append(html);
		}
		// 横幅显示
		// 计算送出的值
		var countMoneyEl = $('#gift' + giftid),
			eachJinBi = Number(countMoneyEl.attr('data-jinbi')),
			eachJinDou = Number(countMoneyEl.attr('data-jindou')),
			eachJinYan = Number(countMoneyEl.attr('data-yan')),
			totalValue = 0;
		eachValue = 0;
		if (eachJinBi > 0) {
			totalValue = (tolNum * eachJinBi) / 100;
			eachValue = (giftNum * eachJinBi) / 100;
		} else if (eachJinDou > 0) {
			totalValue = (tolNum * eachJinDou) / 10000;
			eachValue = (giftNum * eachJinDou) / 10000;
		} else if (eachJinYan > 0) {
			totalValue = (tolNum * eachJinYan) / 50;
			eachValue = (giftNum * eachJinYan) / 50;
		}
		if (eachValue >= 1) {
			var elId = ComparisonScore(totalValue, userName);
			showBanner(giftid, userName, giftName, giftNum, giftGroup, elId, totalValue);
		}
		lisenChatIteams()
	}
}
// 返回横幅显示元素
function ComparisonScore(scroe, name) {
	var el = $('.room-chat-box-ani');
	var targetEl = "";
	var elGroup = [];
	var isCompar = false;
	// 判断是否有空位置
	el.each(function(index, el) {
		var $this = $(this),
			has = $this.hasClass('bounceInLeft'),
			comparName = $this.attr('data-name'),
			id = $this.attr('data-id');
		if (!has) {
			targetEl = id;
			return false;
		} else {
			if (comparName == name) {
				targetEl = id;
				if (targetEl == 1) {
					btime1 = setPayTime;
				} else if (targetEl == 2) {
					btime2 = setPayTime;
				} else if (targetEl == 3) {
					btime3 = setPayTime;
				}
				return false;
			}
			elGroup.push(id);
			isCompar = true;
		}
	});
	//进行比较
	if (isCompar) {
		var length = elGroup.length;
		for (var i = 0; i < length; i++) {
			var comparEl = $('.box-ani' + elGroup[i]);
			var compareScroe = Number(comparEl.attr('data-scroe'));
			if (scroe > compareScroe) {
				targetEl = elGroup[i];
				if (targetEl == 1) {
					clearInterval(bannerTime1);
					btime1 = setPayTime;
					$('.box-ani' + 1).removeClass('bounceInLeft').addClass('bounceOutRight').attr({
						'data-scroe': '',
						'data-name': ''
					}).hide();
				} else if (targetEl == 2) {
					clearInterval(bannerTime2);
					btime2 = setPayTime;
					$('.box-ani' + 2).removeClass('bounceInLeft').addClass('bounceOutRight').attr({
						'data-scroe': '',
						'data-name': ''
					}).hide();
				} else if (targetEl == 3) {
					clearInterval(bannerTime3);
					btime3 = setPayTime;
					$('.box-ani' + 3).removeClass('bounceInLeft').addClass('bounceOutRight').attr({
						'data-scroe': '',
						'data-name': ''
					}).hide();
				}
				return targetEl;
			}
		}
	}
	return targetEl;
}
// 横幅显示功能
function showBanner(giftid, userName, giftName, giftNum, giftGroup, id, scroe) {
	var eachTime = 1000;
	var el = $('.box-ani' + id);
	var nowName = el.attr('data-name');
	var nowId = el.attr('data-id');
	var imgSrc = $('#gift' + giftid).attr('data-img');
	var imgHtml = "<div class='room-chat-box-ani-img-bg " + giftid + "'><img style='width:100%;height:100%' src='" + imgSrc + "'></div>"
	el.find('.room-chat-box-ani-img').html(imgHtml);
	el.find('.room-chat-box-ani-message').find('.name').text(userName);
	el.find('.room-gift-mayname').text(giftName);
	el.find('.room-gift-group').text(giftNum);
	var giftHtmlX = "<span class='icon-chat-num icon-chat-numx'></span>"
	var giftStr = giftGroup + '';
	giftStr = $.trim(giftStr);
	var giftSingleHtml = "";
	for (var i = 0; i < giftStr.length; i++) {
		giftSingleHtml += "<span class='icon-chat-num icon-chat-num" + giftStr[i] + "'></span>"
	}
	el.find('.room-chat-box-ani-message').find('.num').html(giftHtmlX + giftSingleHtml);
	el.show().removeClass('bounceOutRight').addClass('bounceInLeft').attr({
		'data-scroe': scroe,
		'data-name': userName
	});
	if (id == 1) {
		clearInterval(bannerTime1);
		bannerTime1 = setInterval(function() {
			btime1 = btime1 - eachTime;
			if (btime1 <= 0) {
				clearInterval(bannerTime1);
				btime1 = setPayTime;
				el.removeClass('bounceInLeft').addClass('bounceOutRight').attr({
					'data-scroe': '',
					'data-name': ''
				}).hide();
			}
		}, eachTime)
	} else if (id == 2) {
		clearInterval(bannerTime2);
		bannerTime2 = setInterval(function() {
			btime2 = btime2 - eachTime;
			if (btime2 <= 0) {
				clearInterval(bannerTime2);
				btime2 = setPayTime;
				el.removeClass('bounceInLeft').addClass('bounceOutRight').attr({
					'data-scroe': '',
					'data-name': ''
				}).hide();
			}
		}, eachTime)
	} else if (id == 3) {
		clearInterval(bannerTime3);
		bannerTime3 = setInterval(function() {
			btime3 = btime3 - eachTime;
			if (btime3 <= 0) {
				clearInterval(bannerTime3);
				btime3 = setPayTime;
				el.removeClass('bounceInLeft').addClass('bounceOutRight').attr({
					'data-scroe': '',
					'data-name': ''
				}).hide();
			}
		}, eachTime)
	}
}
// 聊天处理
var compareText = "";
var checkContextTime = 0;
//聊天滚动条
function chatScrool() {
	var $scrollbarChat = $(".scrollbarChat");
	$scrollbarChat.tinyscrollbar();
	var check = $('.room-chat-tool-scroll').hasClass('room-chat-tool-scroll-disabled')
	var scrollbarChat = $scrollbarChat.data("plugin_tinyscrollbar");
	if (!check) {
		scrollbarChat.update('bottom');
	} else {
		scrollbarChat.update('relative');
	}
}
// 
// 接收消息
// 接收字符转义(表情)
function getSubstitute(str) {
	var nowStr = str.replace(/\[\:([^\]]+)?\]/g, function(match, name) {
		console.log(emoji);
		if (emoji[name]) {
			return "<i class='icon-hlly-emoji icon-hlly-emoji-" + emoji[name] + "'></i>";
		} else {
			var str = match;
			var length = match.length;
			if (length > chatWordNum) {
				return false;
			} else {
				return match;
			}
		}
	});
	return nowStr;
}

function getControlHtml(id, userType, chatTarUserId) {
	var controlHtml = "";
	if (videoUserId == id) {
		controlHtml = "";
	} else {
		// 如果是管理员
		if (videoUserType > 0) {
			// 比较管理员等级
			if (userType > 0) {
				if (videoUserType > userType) {
					controlHtml = "<li class='chat-jbyh' data-id='" + chatTarUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li><li class='chat-guanli chat-jcgl'>"+i18nValueJson.web_page_JCGL+"</li>"
				} else {
					controlHtml = "<li class='chat-jbyh' data-id='" + chatTarUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
				}
			} else {
				if (videoUserType > 1) {
					controlHtml = "<li class='chat-jbyh'  data-id='" + chatTarUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li><li class='chat-guanli chat-tsyh'>提升管理</li>"
				} else {
					controlHtml = "<li class='chat-jbyh'  data-id='" + chatTarUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>"
				}
			}
			// 如果是普通用户
		} else {
			// 如果进了的是管理员
			if (userType > 0) {
				controlHtml = "<li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
			} else {
				// 如果进了普通用户
				controlHtml = "<li class='chat-jbyh'  data-id='" + chatTarUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-jwhy'  data-id='" + chatTarUserId + "'>加为好友</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
			}
		}
	}
	return controlHtml;
}

function getChatMessages(data) {
	
	if (data.error) {
		if (data.channel == 2) {
			var html = "<li class=\"room-chat-item room-chat-message\"  style=\"color:red\">" + data.error + "</li>";
			$('#privateChatPlace').append(html);
		}
	}
	var id = data.id;
	var chatUserId = data.userId;
	var chatTarUserId = data.tarUserId;
	var tarId = data.tarId;
	var message = data.message;
	var colorFonts = data.fontColor;
	var chatType = data.chatType;
	var grade = data.grade;
	var name = data.name;
	var tarName = data.tarName;
	var userType = data.userType;
	var tarUserType = data.tarUserType;
	var tarGrade = data.tarGrade;
	var vipGade = data.vipGade;
	var tarVipGade = data.tarVipGade;
	//	var imgUrl = data.imgUrl ? data.imgUrl : getRootPath() + '/views/static/img/tou.png';
	var imgUrlTmp = data.imgUrl;
	var imgUrlTarTmp = data.tarImgUrl;
	var imgUrl='';
	var imgIndex;
			if(imgUrlTmp){
                  imgIndex=imgUrlTmp.indexOf("|")+1; 
                  imgUrl = imageUrl+imgUrlTmp.substring(imgIndex,imgUrlTmp.length);
                  console.log(imgUrl);
			}else{
				imgUrl=getRootPath() + '/views/static/img/tou.png';
			}
	var tarImgUrl='';
			if(imgUrlTarTmp){
                  tarImgUrl=getRootPath()+"/"+imgUrlTarTmp.split("|")[0]; 
			}else{
				tarImgUrl=getRootPath() + '/views/static/img/tou.png';
			}
	var userTypeHtml = "";
    
   
		if(userType>0){
			if(userType>1){
                // var userTypeHtml="<span class='room-chat-user-admin2'>管</span>";
                var userTypeHtml="<span class='room-chat-user-admin2'></span>";
			}else{
				// var userTypeHtml ="<span class='room-chat-user-admin'>管</span>";
				var userTypeHtml ="<span class='room-chat-user-admin'></span>";
			}
		}



	var gradeHtml = grade > 0 ? "<span class='room-chat-user-grade  room-chat-user-grade"+grade+"'></span>" : "";
	var vipGadeHtml = vipGade > 0 ? "<span class='room-chat-user-vipGade  room-chat-user-vipGade"+vipGade+"'></span>" : "";
	var tarUserTypeHtml = "";
    
    
		if(tarUserType>0){
			if(tarUserType>1){
                // var tarUserTypeHtml="<span class='room-chat-user-admin2'>管</span>";
                var tarUserTypeHtml="<span class='room-chat-user-admin2'></span>";
			}else{
				// var tarUserTypeHtml ="<span class='room-chat-user-admin'>管</span>";
				var tarUserTypeHtml ="<span class='room-chat-user-admin'></span>";
			}
		}




	var tarGradeHtml = tarGrade > 0 ? "<span class='room-chat-user-grade  room-chat-user-grade"+tarGrade+"'></span>" : "";
	var tarVipGadeHtml = tarVipGade > 0 ? "<span class='room-chat-user-vipGade  room-chat-user-vipGade"+tarVipGade+"'></span>" : "";
	var controlHtml = "";
	if (videoUserId == id) {
		controlHtml = "";
	} else {
		// 如果是管理员
		if (videoUserType > 0) {
			// 比较管理员等级
			if (userType > 0) {
				if (videoUserType > userType) {
					controlHtml = "<li class='chat-jbyh'  data-id='" + chatUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li><li class='chat-guanli chat-jcgl'>"+i18nValueJson.web_page_JCGL+"</li>"
				} else {
					controlHtml = "<li class='chat-jbyh' data-id='" + chatUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
				}
			} else {
				if (videoUserType > 1) {
					controlHtml = "<li class='chat-jbyh' data-id='" + chatUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li><li class='chat-guanli chat-tsyh'>提升管理</li>"
				} else {
					controlHtml = "<li class='chat-jbyh' data-id='" + chatUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li><li class='chat-yhjy'>"+i18nValueJson.web_page_yhjy+"</li>"
				}
			}
			// 如果是普通用户
		} else {
			// 如果进了的是管理员
			if (userType > 0) {
				controlHtml = "<li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
			} else {
				// 如果进了普通用户				
				controlHtml = "<li class='chat-jbyh' data-id='" + chatUserId + "'>"+i18nValueJson.web_page_jbyh+"</li><li class='chat-pbyh'>屏蔽用户</li><li class='chat-jwhy' data-id='" + chatUserId + "'>加为好友</li><li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>"
			}
		}
	}
	var str = getSubstitute(message);
	console.log(str);
	str = "<span style='color:#" + colorFonts + "'>" + str + "</span>";
	var userInfoHtml = "<div class='room-chat-user-info'><div class='layerclose'>×</div><div class='room-chat-user-info-top'><div class='imgs'><img src='" + imgUrl + "' alt=''></div><div class='infos'> <div class='infos-userName'>" + name + "</div>" + userTypeHtml + vipGadeHtml + gradeHtml + "</div></div><div class='room-chat-user-info-bottom'><ul>" + controlHtml + "</ul><div class='clearb'></div></div></div>"
	var singHtml = "<li class=\"room-chat-item room-chat-message   room-chat-com" + id + "\"  room-chat-com=\"" + id + "\">" + userTypeHtml + vipGadeHtml + gradeHtml + "<span class=\"room-chat-user-name\">" + name + ":" + userInfoHtml + "</span><span class=\"room-chat-content\">" + str + "</span></li>";
	var isPingbi = hideUserList[id];
	if (!isPingbi) {
		if (chatType == 1) {
			var nowHtml = "<li class='room-chat-item room-chat-message room-chat-com" + id + "'  room-chat-com='" + id + "'>" + userTypeHtml + vipGadeHtml + gradeHtml + "<span class='room-chat-user-name'>" + name + ":" + userInfoHtml + "</span><span class='room-chat-content'>" + str + "</span></li>"
			$('.room-chat-messages').append(nowHtml);
		} else if (chatType == 2) {
			if (id == videoUserId) {
				var nowConHtml = getControlHtml(tarId, tarUserType, chatTarUserId);
				var userInfoHtml2 = "<div class='room-chat-user-info'><div class='layerclose'>×</div><div class='room-chat-user-info-top'><div class='imgs'><img src='" + tarImgUrl + "' alt=''></div><div class='infos'> <div class='infos-userName'>" + tarName + "</div>" + tarUserTypeHtml + tarVipGadeHtml + tarGradeHtml + "</div></div><div class='room-chat-user-info-bottom'><ul>" + nowConHtml + "</ul><div class='clearb'></div></div></div>"
				singHtml = "<li class=\"room-chat-item room-chat-message\">你对" + tarUserTypeHtml + tarVipGadeHtml + tarGradeHtml + "<span class=\"room-chat-user-name\">" + tarName + userInfoHtml2 + "</span><span class=\"room-chat-content\">说：" + str + "</span></li>";
			} else {
				var nowConHtml = getControlHtml(tarId, tarUserType, chatTarUserId);
				var userInfoHtml2 = "<div class='room-chat-user-info'><div class='layerclose'>×</div><div class='room-chat-user-info-top'><div class='imgs'><img src='" + tarImgUrl + "' alt=''></div><div class='infos'> <div class='infos-userName'>" + tarName + "</div>" + tarUserTypeHtml + tarVipGadeHtml + tarGradeHtml + "</div></div><div class='room-chat-user-info-bottom'><ul>" + nowConHtml + "</ul><div class='clearb'></div></div></div>"
				singHtml = "<li class=\"room-chat-item room-chat-message  room-chat-com=\"" + id + "\"\">" + userTypeHtml + vipGadeHtml + gradeHtml + "<span class=\"room-chat-user-name\">" + name + userInfoHtml + "</span><span class=\"room-chat-content\">对你说：" + str + "</span></li>";
			}
			$('#privateChatPlace').append(singHtml);
		}
	}
	privateChatScrool()
	lisenChatIteams()
	addUser(id, name);
}
// 获取初始状态
function changeVideoStatus(data) {
	videoUserType = data.type;
	videoUserName = data.name;
	videoUserId = data.actId;
	userId = data.id;
	videoUserGrade = data.grade;
	videoUserVip = data.vipGrade;
	videoStatus = true;
	time = data.forbiden;
	if (time > 0) {
		forbiTimeCount(time);
		var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>您被禁言了</li>"
		$('.room-chat-messages').append(html);
	}
	// 初始化字体
	$('.chatColor').each(function(index, el) {
		var el = $(this);
		charColor(el)
	});
}
// 字体功能；
function charColor(el) {
	var check = el.hasClass('chatvip');
	var level = parseInt(el.attr('data-level')),
		color = el.attr('data-color');
	if (check) {
		if (videoUserVip >= level) {
			el.removeClass('lilock')
		}
	} else {
		if (videoUserGrade >= level) {
			el.removeClass('lilock')
		}
	}
}
// 获取flash
function getSWF(name) {
	var e = document.getElementById(name);
	return (navigator.appName.indexOf("Microsoft") != -1) ? e : e.getElementsByTagName("embed")[0];
}
// 获取发送字数
function getWordNum(group, level) {
	var word;
	if (group == "vip") {
		switch (true) {
			case level >= 1 && level <= 2:
				word = 30
				break;
			case level > 2 && level < 5:
				word = 100
				break;
			case level >= 5:
				word = 300
				break;
			default:
				word = 15
				break;
		}
	} else {
		switch (true) {
			case level >= 1 && level <= 4:
				word = 20
				break;
			case level > 4 && level <= 9:
				word = 30
				break;
			case level >= 10 && level <= 14:
				word = 40
				break;
			case level >= 15:
				word = 60
				break;
			default:
				word = 10
				break;
		}
	}
	return word;
}
// 获取聊天间隔
function getSendTime(group, level) {
	var time;
	if (group == "vip") {
		switch (true) {
			case level >= 1 && level <= 4:
				time = 1000
				break;
			case level >= 5:
				time = 0
				break;
			default:
				time = 1000
				break;
		}
	} else {
		time = 2000;
	}
	return time
}
// 解除时间限制
var liftTimeLimitArg;
var liftTimeEach = 0;

function liftTimeLimit(time) {
	liftTimeLimitArg = setInterval(function() {
		liftTimeEach += 1000;
		var text = parseInt($('.timeText').text());
		text = text - 1;
		$('.room-chat-send').html("<span class='timeText'>" + text + "</span>秒");
		if (liftTimeEach > time) {
			clearInterval(liftTimeLimitArg);
			isShutUp = false;
			isChatOpen = true;
			$('.room-chat-send').removeClass('room-chat-disable').html(i18nValueJson.web_fs);
			$('.room-chat-texta').removeAttr('disabled').attr('placeholder', i18nValueJson.web_page_zlsrlt);
			liftTimeEach = 0;
		}
	}, 1000)
}
// 是否开启聊天
var isChatOpen = true;
// 发送的聊天内容
$(function() {
	// 判断是否登录
	$('.room-chat-send').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		} else {
			if (videoUserType < 0) {
				layer.confirm('没有账号,立马前往注册', {
					btn: ['前往', '放弃']
				}, function() {
					window.location.href = 'http://union.1332255.com/#/register/username?platformId=10006&url=http%3A%2F%2Fwww.1332255.com%3A8080%2FVideoGameWeb%2Findex%2Fall_ci-1.html&ly_tiger_guestUserID=';
				}, function() {
					layer.closeAll();
				})
				return false;
			}
			if (!videoStatus) {
				var msg = "<span class='room-chat-content' style='color:red;font-size:13px'>聊天服务器加载中...</span>";
				msg = "<li class='room-chat-item room-chat-message'><span class='room-chat-systems'></span>" + msg + "</li>";
				$('.room-chat-messages').append(msg);
				return false;
			} else {
				if (videoUserName == "") {
					// 用户姓名
					var msg = "<span class='room-chat-content' style='color:red;font-size:13px'>加载用户姓名类型失败</span>";
					msg = "<li class='room-chat-item room-chat-message'><span class='room-chat-systems'></span>" + msg + "</li>";
					$('.room-chat-messages').append(msg);
					return false;
				} else if (videoUserId == "") {
					// 聊天ID
					var msg = "<span class='room-chat-content' style='color:red;font-size:13px'>加载聊天ID失败</span>";
					msg = "<li class='room-chat-item room-chat-message'><span class='room-chat-systems'></span>" + msg + "</li>";
					$('.room-chat-messages').append(msg);
					return false;
				} else if (userId == "") {
					// 用户ID
					var msg = "<li class='room-chat-item room-chat-message'><span class='room-chat-systems'></span><span class='room-chat-content' style='color:red;font-size:13px'>加载用户ID失败</span></li>";
					$('.room-chat-messages').append(msg);
					return false;
				}
			}
			$('.room-chat-messages').append(msg);
		}
	});
	// 请求提升管理
	$(document).on('click', '.chat-guanli', function() {
			var flash = getSWF('moveflash');
			var check = $(this).hasClass('chat-tsyh') ? 1 : 2;
			var id = $(this).parents('.room-chat-item').attr('room-chat-com');
			flash.promoteManager({
				actorId: id,
				type: check
			})
		})
		// 请求屏蔽消息
	$(document).on('click', '.chat-pbyh', function() {
		var id = $(this).parents('.room-chat-item').attr('room-chat-com');
		var hasPin = $(this).hasClass('chat-pbxx');
		var name = $(this).parents('.room-chat-user-info').find('.infos-userName').text();
		if (!hasPin) {
			$('.room-chat-com' + id).find('.chat-pbyh').addClass('chat-pbxx').text(i18nValueJson.web_page_jcpb);//'解除屏蔽'
			$('.room-chat-com' + id).find('.chat-siyh').remove();
			var nocticeHtml = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_nyd+"<span class='room-chat-user-name'>" + name + "</span>屏蔽</li>"
			$('.room-chat-messages').append(nocticeHtml);
			if (!hideUserList[id]) {
				hideUserList[id] = true;
			} else {
				hideUserList[id] = true;
			}
		} else {
			$('.room-chat-com' + id).find('.chat-pbyh').removeClass('chat-pbxx').text("屏蔽用户");
			$('.room-chat-com' + id).find('.chat-pbyh').parent().append("<li class='chat-siyh'>"+i18nValueJson.web_page_slyh+"</li>");
			var nocticeHtml = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>"+i18nValueJson.web_page_nyd+"<span class='room-chat-user-name'>" + name + "</span>"+i18nValueJson.web_page_jcpb+"</li>"
			$('.room-chat-messages').append(nocticeHtml);
			hideUserList[id] = false;
		}
		$('.room-chat-user-info').hide();
	})



	//大厅加为好友
	$(document).on('click','.chat-jwhy', function(){
		var id = $(this).attr('data-id');
		var name,ifyCon;
		var con;
		var html = '<div class="jwhyBox"><p class="title">请输入验证信息</p><textarea class="jwhyCont" placeholder="我是..." maxlength="20" style="width:270px;height:65px"></textarea></div>';
		layer.config({
			title: "添加好友"
		});
		var cc = layer.open({
			btn: ['取消', '添加'],
			skin: 'layer-ext-moon', //加载新皮肤
			shadeClose: true, //开启遮罩关闭
			content: html,

			yes: function() {
				layer.closeAll();
			},
			btn2: function(){
				name = $('.layui-layer-title').html();
				ifyCon = $('.jwhyBox .jwhyCont').val();
				con =  "验证信息："+ ifyCon;
				
				var p = {
					title:name,
					friendId:id
				}

				if(!ifyCon){
					layer.alert('请输入验证信息!', {
	                    icon: 0,
	                    skin: 'layer-ext-moon'
	                });
	                return false;
				}else{
					p.content = con;
				}

				 
				
				$.ajax({
					type: "post",
					data: p,
					url: path + '/friends/notice',
					dataType: "json",
					success: function(data) {
						 if(data.code == 108){
						 	layer.msg("已经是好友！");
						 }else if(data.code == 109){
						 	layer.msg("重复提交！");
						 }else if(data.code == 0){
						 	layer.msg("提交申请成功，请等待好友同意!");
						 }else if(data.code == 114){
						 	layer.msg("不能添加自己为好友！");
						 }else if(data.code == 106){
						 	$('#login_a').click();
						 	return false;
						 }
					},
					error: function() {
						 layer.msg("error!");
					}
				});
			}
		});
	});
	
	
	
	// 私聊用户
	$(document).on('click', '.chat-siyh', function() {
			var name = $(this).parents('.room-chat-item').find('.infos-userName').text();
			var val = $('.room-chat-texta').val();
			val = '@' + name + " " + val;
			$('.room-chat-texta').val(val);
			$('.room-chat-user-info').hide();
		})
		// 举报用户
	$(document).on('click', '.reportBtn', function() {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();			
			return false;
		}
		var self = $("#chatUserinfo");
		var uid = self.attr('data-uid');
		var name = $.trim(self.find('.chatNickname').text());
		var html = "<div class='jingyanbody'><div class='jingyanTop'><span>举报对象：</span>" + name + "</div><div class='jingyanBottom'><span>举报类型：</span><select class='jubaoleixing'><option value='1'>侮辱性行为</option><option value='2'>不雅言辞</option><option value='3'>作弊行为</option><option value='4'>其他</option></select></div></div>";
		layer.config({
			title: "用户举报"
		});
		var cc = layer.open({
			btn: ['取消举报', '确定举报'],
			skin: 'layer-ext-moon', //加载新皮肤
			shadeClose: true, //开启遮罩关闭
			content: html,

			yes: function() {
				layer.closeAll();
			},
			btn2: function() {
				var type = $('.jubaoleixing').val(); 
				var o = {
					beUserId: uid, //被举报用户id
					type: type,		// 举报类型
					beUserName: name //被举报用户名称
				}
				$.ajax({
					type: "post",
					data: o,
					url: '/user/feedback/saveUserReport',
					dataType: "json",
					success: function(data) {
						var msg = data.detailMsg;
						if (data.number == '0') {
							var nocticeHtml = '<li><div class="chatTitle"><span class="chatSystem">您已对'+name+'举报</span></div></li>';
							$('.room-chat-messages').append(nocticeHtml);
						} else {
							var nocticeHtml = '<li><div class="chatTitle"><span class="chatSystem"><img src="/static/img/icon_announce.png">举报'+msg+'</span></div></li>'
							$('.room-chat-messages').append(nocticeHtml);
						}
					},
					error: function(e) {
						var nocticeHtml = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>您对<span style='color:#ff66ff'>" + name + "</span>举报失败</li>"
						$('.room-chat-messages').append(nocticeHtml);
					}
				});
			}
		});
	})
		// 请求用户禁言
	$(document).on('click', '.chat-yhjy', function() {
			var check = $(this).hasClass('chat-jcjy');
			var id = $(this).parents('.room-chat-item').attr('room-chat-com');
			var name = $(this).parents('.room-chat-item').find('.infos-userName').text();
			$.ajax({
				type: "get",
				data: "",
				url: path + '/systemCofig/getForbiddenTime',
				dataType: "json",
				success: function(data) {
					timeArr = data.obj;
					var optionHtml = '';
					for (var i = 0; i < timeArr.length; i++) {
						var timeValue = timeArr[i].VALUE;

						optionHtml += "<option value='" + timeValue + "'>" + timeArr[i].I18N + "</option>";
					}
					var html = "<div class='jingyanbody'><div class='jingyanTop'><span>禁言对象：</span>" + name + "</div><div class='jingyanBottom'><span>禁言时间：</span><select class='jintime'>" + optionHtml + "</select></div></div>";
					if (!check) {
						layer.config({
							title: "用户禁言设置"
						});
						var cc = layer.open({
							btn: ['取消禁言', '确定禁言'],
							skin: 'layer-ext-moon', //加载新皮肤
							shadeClose: true, //开启遮罩关闭
							content: html,
							yes: function() {
								layer.closeAll();
							},
							btn2: function() {
								var time = $('.jintime').val();
								var flash = getSWF('moveflash');
								flash.forbidPlayer({
									actorId: id,
									forbidTime: time
								})
							}
						});
					} else {
						// 发送解除禁言
						flash.forbidPlayer({
							actorId: id,
							forbidTime: 0
						})
					}

				}
			});
		})
		// 点击显示用户资料
	$(document).on('click', '.room-chat-user-name', function() {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}
		$('.room-chat-user-info').hide();
		$(this).find('.room-chat-user-info').show();
		chatScrool();
		privateChatScrool()
	})
	$(document).on('mouseover', '.room-chat-user-info', function() {
		$(this).show();
		chatScrool();
		privateChatScrool()
	})
	$(document).on('click', '.layerclose', function(event) {
		event.stopPropagation();
		$('.room-chat-user-info').hide();
		chatScrool();
		privateChatScrool()
	})
	$(document).on('mouseleave', '.room-chat-user-info', function() {
			$('.room-chat-user-info').hide();
			chatScrool();
			privateChatScrool()
		})
		// 视频聊天功能
	//var flash = getSWF('moveflash');
	var videoIndx = setInterval(function() {
		if (videoStatus) {
			clearInterval(videoIndx);
			videoActionBody();
		}
	}, 50);
	// 清屏功能
	$('.room-chat-tool-clear').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}
		clearScreen();
	});

	function clearScreen() {
		$('.room-chat-messages').empty();
	}
	// 发送字符转义（表情）
	function substitute(str, o, type, regexp) {
		var replaceArr = [];
		var replaceStr = str.replace(regexp || /\[\:([^\]]+)?\]/g, function(match, name) {
			replaceArr.push(match);
			if (type == 1) {
				// var emiStr=(o[name] === undefined) ? "[:" + name + "]" : "[:" + o[name] + "]";
				if (!o[name]) {
					var length = match.length;
				}
				return match;
				// return {match:match,emiStr:emiStr};
			} else {
				return type;
			}
		});
		var o = {
			replaceArr: replaceArr,
			replaceStr: replaceStr
		};
		return o;
	}

	function resetWordStr(str, emojiArr, regexp) {
		var i = -1;
		var st = str.replace(regexp || /\$/g, function(match, name) {
			i++;
			return emojiArr[i];
		})
		return st
	}
	// 选择表情符号
	$('.hlly-emoji-panel li a').click(function(event) {
		var check001 = $('#isLoginInput').size();
		if (!check001) {
			$('#login_a').click();
			
			return false;
		}
		event.stopPropagation();
		var text = $(this).attr('data-txt');
		text = "[:" + text + "]";
		var nowArea = $('.room-chat-texta').val();
		nowArea = nowArea + text;
		var maxthLength = nowArea.length;
		var nowMax = parseInt($('.room-chat-texta').attr('maxlength'));
		$('.room-chat-texta').attr('maxlength', maxthLength + nowMax - 1);
		$('.room-chat-texta').val(nowArea);
		$('.room-chat-tool-emoji-group .defalut').click();
		$(document).click();
	});

	function videoActionBody() {
		if (isChatOpen) {
			$('.room-chat-send').removeClass('room-chat-disable')
		}
		$('.room-chat-texta').on('keydown', function(event) {
			if (event.keyCode == "13") {
				$('.room-chat-send').click();
				event.returnValue = false;
				return false;
			}
		})
		if (videoUserType > 0) {
			chatWordNum = 300;
			chatIntervalTime = 0;
		} else if (videoUserVip && videoUserVip != "" && videoUserVip != 0) {
			// 可发送的字数
			chatWordNum = getWordNum('vip', videoUserVip);
			// 解除时间限制的时间
			chatIntervalTime = getSendTime('vip', videoUserVip);
		} else {
			chatWordNum = getWordNum('others', videoUserGrade);
			chatIntervalTime = getSendTime('others', videoUserGrade);
		}
		$('.room-chat-texta').attr('maxLength', chatWordNum);
		// 发送消息
		// 检查输入
		$(document).on('input propertychange focus', '.room-chat-texta', function() {
			var str = $(this).val();
			var isPrivateChatNow = str.indexOf('@') >= 0 ? true : false;
			var isFaceWord = str.indexOf('[') >= 0 ? true : false;
			var faceReg = /\[\:([^\]]+)?\]/g;
			var faceAarr = str.match(faceReg);
			var addLength = 0;

			//表情
			if (faceAarr) {
				for (var i = 0; i < faceAarr.length; i++) {
					var faceString = faceAarr[i];
					var cutString = faceString.length;
					addLength = addLength + cutString - 1;
				}
			}
			
			$(this).attr('maxLength', chatWordNum + addLength);
			// 私聊
			if (isPrivateChatNow) {
				var reg = /^@([^\s]+)?/g;
				var newstr = reg.exec(str);
				if (newstr[1]) {
					var stra = newstr[1];
					var length = stra.length + 2 + chatWordNum;
				}
				$('.room-chat-texta').attr('maxLength', length);
				if (faceAarr) {
					for (var i = 0; i < faceAarr.length; i++) {
						var faceString = faceAarr[i];
						var cutString = faceString.length;
						addLength = addLength + cutString - 1;
					}
					$(this).attr('maxLength', chatWordNum + addLength);
				}
			}
		})
		$('.room-chat-send').click(function(event) {
			var checkClass = $('.room-chat-send').hasClass('room-chat-disable');
			var checkLogin = $('#isLoginInput').size();
			if (!checkLogin) {
				return false;
			}
			if (!isChatOpen || isShutUp || checkClass) {
				layer.tips('聊天服务器初始化未成功', '.room-chat-texta', {
					tips: 1
				});
				return false;
			}
			if (isChatOpen && !isShutUp && !checkClass) {
				var chatTagetId = "";
				var context = $('.room-chat-texta').val();
				// 判断是否是私聊
				var isPrivateChatNow = isPrivateChat(context);
				if (isPrivateChatNow) {
					chatTagetId = getPrivateUserId(context);
					context = getPrivateChatContext(context);
				}
				var chatRe = /\[\:([\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF-0-9a-zA-Z]*)\]/gi;
				var textEscape = substitute(context, emoji, '$');
				var context = textEscape.replaceStr;
				var contextArray = textEscape.replaceArr;
				var contextLength = context.length;
                if(isNull(context)){
                	layer.tips('发送消息不能为空', '.room-chat-texta', {
						tips: 1
					});
					return false;
                }
				function isNull(str) {
					if (str == "") return true;
					var regu = "^[ ]+$";
					var re = new RegExp(regu);
					return re.test(str);
				}

				var allowLength = parseInt($('.room-chat-texta').attr('maxlength'));
				// 判断是否为空
				if (contextLength == 0) {
					// var html = "<li class='room-chat-item room-chat-message'><span class='room-chat-content' style='color:red;font-size:13px'><span class='room-chat-systems'></span>消息不能为空</span></li>"
					// $('.room-chat-messages').append(html);
					layer.tips('发送消息不能为空', '.room-chat-texta', {
						tips: 1
					});
					return false;
				}
				context = resetWordStr(context, contextArray);
				// console.log(context);
				// 判断发送消息是否相同超过三次
				var isWordEqual = (context == compareText) ? true : false;
				if (isWordEqual) {
					checkContextTime++;
				} else {
					checkContextTime = 0
				}
				if (checkContextTime >= 3) {
					// var html = "<li class='room-chat-item room-chat-message'><span class='room-chat-content' style='color:red;font-size:13px'><span class='room-chat-systems'></span>不要重复发言</span></li>"
					// $('.room-chat-messages').append(html);
					layer.tips('不要重复发言', '.room-chat-texta', {
						tips: 1
					});
					return false;
				}
				compareText = context;
				// 判断发送倒计时
				if (chatIntervalTime) {
					isChatOpen = false;
					$('.room-chat-texta').attr('disabled', 'disabled');
					$('.room-chat-send').addClass('room-chat-disable')
					var timeTextBack = parseInt(chatIntervalTime / 1000);
					$('.room-chat-send').html("<span class='timeText'>" + timeTextBack + "</span>秒")
					liftTimeLimit(chatIntervalTime);
				}
				// 聊天字符处
				context = substitute(context, emoji, 1).replaceStr;
				var nowChatWordLength = context.length;
				var realSendLength = chatWordNum;
				var checkFace = true;
				var faceReg = /\[\:([^\]]+)?\]/g;
				var faceAarr = context.match(faceReg);
				if (faceAarr) {
					if (faceAarr.length <= chatWordNum) {
						for (var i = 0; i < faceAarr.length; i++) {
							var faceString = faceAarr[i];
							var cutString = faceString.length;
							faceString = faceString.substring(2, faceString.length - 1);
							if (emoji[faceString]) {
								var faceLength = faceString.length + 3;
								realSendLength = realSendLength + faceLength;
								var setWrod = chatWordNum - 1;
							}
						}
					}
					realSendLength = realSendLength + setWrod;
				}
				if (nowChatWordLength > realSendLength) {
					checkFace = false;
					layer.tips('您说的话超出了规定长度', '.room-chat-texta', {
						tips: 1
					});
					return false;
				}
				// 发送聊天
				if (chatTagetId && checkFace) {
					if (chatTagetId == videoUserName) {
						// var html = "<li class='room-chat-item room-chat-message' style='color:red;font-size:13px'><span class='room-chat-systems'></span>不要自言自语</li>"
						// $('#privateChatPlace').append(html);
						layer.tips('不要自言自语', '.room-chat-texta', {
							tips: 1
						});
					} else {
						flash.sendChatMessages({
							message: context,
							chatTarget: chatTagetId,
							fontColor: chatFontColor
						});
					}
				} else {
					flash.sendChatMessages({
						message: context,
						chatTarget: '',
						fontColor: chatFontColor
					});
				}
				$('.room-chat-texta').val('');
			} else {
				// var html = "<li class='room-chat-item room-chat-message'><span class='room-chat-content' style='color:red;font-size:13px'>系统广播:发送消息太快</span></li>"
				// $('.room-chat-messages').append(html);
			}
			lisenChatIteams()
		});
	}
})