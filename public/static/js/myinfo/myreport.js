$(function() {
    var tipsLayer;
    $(".conRight").on("click",".searchBtn",function(){
        var startTime = $(".startTime").val();
        var endTime = $(".endTime").val();
        
        layer.close(tipsLayer);
        if(!startTime){
            tipsLayer = layer.tips('请选择时间','.startTime', {
                tipsMore: true,
                tips: [1, '#cc1616'],
                time: 4000
            });
            return false;
        }
        if(!endTime){
            tipsLayer = layer.tips('请选择时间','.endTime', {
                tipsMore: true,
                tips: [1, '#cc1616'],
                time: 4000
            });
            return false;
        }
        window.location.href = "?rType="+rType+"&startTime="+startTime+"&endTime="+endTime;
    })
    
    $(".tcdPageCode").unbind().createPage({
        total:total,
        pageCount:pages,
        current:parseInt(pageNum),
        pageSize:pageSize,
        backFn:function(p,pageSize){
            // getList(p,pageSize,mType)
            window.location.href = "?pageNum="+p+"&pageSize="+pageSize;
        }
    });
})