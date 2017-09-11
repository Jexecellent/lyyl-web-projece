var currentUrl = window.location.href;

$(function(){
    //var cid = getParameter("cid");
	//var jumpUrl = platformUrl+'#/register/username?platformId=10006&comeFrom='+cid+'&url='+encodeURIComponent(getRootPath()+'/'+ci+'/index/all.html');
		//$("#reg_user").attr('href',jumpUrl);
		//$("#reg_user_left").attr('href',jumpUrl);
		    $(document).on('click',"#login_a, #login_a_hidden",function(e){
				/*hhly_login.initConfig({
                    "platformId":10006,
                    "comeFrom": cid,
					"success" : function(data) {
						//登陆成功，调用回调
						var user = {};
						user = data.user;
						/!*jsonAjax('post',path+"/user/loginCallBack",user,'json',function(data){
							if(data.code == 1 || data.code == 403){
								alert(data.msg);
								return;
							}
							window.location.reload();
						});*!/
					},
					'url': '/index/all.html'//注册成功跳转url
				});*/
		        hhly_login.show();
		        e.preventDefault();
		    });
		    
//		    //左边退出登录
//		    $("#login_out").bind("click",function(){
//		    	jsonAjax('post',path+"/user/loginOut",{},'json',function(data){
//		    		window.location.reload();
//		    		window.location.href=getRootPath()+"/"+ci+"/index/all.html";
//		    	});
//		    });
//		    //顶部退出登录
//		    $("#login_out_top").bind("click",function(){
//		    	window.location.reload();
//		    	jsonAjax('post',path+"/user/loginOut",{},'json',function(data){
//		    		window.location.href=getRootPath()+"/"+ci+"/index/all.html";
//		    	});
//		    });
		    
});

