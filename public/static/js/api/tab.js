/*tab切换*/
$(document).on("click",".anchorTab a",function(){
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	var target = $(this).data("target");
	$(this).parents(".tabDiv").find(".tabContent").removeClass('active');
	$(target).addClass('active');
	if($('.tinyscrollbar2').get(0)){
		$('.tinyscrollbar2').tinyscrollbar();
	}
})

/*大厅左侧边栏收缩*/
$(".navLeft .sideclose").click(function(){
	var _this = $(this);
	$(".navLeft").toggle();
	if(_this.parent().hasClass('navLeftIn')){
		$(".hallCon,.roomCon").css("marginLeft","287px");
	}
	if(_this.parent().hasClass('navLeftOut')){
		$(".hallCon,.roomCon").css("marginLeft","107px");
	}
})