$(function() {
	var clickEvent = function () {
		//邀请好友
		$("#myfriend .friendList .inviteBtn").unbind().click(function () {
			var _this = $(this);
			layer.confirm('是否邀请该好友？', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px', '155px'],
				btn: ['取消', '确认'] //按钮
			}, function () {
				layer.closeAll();
			}, function () {
				$.get('/user/friends/invite', {friendId: _this.data("fid")}, function (res) {
					if (res.number == 0) {
						layer.msg('邀请成功');
					} else {
						layer.msg('邀请失败');
					}
				})
			});
		})

		//删除好友
		$("#myfriend .friendList .deleteBtn").unbind().click(function () {
			var _this = $(this);
			layer.confirm('是否删除该好友？', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px', '155px'],
				btn: ['取消', '确认'] //按钮
			}, function () {
				layer.closeAll();
			}, function () {
				$.post('/user/friends/delete', {friendId: _this.data("fid")}, function (res) {
					if (res.number == 0) {
						layer.msg('删除成功');
						if (pages == pageNum && pages != 1 && total % pages == 1) {
							window.location.href = "?pageNum=" + (pageNum - 1) + "&pageSize=" + pageSize;
						}
						else {
							location.reload();
						}
					} else {
						layer.msg('删除失败');
					}
				})
			});
		})

		//跟踪好友
		$("#myfriend .friendList .traceBtn").unbind().click(function () {
			var _this = $(this);
			layer.confirm('是否跟踪该好友？', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px', '155px'],
				btn: ['取消', '确认'] //按钮
			}, function () {
				layer.closeAll();
			}, function () {
				$.get('/user/friends/trace', {friendId: _this.data("fid")}, function (res) {
					if (res.number == 0) {
						roomId = res.data[0].roomId;
						layer.msg('房间id---' + roomId);
					} else {
						layer.msg('跟踪失败');
					}
				})
			});
		})
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