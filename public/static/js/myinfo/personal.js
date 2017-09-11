$(function(){
	//更新用户消息
	function updateUser(json){
		$.ajax({
			type:"POST",
			url: '/user/updateuser',
			cache:false,
			data:json,
			success : function(res){
				console.log(res)
				if(res.number==0){
					layer.msg('更新成功');
					window.location.reload();
				}else{
					layer.msg('更新失败');
				}
			}
		})
	}
	//更新用户session
	function updateSession(json){
		$.post('/user/updatesession',json,function(res){
		})
	}
	function getUserAudit(){
		lib.api.senPost('USER_GET_AUDIT', {userId: 35}, function(resp){
			console.log(resp)
			if(resp.data.state==0){
				$(".audit").show();
				$(".audit img").attr("src",resp.data.headUrl);
				$("#headIcon,.uploadBg").remove();
			}
			if(resp.data.state==1){
				$(".headIcon").attr("src",resp.data.headUrl)
				updateSession({headIcon:resp.data.headUrl});

			}
			if(resp.data.state==2){
				$(".audit").show();
				$(".audit img").attr("src",resp.data.headUrl);
				$(".audit span").text("审核不通过，请重新上传头像");
			}
		});
	}
	getUserAudit();
	$(".conRight").on("click",".updateNameBtn",function(){
		var val = $('.nameInput').val();
		var json = {nickName:val};
		updateUser(json);

	})
	$(".conRight").on("click",".updateSexBtn",function(){
		var val = $("input[name='sex']:checked").val();
		var json = {sex:val};
		updateUser(json);
	})

	$('#headIcon').change(function(){
		$.ajaxFileUpload({
				url: '/upload/image', //用于文件上传的服务器端请求地址
				secureuri: false, //是否需要安全协议，一般设置为false
				fileElementId: 'headIcon', //文件上传域的ID
				dataType: 'json', //返回值类型 一般设置为json
				name:'file',
				success: function (data, status)  //服务器成功响应处理函数
				{
					var imgUrl = data.data.host + ':' + data.data.port + '/' + data.data.group + '/' + data.data.remoteFilePath;
					var json = {headIcon:imgUrl};
					// updateUser(json);

					console.log(imgUrl)
					lib.api.senPost('USER_ADD_AUDIT', {userId: 1,headUrl:imgUrl}, function(resp){
						console.log(resp)
						if(resp.number === '0') {
							layer.msg('上传成功，请等待审核！');
							location.reload();
						}
						else if(resp.number === '10013'){
							layer.msg('头像正在审核，请勿重复上传！');
						}
					});
				},
				error: function (data, status, e)//服务器响应失败处理函数
				{
					alert(e);
				}
			}
		)
	})
})