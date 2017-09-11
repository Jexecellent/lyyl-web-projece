//删除多条消息
$(".conRight").on("click",".deleteBtn",function(){
    var mid = $(this).data("mid");
    layer.confirm('是否删除该消息？', {
        title: '提示',
        skin: 'haiyao-class',
        area: ['320px', '155px'],
        btn: ['取消','确认'] //按钮
    }, function(){
        layer.closeAll();
    }, function(){
        $.ajax({
            type:"POST",
            url: '/message/delete/more',
            cache:false,
            data:{idstr:mid},
            success : function(res){
                if(res.number==0){
                    layer.msg('删除成功');
                    window.location.href = document.referrer;
                }else{
                    layer.msg('删除失败');
                }
            }
        })
    });
})