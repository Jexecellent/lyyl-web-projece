/**
 * Created by Administrator on 2017/6/22.
 */
function activityPage(url){
    location.href = url;
};

$('.state').next().addClass('cursor');
$('.ended').next().addClass('cursor');

$(function(){
    $('.activity-content-unit').eq(0)
        .find('h3').addClass('selected');

    $('.content-detail').find('h3').hover(function(){
        $(this).addClass('selected')
            .parents('.activity-content-unit')
            .siblings()
            .find('h3')
            .removeClass('selected')
    },function(){
        setTimeout(function(){
            $(this).removeClass('selected')
        }.bind(this),500)
    });


    $('.coming').next()
        .find('img')
        .css({'cursor':'default'})
        .removeAttr('onclick')
        .end()
        .siblings('.content-detail')
        .find('h3')
        .css({'cursor':'default', 'color': '#000'})
        .removeAttr('onclick');
})