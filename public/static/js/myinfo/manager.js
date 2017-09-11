$(function() {
	var clickEvent = function () {
		/*添加管理员弹窗*/
		$(document).on('click','.addmanagerBtn', function(){
			layer.confirm('', {
				title: '添加管理员',
				skin: 'haiyao-class',
				area: ['320px',],
				btn: ['取消', '确认'], //按钮
				content: '<div class="addmanagerDiv"><div class="formGroup"><label>用户昵称：</label><input id="account" type="text"></div></div>'
			}, function () {
				layer.closeAll();
			}, function () {
				lib.api.senPost('ANCHOR_MANAGER_ADD', {userId: 1,account:$("#account").val(),roomId:1}, function(resp){
					console.log(resp)
					if(resp.number == 0){
						location.reload();
					}
					else if(resp.number == 10000){
						layer.msg('该用户已经是管理员');
					}
					else if(resp.number == 10004){
						layer.msg('用户名不存在');
					}
				})
			});

		});
		$(document).on('click','.removeBtn', function(){
			var uid = $(this).data("uid");
			layer.confirm('是否解除该管理员', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px',],
				btn: ['取消', '确认']
			}, function () {
				// layer.closeAll();
			}, function () {
				lib.api.senPost('ANCHOR_MANAGER_DEL', {userId: 1,id:uid}, function(resp){
					if(resp.number == 0){
						location.reload();
					}
					else if(resp.number == 10004){
						layer.msg('用户名不存在');
					}
				})
			});

		});

	}
	clickEvent();

	$(".tcdPageCode").unbind().createPage({
		total: total,
		pageCount: pages,
		current: parseInt(pageNum),
		pageSize: pageSize,
		backFn: function (p, pageSize) {
			// getList(p,pageSize,mType)
			window.location.href = "?pageNum=" + p + "&pageSize=" + pageSize;
		}
	});
})