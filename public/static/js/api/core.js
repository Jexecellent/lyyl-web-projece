var BBH_share = {
	// var config={"title":"����","show":"�ز�ͼ","message":"˵��" };

	initData : function(config) {
	////////////QQ//////////////////
		if(config.KEY_qq){
			BBH_share.qqUser(config);
		}
		if(config.KEY_qzone){
			BBH_share.qzone(config);
		}
		if(config.KEY_sina){
			BBH_share.sina(config);
		}
		if(config.KEY_weixin){
			BBH_share.weixin(config);
		}
	////////////////QQ///////////////////
	}
	
	,weixin: function(config){
		$(document).on('click',"#" + config.KEY_weixin + "",function(){
			var action=path+"/views/static/js/share/weixin/weixin.htm";
			var data={
				"title":config.title,
				"url":config.url,
			};
			BBH_share.openBlank(action, data);
		});
	}
	
	,sina: function(config){
		$(document).on('click',"#" + config.KEY_sina + "",function(){
			var action="http://v.t.sina.com.cn/share/share.php";
			var data={
				"title":config.title,
				"url":config.url,
				"pic":config.pics,
				"appkey":config.site,
				"desc":config.desc,
				"summary":config.msg,
				"language":"zh_cn",
			};
			BBH_share.openBlank(action, data);
		});
	}
	
	,qzone: function(config){
		$(document).on('click',"#" + config.KEY_qzone + "",function(){
			var action="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey";
			var data={
					"title":config.title,
					"url":config.url,
					"pics":config.pics,
					"site":config.site,
					"desc":config.desc,
					"summary":config.msg
					};
			BBH_share.openBlank(action, data);
		});
	}
	
	,qqUser: function(config) {
		$(document).on('click',"#" + config.KEY_qq + "",function(){
			var action="http://connect.qq.com/widget/shareqq/index.html";
			var data={
				"title":config.title,
				"url":config.url,
				"pics":config.pics,
				"site":config.site,
				"desc":config.desc,
				"summary":config.msg
			};
			BBH_share.openBlank(action, data);
		});
	}
	
	,openBlank : function(action, data) {
		var form = $("<form/>").attr('action', action).attr('method', 'get');
		form.attr('target', '_blank');
		var input = '';
		$.each(data, function(i, n) {
			input += '<input type="hidden" name="' + i + '" value="' + n+ '" />';
		});
		form.append(input).appendTo("body").css('display', 'none').submit();
		form.remove();
	}

// �÷�:
// openBlank(
// '/member/succeed.html',
// {id:'6',describe:'��ӿ�����,
// ����ǰ̨���̨',
// money:$('.money:first').text()
// });

};