/**
 * Created by Administrator on 2017/6/3.
 */
$(function(){

    //主播资料-模板替换
    $(document).on('click','#anchorList ul li',function(){
        var anId = this.id;
        $.ajax({
            type:"GET",
            url:'/anchor/getAnchorInfo',
            cache:false,
            data:{companyId:1,anchorId: anId},
            success : function(res){
                $('#anchorDetail').html('');
                var htmlInfo = template('tplInfo', {data:res});
                $('#anchorDetail').prepend(htmlInfo);
            },
            error : function(err){
                console.log(err)
            }

        });
    });
    //搜索主播
    $(document).on('click','#anchorList .searchBtn',function(){
        var anchorName = $('.searchInput').val() ;
        $.ajax({
            type:"get",
            url:'/anchor/anchorSearch',
            cache:false,
            data:{companyId:1,anchorName:anchorName},
            success : function(res){
                $('#anchorList ul').html('');
                var html = template('anchorSearch', {data:res.anchorList.data.list});
                $('#anchorList ul').prepend(html);
            },
            error : function(err){
                console.log(err)
            }
        });
    });

    //关注主播
    $(document).on('click','.follow',function(){
        var anId = $(this).parent().data("id") ;
        $.ajax({
            type:"post",
            url:'/user/follow/anchor',
            cache:false,
            data:{companyId:1,anchorId:anId},
            success : function(res){
                if(res.code == '403'){
                    $('#login_a').click();
                }else if(res.number == '0'){
                    $('.cancel').removeClass('cur');
                    $('.follow').addClass('cur');
                }else{
                    //alert('关注失败')
                }
            },
            error : function(err){
                console.log(err)
            }
        });
    });
    //取消关注主播
    $(document).on('click','.cancel',function(){
        var anId = $(this).parent().data("id") ;
        var userId = $('#login_a').attr('id');
        if(userId){
            $('#login_a').click();
        }else{
            $.ajax({
                type:"post",
                url:'/anchor/destroy',
                cache:false,
                data:{companyId:1,anchorId:anId},
                success : function(res){
                    if(res.number == '0'){
                        //成功
                        $('.follow').removeClass('cur');
                        $('.cancel').addClass('cur');
                    }else{
                        alert('关注失败')
                    }
                },
                error : function(err){
                    console.log(err)
                }
            });
        }

    });

    //关注主播列表
    $(document).on('click','.followAnchorBtn',function(){
        var data = {
            'companyId': 1
        };
        followAnchor(data);
    });
    //搜索关注主播
    $(document).on('click','#focusAnchor .searchBtn',function(){
        var anchorName = $('#focusAnchor .searchInput').val() ;
        var data = {
            'companyId': 1,
            'anchorName' : anchorName
        };
        followAnchor(data);
    });
    //关注主播列表
    function followAnchor(data){
        $.ajax({
            type:"get",
            url:'/user/follow/anchor/list',
            cache:false,
            data:data,
            success : function(res){
                if(res.code == '403'){
                    $('#login_a').click();
                }else if(res.number == '0'){
                    //成功
                    $('#focusAnchor ul').html('');
                    var html = template('followSearch', {data:res.data.list});
                    $('#focusAnchor ul').prepend(html);
                }else{
                    alert('关注失败')
                }
            },
            error : function(err){
                console.log(err)
            }
        });
    }






    $('.scrollTop').click(function(){
        $('.content').animate({scrollTop: '0px'}, 800);}
    );
    $(".content").scroll(function(){
        viewH =$(this).height();//可见高度
        scrollTop =$(this).scrollTop();//滚动高度
        if(scrollTop+100>viewH){
            $(".scrollTop").fadeIn();
        }
        else{
            $(".scrollTop").fadeOut();
        }

    });

    //我的相册-相册轮播
    $(".anchorBar").mouseover(function(event) {
        $(".anchorBar").stop().animate({'right':'0'},300);
        $(".barCon li").stop().animate({'padding':'14px 30px'},300);
        $(".searchBar .searchBtn").stop().animate({'left':'270px'},300);
        $(".searchBar .searchInput").css("visibility","visible");
    });
    $(".anchorBar").mouseleave(function(event) {
        $(".anchorBar").stop().animate({'right':'-268px'},300);
        $(".barCon li").stop().animate({'padding':'14px 6px'},300);
        $(".searchBar .searchBtn").stop().animate({'left':'20px'},300);
        $(".searchBar .searchInput").css("visibility","hidden");
    });
    $(document).on('click','.close',function(){
        $('.dialog').hide();
    })
    $(document).on('click','.dialog .pc-slide',function(){
        return false;
    });
    $(document).on('click','#album .photoList ul li',function(){
        $(this).parent('ul').siblings('.dialog').show();
        var viewSwiper = new Swiper('.view .albumBox', {
            onSlideChangeStart: function() {
                updateNavPosition()
            }
        })

        $(document).on('click','.view .arrow-left,.preview .arrow-left',function(e){
            e.preventDefault()
            if (viewSwiper.activeIndex == 0) {
                viewSwiper.swipeTo(viewSwiper.slides.length - 1, 1000);
                return
            }
            viewSwiper.swipePrev()
        })

        $(document).on('click','.view .arrow-right,.preview .arrow-right',function(e){
            console.log(1)
            e.preventDefault()
            if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
                viewSwiper.swipeTo(0, 1000);
                return
            }
            viewSwiper.swipeNext()
        })

        var previewSwiper = new Swiper('.preview .swiper-container', {
            visibilityFullFit: true,
            slidesPerView: 'auto',
            onlyExternal: true,
            onSlideClick: function() {
                viewSwiper.swipeTo(previewSwiper.clickedSlideIndex)
            }
        })

        function updateNavPosition() {
            $('.preview .active-nav').removeClass('active-nav')
            var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > previewSwiper.activeIndex) {
                    var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                    previewSwiper.swipeTo(activeNav.index() - thumbsPerNav)
                } else {
                    previewSwiper.swipeTo(activeNav.index())
                }
            }
        }
    });
    $(document).on('click','.albumList .list',function(){
        $(this).siblings('.dialog').show();
        var viewSwiper = new Swiper('.view .photoBox', {
            onSlideChangeStart: function() {
                updateNavPosition()
            }
        })

        $(document).on('click','.albumList .view .arrow-left,.albumList .preview .arrow-left',function(e){
            e.preventDefault()
            if (viewSwiper.activeIndex == 0) {
                viewSwiper.swipeTo(viewSwiper.slides.length - 1, 1000);
                return
            }
            viewSwiper.swipePrev()
        })

        $(document).on('click','.albumList .view .arrow-right,.albumList .preview .arrow-right',function(e){
            e.preventDefault()
            if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
                viewSwiper.swipeTo(0, 1000);
                return
            }
            viewSwiper.swipeNext()
        })

        var previewSwiper = new Swiper('.preview .swiper-container', {
            visibilityFullFit: true,
            slidesPerView: 'auto',
            onlyExternal: true,
            onSlideClick: function() {
                viewSwiper.swipeTo(previewSwiper.clickedSlideIndex)
            }
        })

        function updateNavPosition() {
            $('.preview .active-nav').removeClass('active-nav')
            var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > previewSwiper.activeIndex) {
                    var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
                    previewSwiper.swipeTo(activeNav.index() - thumbsPerNav)
                } else {
                    previewSwiper.swipeTo(activeNav.index())
                }
            }
        }
    });

    //我的相册-相册列表
    var index;
    $(document).on('click','.photoAlbum .list',function(){
        index = $(this).index();
        $('.photoList').children('div').eq(index).show();
        $('.photoAlbum').hide();
    });
    $(document).on('click','.album',function(){
        $('.photoAlbum').show();
        $('.photoList').children('div').eq(index).hide();
    });

    //主页、相册、mv之间切换，相册列表的显示隐藏
    function isBlock(name){
        $(document).on('click',name,function(){
            $('.albumList .photoAlbum').show();
            $('.albumList .photoList .imgList').hide();
        });
    }
    isBlock('.homepage');
    isBlock('.mv');

    /*tab切换*/
    $(document).on('click','.tabPane',function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var target = $(this).data("target");
        $(this).parents(".tabDiv").find(".tabContent").removeClass('active');
        $(target).addClass('active');
        if($('.tinyscrollbar2').get(0)){
            $('.tinyscrollbar2').tinyscrollbar();
        }
    });



    //分享
    function stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    };
    $(document).on('click', '.shareBox', function(e) {
        $('.share-dialog').toggle();
        stopPropagation(e);
    });
    $(document).on('click', document, function() {
        $('.share-dialog').css('display', 'none');
    });
    $(document).on('click', '.share-dialog', function(e) {
        stopPropagation(e);
    });

    $('.nav-anchor').addClass('active') ;
});