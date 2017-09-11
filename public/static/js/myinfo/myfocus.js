$(function() {
//取消关注
	$(document).on("click", ".canFocusBtn", function () {
		var _this = $(this);
		layer.confirm('是否取消关注该主播？', {
			title: '提示',
			skin: 'haiyao-class',
			area: ['320px', '155px'],
			btn: ['取消', '确认'] //按钮
		}, function () {
			layer.closeAll();
		}, function () {
			$.post('/anchor/destroy', {anchorId: _this.data("aid")}, function (res) {
				if (res.number == 0) {
					layer.msg('取消关注成功');
					if (pages == pageNum && pages != 1 && total % pages == 1) {
						window.location.href = "?pageNum=" + (pageNum - 1) + "&pageSize=" + pageSize;
					}
					else {
						location.reload();
					}
				} else {
					layer.msg('取消关注失败');
				}
			})
		});
	})


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