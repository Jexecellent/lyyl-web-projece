$(function(){
	/*tab切换*/
	$(".tabPane").on("click",function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var target = $(this).data("target");
		$(this).parents(".tabDiv").find(".tabContent").removeClass('active');
		$(target).addClass('active');
	})

	var subMenu = $('ul.extend');
	//二级菜单展开关闭
	$(".mylive").unbind().click(function(){
		if($(this).attr("state")=="on"){
			$(this).attr("state","off");
			$(this).find(".i-arrow").attr("class","i-arrow i-right");
			$(this).removeClass("active");
			subMenu.addClass('hide');
		}
		else{
			$(this).attr("state","on");
			$(this).find(".i-arrow").attr("class","i-arrow i-down");
			$(this).addClass("active");
			subMenu.removeClass('hide');
		}
	})
	// 修改内容按钮切换
	$(".updateDiv .updateBtn").unbind().click(function(){
		$(this).parents(".updateShow").hide();
		$(this).parents(".updateDiv").find(".updateHide").show();
	})
	$(".updateDiv .cancelBtn").unbind().click(function(){
		$(this).parents(".updateHide").hide();
		$(this).parents(".updateDiv").find(".updateShow").show();
	})

	//下拉框按钮
	$(document).on("click",".mySelect .icon-arrow",function(e){
		e.stopPropagation();
		$(".mySelect .selectDown").toggle();
		$(document).on("click",function(){
			$(".mySelect .selectDown").hide();
		})
		$(document).on("click",".mySelect .selectDown a",function(){
			var val = $(this).text();
			$(this).parent().siblings().find("a").removeClass("active");
			$(this).addClass("active");
			$(".mySelect .selectInput").val(val);
		})
	})
	
	

})
//获取url参数
$.getUrlParam = function(name)
{
	var url = window.location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			//就是这句的问题
			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
			//之前用了unescape()
			//才会出现乱码
		}
	}
	return theRequest[name];
}