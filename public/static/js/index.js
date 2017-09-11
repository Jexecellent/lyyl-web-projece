/**
 * [description]
 * @Author  HTL
 * @DateTime  2017-05-23T14:23:44+0800
 * @return 
 */
$(function(){
	 // 初次加载
    lazyLoad();
    $('body').mouseover(function(event) {
        lazyLoad();
    });
    $('body,document,window').scroll(function(event) {
       lazyLoad();
    });

	$('.nav-home').addClass('active');
	// 大背景轮播图
	var pic = new Swiper('#pic',{
	    autoplay:5000,
	    speed:300,
	    effect : 'fade',
	    loop:true
    })
	// 小轮播图
	var picAct = new Swiper('#picAct',{
		autoplay:3000,
		speed:300,
		effect : 'fade',
		loop:true,
		pagination : '.pagination', // 显示分页器的指示点
		paginationClickable :true // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换
	})
	// tab切换
	$(document).on('click', '.tabGroup a', function() {
        $(this).addClass('active').siblings().removeClass('active');
    })
	//明星主播
	var slidesPerView = 5
	var slidesPerGroup = 1
	var mySwiper = new Swiper('.star-container',{
		loop: true,
		speed:500,
		onlyExternal : true,
		slidesPerView :  slidesPerView,
		slidesPerGroup : slidesPerGroup,
		loopedSlides :20,
		loopAdditionalSlides : 20,
		nextButton: '.arrow-right',
		prevButton: '.arrow-left',
		onSlideChangeEnd: function(swiper){
			//alert(swiper.activeIndex);
			if(swiper.activeIndex==40){
				swiper.swipeTo(0,0)
			}
		}
	});
	$(document).on('mouseover', '.homePage-in-l', function() {
        $('.enter p').stop().animate({
            opacity: '1'
        }, 500);
    })
    $(document).on('mouseout', '.homePage-in-l', function() {
        $('.enter p').stop().animate({
            opacity: '0'
        }, 500);
    })
    $(document).on('mouseover', '.enter', function() {
        $('.enter a').stop().animate({
            opacity: '1'
        }, 600);
    })
    $(document).on('mouseout', '.enter', function() {
        $('.enter a').stop().animate({
            opacity: '0'
        }, 600);
    })
    $(document).on('click', '.roomType li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.homePageL').find('.homePage-in-l').remove();
        var dataRoomurl = $(this).attr('data-roomurl');
        var dataFlash = $(this).attr('data-flash');
        var html = template('moveTem', {
            dataFlash:dataFlash
        });
        $('.homePageL').prepend(html);
        $('.enter a').attr('href', dataRoomurl);
    })
	// 精彩推荐 换一批
	$('#anotherRecom').click(function(){
		var _this = this ;
		var $recomList = $('#recomList');
		$.ajax({
			type:"GET",
			url:'/roomlist',
			cache:false,
			data:{},
			success : function(res){
				console.log(res)
				if(!res){
					$recomList.empty() ;
					var html = template('tpl', {data:res.list});
					$recomList.prepend(html);
				}else{
					layer.tips('没有更多推荐!', _this, {
						tips: [1, '#0FA6D8'] ,
                  		time : 1000});
				}
			},
			error : function(err){
				console.log('err...',err)
			}

		})
	})
	/*房间切换*/
    $('.play-list').each(function() {
        var name = "#" + $(this).attr('id') + " .tabGroup>a";
        $(document).on('click', name, function() {
            var parentId = $(this).parents('.play-list').attr('id');
            var pid = parentId.slice(3);
            var box = $("#"+parentId).find('.curPuke');
            var data = {}
            $.ajax({
                type: "get",
                data: data,
                url: "/roomlist",
                global: false,
                success: function(res) {
                    box.html('');
                    var length = res.list.data.length;
                    if (length !== 0) {
                        var html = template('ten', {data:res.list.data});
                        box.prepend(html);
                        box.find('.hint').css('display', 'none');
                    } else {
                        box.html('<div class="hint">很抱歉，主播还未上线，请耐心等候！</div>')   //很抱歉，主播还未上线，请耐心等候！
                        box.find('.hint').css('display', 'block');
                    }
                },
                error: function(e) {
                    errorfn(e);
                }
            });
        })
    });
	// 合作媒体
	var swiper = new Swiper('.swiper-footer', {
		slidesPerView: 5,
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		spaceBetween: 30
	});
	// 控制回到顶部的显示隐藏
	$(document).scroll(function(event) {
		//viewH =$(this).height();//可见高度
		scrollTop =$(this).scrollTop();//滚动高度
		if(scrollTop > 500){
			$(".floatBox-con.fist").css({display:'block'},500);;
		}else{
			$(".floatBox-con.fist").hide()
		}
	});
	// 回到顶部
	$('.floatBox-con.fist').click(function(){
		$('body,html').animate({scrollTop:0},500);
	});
	/*联系客服窗口*/
	function openCenWin(url, width, height, windowName, otherOptions) {
	    if (typeof(url) == "undefined") {
	        url = "";
	    }
	    if (typeof(width) == "undefined") {
	        width = 815;
	    }
	    if (typeof(height) == "undefined") {
	        height = 665;
	    }
	    var left = (screen.availWidth - width) / 2;
	    var top = (screen.availHeight - height) / 2;
	    if (typeof(windowName) == "undefined" || windowName == "") {
	        windowName = new Date().getTime();
	    }
	    if (typeof(otherOptions) == "undefined") {
	        otherOptions = "alwaysRaised=yes,location=no,menubar=no,resizable=yes,scrollbars=no,titlebar=no,toolbar=no";
	    }
	    window.open(url, windowName, " left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + "," + otherOptions);
	}
})
/**
 * [lazyLoad 首页图片懒加载效果]
 * @Author   HTL
 * @DateTime 2017-05-23T14:24:50+0800
 * @return 
 */
function lazyLoad() {
    $('.video-img').each(function(index, el) {
        var _this = $(this),
            hasLazy = _this.hasClass('lazy'),
            imgOffSetTop = _this.offset().top - ($(window).height()), //tpl
            winScroolTop = $(window).scrollTop();
        if (!hasLazy) {
            if (imgOffSetTop <= 0) {
                var scr = _this.attr('data-scr');
                imgLoad(scr, _this);
            } else if (winScroolTop >= imgOffSetTop) {
                var scr = _this.attr('data-scr');
                imgLoad(scr, _this);
            }
        }
    });
}
/**
 * [imgLoad 判断图片是否加载成功]
 * @Author   HTL
 * @DateTime 2017-05-23T14:26:03+0800
 */
function imgLoad(url, el) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
        el.addClass('lazy').attr('src', url);
        return;
    }
    img.onload = function() {
        el.addClass('lazy').attr('src', url);
    };
};

