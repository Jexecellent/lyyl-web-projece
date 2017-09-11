/**
 * Created by Administrator on 2017/6/8.
 */
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

})

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
});

/*tab切换*/
$(document).on("click",".tabPane",function(){
    $(this).parent().siblings().find("a").removeClass('active');
    $(this).addClass('active');
    var target = $(this).data("target");
    $(this).parents(".tabDiv").find(".tabContent").removeClass('active');
    $(target).addClass('active');
    if($('.tinyscrollbar2').get(0)){
        $('.tinyscrollbar2').tinyscrollbar();
    }
})