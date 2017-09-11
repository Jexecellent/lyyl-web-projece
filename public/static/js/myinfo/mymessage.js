$(function() {
	var clickEvent = function () {
		var checkArr = [];
		//显示隐藏删除按钮
		$("input[type='checkbox']").click(function (e) {
			e.stopPropagation();
			if ($(this).is(':checked')) {
				checkArr.push($(this).data("mid"));
			}
			else {
				checkArr.splice($.inArray('c', checkArr), 1);
			}
			if (checkArr.length > 0) {
				$(".deleteBtn").show();
			}
			else {
				$(".deleteBtn").hide();
			}
		})
		//删除多条消息
		$(".conRight").on("click", ".deleteBtn", function () {
			var idstr = [];
			$("#messageList input[type='checkbox']").each(function (i, e) {
				if ($(e).is(':checked')) {
					idstr.push($(e).data("mid"));
				}
			})

			layer.confirm('是否删除选中消息？', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px', '155px'],
				btn: ['取消', '确认'] //按钮
			}, function () {
				layer.closeAll();
			}, function () {
				$.post('/message/delete/more', {idstr: idstr.toString()}, function (res) {
					console.log(res)
					if (res.number == 0) {
						layer.msg('删除成功');
						if (pages == pageNum && pages != 1 && total % pages == 1) {
							window.location.href = "?pageNum=" + (pageNum - 1) + "&pageSize=" + pageSize + "&mType=" + mType;
						}
						else {
							location.reload();
						}
					} else {
						layer.msg('删除失败');
					}
				});
			});
		})
		//清空消息
		$(".conRight").on("click", ".emptyBtn", function () {

			layer.confirm('是否清空消息？', {
				title: '提示',
				skin: 'haiyao-class',
				area: ['320px', '155px'],
				btn: ['取消', '确认'] //按钮
			}, function () {
				layer.closeAll();
			}, function () {
				$.post('/message/clean', {type: mType}, function (res) {
					if (res.number == 0) {
						layer.msg('删除成功');
						if (pages == pageNum && pages != 1) {
							window.location.href = "?mType=" + mType;
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
	}
	clickEvent();
	$(".tcdPageCode").unbind().createPage({
		total: total,
		pageCount: pages,
		current: parseInt(pageNum),
		pageSize: pageSize,
		backFn: function (p, pageSize) {
			// getList(p,pageSize,mType)
			window.location.href = "?pageNum=" + p + "&pageSize=" + pageSize + "&mType=" + mType;
		}
	});
})