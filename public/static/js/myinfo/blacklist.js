$(function() {
	var clickEvent = function () {
		/*添加管理员弹窗*/
		$(document).on('click','.addblackBtn', function(){
			layer.confirm('', {
				title: '禁止发言',
				skin: 'haiyao-class',
				area: ['320px',],
				btn: ['取消', '确认'], //按钮
				content: '<div class="addblackDiv"><div class="formGroup"><label>用户账号：</label><input type="text"></div><div class="formGroup"><label>禁言时间：</label><select><option value="1">禁言时间1分钟</option><option value="2">禁言时间2分钟</option><option value="5">禁言时间5分钟</option><option value="10">禁言时间10分钟</option><option value="30">禁言时间30分钟</option><option value="60">禁言时间60分钟</option><option value="120">禁言时间120分钟</option></select></div></div>'
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