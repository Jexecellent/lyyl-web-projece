//分页插件
/**
2014-08-05 ch
**/

(function($){
	// var pageSize = 6;
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();

				obj.append('<span>记录：'+args.total+'条</span><span>一页<select class="pageSelect"><option>6</option><option>12</option><option>18</option></select>条</span><span>页次：'+args.current+'/'+args.pageCount+'</span>');
				$('.pageSelect').val(args.pageSize)
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="fristPage">首页</a>');
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">首页</span>');
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
					obj.append('<a href="javascript:;" class="lastPage">尾页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
					obj.append('<span class="disabled">尾页</span>');
				}

				obj.append('<span class="goSpan">前往<input class="pagesInput" type="text" maxlength="1">页<a href="javascript:;" class="goPage">确定</a></span>');
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					if(typeof(args.backFn)=="function"){
						args.backFn(current,args.pageSize);
					}
				});
				//首页
				obj.on("click","a.fristPage",function(){
					var current = parseInt(obj.children("span.current").text());
					if(typeof(args.backFn)=="function"){
						args.backFn(1,args.pageSize);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1,args.pageSize);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1,args.pageSize);
					}
				});
				//尾页
				obj.on("click","a.lastPage",function(){
					if(typeof(args.backFn)=="function"){
						args.backFn(args.pageCount,args.pageSize);
					}
				});
				//每页条数
				obj.on("change","select.pageSelect",function(){
					pageSize = $(this).val();
					if(typeof(args.backFn)=="function"){
						args.backFn(1,pageSize);
					}
				});
				//跳页
				obj.on("click","a.goPage",function(){
					var current = $("input.pagesInput").val();
					if(typeof(args.backFn)=="function"){
						args.backFn(current,args.pageSize);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			total : 10,
			pageCount : 10,
			current : 1,
			pageSize:6,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);

//代码整理：懒人之家 www.lanrenzhijia.com