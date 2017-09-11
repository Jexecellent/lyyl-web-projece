/**
 * Created by Administrator on 2017/6/8.
 */

$(function(){
    //获取URL地址某个值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    var vId = getQueryString('id');
    $('#'+ vId).addClass('active')

    //滚动条
    $(".rightC").panel({iWheelStep: 32});

    //评论
    $(document).on('click','.sendBtn',function(){
        var videoId = $(this).parent().data('videoid');
        var content = $('.commentInput').val();
        var islogin = $('#login_a').attr('id');
        var userName = $('.username a').html();
        if(islogin){
            $('#login_a').click();
        }else{
            if(content != ""){
                $.ajax({
                    type:"get",
                    url:'/mv/comment',
                    cache:false,
                    data:{content:content,videoId:videoId,userName:userName},
                    success : function(res){
                        if(res.addComment.flag == 0){
                            $('.commentInput').val("")
                        .attr('placeholder','我也要评论！')
                            $.ajax({
                                type:"get",
                                url:'/mv/cList',
                                cache:false,
                                data:{videoId:videoId},
                                success : function(res){
                                    $('.commentList').html('');
                                    var htmlInfo = template('comment', {data:res.cList.data});
                                    $('.commentList').prepend(htmlInfo);
                                },
                                error : function(err){
                                    console.log(err)
                                }
                            });
                        }else{
                            layer.alert('评论失败')
                        }
                    },
                    error : function(err){
                        console.log(err)
                    }
                });
            }else{
                layer.alert('内容不能为空')
            }
        }
    });


    //分页
    var videoId = $('.commentDiv').data('videoid');
    var page = new Paging();
    $.get('/mv/cList',{current:1,pagesize:10,videoId:videoId},function(res){
         var total = res.cList.data.total;
         if(total == 0){
            $('#pageTool').remove();
         }
         $('.commentList').html('');
         var htmlInfo = template('comment', {data:res.cList.data});
         $('.commentList').prepend(htmlInfo);
         page.init({
             target: $('#pageTool'), pagesize: 10, count: res.cList.data.total, current:1,callback: function (pagecount, size, count) {
             $.get('/mv/cList',{current:pagecount,pagesize:10,videoId:videoId},function(res){
                 $('.commentList').html('');
                 var htmlInfo = template('comment', {data:res.cList.data});
                 $('.commentList').prepend(htmlInfo);
             })
             }
         });
     });


    //点赞
    $(document).on('click','.praiseBtn',function() {
        var sum = $('.praiseBtn span').html();
        var videoId = $('.commentDiv').data('videoid');
        var islogin = $('#login_a').attr('id');
        if(islogin){
            $('#login_a').click();
        } else {
            lib.api.senGet('VIDEO_APPRECIATEVIDEO', {videoId:videoId}, function(res) {
                if(res.flag == 0) {
                    sum = Number(sum) + 1;
                    $('.praiseBtn span').html(sum);
                    //layer.alert('点赞成功');
                }else{
                    //layer.alert('点赞失败')
                }
                //layer.alert('点赞成功');
            });
        }
    });

    //关注
    $(document).on('click','.focusBtn',function(){
        var anId = location.href;
        var sum = $('.focusGroup span').html();
        lib.api.senPost('USER_FOLLOW_ANCHOR', {companyId:1,anchorId:anId}, function(res) {
            if(res.code == '403'){
                $('#login_a').click();
            }else if(res.number == '0'){
                $('.focusBtn').remove();
                $('.concernBtn').show();
                sum = Number(sum) + 1;
                $('.focusGroup span').html(sum);
            }else{
                layer.alert('关注失败')
            }
        });
    });



    //返回顶部
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

});