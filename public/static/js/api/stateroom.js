var blindArr =  [10,20,50,100,200,500,1000,5000,10000,50000,100000] ;
var orgeArr = [300,600,900,1200,1500,1800,2100,3000,3600,4200,4800] ;
var timeArr = [0.5,1,1.5,2,2.5,3,3.5,5,6,7,8] ;
var peopleArr=[2,6,9];//人数
var minCarryArr=[50,100,200,300,400,500];//最小带入
var maxCarryArr=[100,200,300,400,500,600,700,800,900,1000,"无上限"];//最大带入
var totalCarryArr=[0,500,1000,1500,2000,"无上限"];//总带入
var anteArr = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];//底注

var blind = blindArr[0];//盲注
var people = peopleArr[2];
var minCarry = blindArr[0] * minCarryArr[0];//最小带入
var maxCarry = blindArr[0] * maxCarryArr[0];//最大带入
var totalCarry = blindArr[0] * totalCarryArr[0];//总带入
var ante = blindArr[0] * anteArr[0];//底注

var timeIndex = 0;
var peopleIndex = 2;
var minCarryIndex = 0;
var maxCarryIndex = 0;
var totalCarryIndex = 0;
var anteIndex = 0;


var stateroom={
    createRoom : function(){
        var roomName = 'sqf';
        var roomPass;

        var randCharacter = "";
        for(var i = 0; i < 3; i++){
            var r = String.fromCharCode(Math.floor(Math.random()*26)+"a".charCodeAt(0));
            randCharacter += r;
        }
        var randNum = "";
        for(var i = 0; i < 3; i++){
            var r = Math.floor(Math.random() * 10);
            randNum += r;
        }
        roomName = roomName + "的包厢";
        roomPass = randCharacter + randNum;

        var html = '<div class="stateroom"><div class="stateCon"><div class="formGroup"><label class="controlLabel">包厢名：</label><input id="roomName" type="text" placeholder="请输入包厢名称" value="'+roomName+'"></div><div class="formGroup"><label class="controlLabel">包厢类型：</label><input type="radio" class="checkInput" id="checkOpen" style="display: none;" name="roomType" value="true" checked><label class="checkLabel" for="checkOpen"><span>√</span></label><span class="status">公开</span><input type="radio" class="checkInput" id="checkPrivate" style="display: none;" name="roomType" value="false"><label class="checkLabel" for="checkPrivate"><span>√</span></label><span class="status">私有</span></div><div class="formGroup passGroup hide"><label class="controlLabel">密码：</label><input id="roomPass" type="text" placeholder="请输入进入密码" value="'+roomPass+'"></div><div class="formGroup"><label class="controlLabel">发牌模式：</label><input type="radio" class="checkInput" id="checkAnchor" style="display: none;" name="dealType" value="1" checked><label class="checkLabel" for="checkAnchor"><span>√</span></label><span class="status">主播发牌</span><input type="radio" class="checkInput" id="checkComputer" style="display: none;" name="dealType" value="3"><label class="checkLabel" for="checkComputer"><span>√</span></label><span class="status">电脑发牌</span></div><div class="slideGroup blindGroup blue"><div class="groupDiv"><span class="spanLeft">盲注：<b id="blindVal">10</b></span></div><input id="blindSlider" type="range" min="0" max="10" value="0" data-rangeslider></div><div class="slideGroup timeGroup orange"><div class="groupDiv"><span class="spanLeft">时间：<b id="timeVal">0.5小时</b></span><span class="spanRight">费用：<b id="priceVal">300</b></span></div><input id="timeSlider" type="range" min="0" max="10" value="0" data-rangeslider></div><div class="highDiv"><a class="highSet" href="#">高级设置</a></div><div class="roomDetail"><span id="peopleSpan">'+people+'</span>人桌&nbsp;|&nbsp;最小带入：<span id="minCarrySpan">'+minCarry+'</span>&nbsp;|&nbsp;最大带入：<span id="maxCarrySpan">'+maxCarry+'</span>&nbsp;|&nbsp;总带入：<span id="totalCarrySpan">'+totalCarry+'</span>&nbsp;|&nbsp;底注：<span id="anteSpan">'+ante+'</span> </div></div><div class="roomBot"><a id="createRoomBtn" href="javascript:" class="btnCreateRoom"></a></div></div>';

        layer.open({
            title: '创建包厢',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                var $inputRange = $('[data-rangeslider]');
                $(document).on('input', '#blindSlider', function(e) {
                    var value = $(this).val();
                    blind = blindArr[value];
                    $("#blindVal").text(blind);

                    $("#peopleSpan").text(peopleArr[peopleIndex]);
                    $("#minCarrySpan").text(blind * minCarryArr[minCarryIndex]);
                    $("#maxCarrySpan").text(blind * maxCarryArr[maxCarryIndex]);
                    $("#totalCarrySpan").text(blind * totalCarryArr[totalCarryIndex]);
                    $("#anteSpan").text(blind * anteArr[anteIndex]);
                    
                    if(maxCarryIndex==10){
                        $("#maxCarrySpan").text(maxCarryArr[maxCarryIndex]);
                    }
                    if(totalCarryIndex==5){
                        $("#totalCarrySpan").text(totalCarryArr[totalCarryIndex]);
                    }


                });
                $(document).on('input', '#timeSlider', function(e) {
                    var value = $(this).val();
                    timeIndex = value;
                    $("#timeVal").text(timeArr[value]);
                    $("#priceVal").text(orgeArr[value]);
                });
                $inputRange.rangeslider({
                    polyfill: false
                });

                $(document).on('click','input[name="roomType"]',function(){
                    var val = $(this).val();
                    if(val=="true"){
                        $(".passGroup").hide()
                    }else{
                        $(".passGroup").show()
                    }
                })
            }
        })
    },
    highSet : function(){
        var html = '<div class="stateroom"><a class="helpBtn" href="javascript:"><img src="/static/img/icon_shezsm.png"></a><div class="stateCon"><div class="slideGroup blindGroup"><div class="groupDiv"><span class="spanLeft">人数：<b id="peopleVal">'+peopleArr[peopleIndex]+'</b>人</span></div><input id="peopleSlider" type="range" min="0" max="2" value="'+peopleIndex+'" data-rangeslider></div><div class="slideGroup blindGroup"><div class="groupDiv"><span class="spanLeft">最小带入：<b id="minCarryVal">'+minCarryArr[minCarryIndex]*blind+'</b></span></div><input id="minCarrySlider" type="range" min="0" max="5" value="'+minCarryIndex+'" data-rangeslider></div><div class="slideGroup blindGroup"><div class="groupDiv"><span class="spanLeft">最大带入：<b id="maxCarryVal">'+maxCarryArr[maxCarryIndex]*blind+'</b></span></div><input id="maxCarrySlider" type="range" min="0" max="10" value="'+maxCarryIndex+'" data-rangeslider></div><div class="slideGroup blindGroup"><div class="groupDiv"><span class="spanLeft">总带入：<b id="totalCarryVal">'+totalCarryArr[totalCarryIndex]*blind+'</b></span></div><input id="totalCarrySlider" type="range" min="0" max="5" value="'+totalCarryIndex+'" data-rangeslider></div><div class="slideGroup blindGroup"><div class="groupDiv"><span class="spanLeft">底注（ANTE）：<b id="anteVal">'+anteArr[anteIndex]*blind+'</b></span></div><input id="anteSlider" type="range" min="0" max="8" value="'+anteIndex+'" data-rangeslider></div></div><div class="roomBot"><a id="btnConfirmHighset" href="javascript:" class="btnConfirm">确定</a></div></div>';

        var setLayer = layer.open({
            title: '高级设置',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                var $inputRange = $('[data-rangeslider]');
                $inputRange.rangeslider({
                    polyfill: false
                });

                var indexArr = [peopleIndex,minCarryIndex,maxCarryIndex,totalCarryIndex,anteIndex];

                $(document).on('input', '#peopleSlider', function(e) {
                    var value = $(this).val();
                    $("#peopleVal").text(peopleArr[value]);

                    indexArr[0] = value;
                });
                $(document).on('input', '#minCarrySlider', function(e) {
                    var value = parseInt($(this).val());
                    $("#minCarryVal").text(blind * minCarryArr[value]);
                    if(blind * minCarryArr[value]>blind * maxCarryArr[indexArr[2]]){
                        indexArr[2] = value-1;
                        $("#maxCarrySlider").val(value-1).change();
                    }
                    indexArr[1] = value;

                });
                $(document).on('input', '#maxCarrySlider', function(e) {
                    var value = parseInt($(this).val());
                    $("#maxCarryVal").text(blind * maxCarryArr[value]);
                    if(value==10){
                        $("#maxCarryVal").text(maxCarryArr[value]);
                    }

                    if(blind * minCarryArr[indexArr[1]]>blind * maxCarryArr[value]){
                        indexArr[1] = value+1;
                        $("#minCarrySlider").val(value+1).change();
                    }

                    indexArr[2] = value;
                });
                $(document).on('input', '#totalCarrySlider', function(e) {
                    var value = $(this).val();
                    $("#totalCarryVal").text(blind * totalCarryArr[value]);
                    if(value==5){
                        $("#totalCarryVal").text(totalCarryArr[value]);
                    }

                    indexArr[3] = value;
                });
                $(document).on('input', '#anteSlider', function(e) {
                    var value = $(this).val();
                    $("#anteVal").text(blind * anteArr[value]);

                    indexArr[4] = value;
                });

                $(document).on('click', '#btnConfirmHighset', function(e) {

                    peopleIndex = indexArr[0];
                    minCarryIndex = indexArr[1];
                    maxCarryIndex = indexArr[2];
                    totalCarryIndex = indexArr[3];
                    anteIndex = indexArr[4];

                    $("#peopleSpan").text(peopleArr[peopleIndex]);
                    $("#minCarrySpan").text(blind * minCarryArr[minCarryIndex]);
                    $("#maxCarrySpan").text(blind * maxCarryArr[maxCarryIndex]);
                    $("#totalCarrySpan").text(blind * totalCarryArr[totalCarryIndex]);
                    $("#anteSpan").text(blind * anteArr[anteIndex]);

                    if(maxCarryIndex==10){
                        $("#maxCarrySpan").text(maxCarryArr[maxCarryIndex]);
                    }
                    if(totalCarryIndex==5){
                        $("#totalCarrySpan").text(totalCarryArr[totalCarryIndex]);
                    }

                    layer.close(setLayer);
                });

            }
        })
    },
    setHelp : function(){
        var html = '<div class="stateroom"><div class="stateCon"><div class="formGroup"><span class="detailLeft">人数：</span><span class="detailRight">牌局人数上限</span></div><div class="formGroup"><span class="detailLeft">最小带入：</span><span class="detailRight">每次带入金币的最小数量</span></div><div class="formGroup"><span class="detailLeft">最大带入：</span><span class="detailRight">每次带入金币的最大数量</span></div><div class="formGroup"><span class="detailLeft">总带入：</span><span class="detailRight">玩家在一局牌局中，累计可以带入金币的上限，房主可在牌局中重新修改，并且可对任意玩家单独设置。</span></div><div class="formGroup"><span class="detailLeft">底注（ANTE）：</span><span class="detailRight">每局开始的时候，非大盲、小盲位置玩家必须投入地池的金币数量。</span></div></div><div class="roomBot"><a id="btnSetHelp" href="javascript:" class="btnConfirm">确定</a></div></div>';

        var setHelpLayer = layer.open({
            title: '设置说明',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                $(document).on('click', '#btnSetHelp', function(e) {
                    layer.close(setHelpLayer);
                });
            }
        })
    },
    enterRoomTip : function(){
        var html = '<div class="stateroom"><div class="stateCon"><div class="formGroup"><label class="controlLabel">包厢号：</label><span>7670</span></div><div class="formGroup"><label class="controlLabel">包厢名：</label><span>7670的包厢</span></div><div class="formGroup"><label class="controlLabel">密码：</label><span>6551</span></div><div class="formGroup"></div><div class="formGroup"><label class="controlLabel">发牌类型：</label><span>无视频房</span></div><div class="formGroup"><label class="controlLabel">盲注：</label><span>10</span></div><div class="formGroup"><label class="controlLabel">携带：</label><span>2000</span></div><div class="formGroup"><label class="controlLabel">包厢时间：</label><span>6月16日 11时59分 至 6月16日 12时29分</span></div></div><div class="roomBot"><a id="btnSetHelp" href="javascript:" class="btnConfirm">确定</a></div></div>';

        var roomTipLayer = layer.open({
            title: '创建成功',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                $(document).on('click', '#btnSetHelp', function(e) {
                    layer.close(roomTipLayer);
                });
            }
        })
    },
    roomEdit : function(){
        var html = '<div class="stateroom"><div class="stateCon"><div class="formGroup"><label class="controlLabel">包厢号：</label><span>7670</span></div><div class="formGroup"><label class="controlLabel">包厢名：</label><input type="text" placeholder="请输入包厢名称" value="sqf的包厢"></div><div class="formGroup"><label class="controlLabel">密码：</label><input id="roomName" type="text" placeholder="请输入进入密码" value="asd451"></div><div class="formGroup"></div></div><div class="roomBot"><a id="btnSetHelp" href="javascript:" class="btnConfirm">修改</a></div></div>';

        var roomTipLayer = layer.open({
            title: '房主配置',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                $(document).on('click', '#btnSetHelp', function(e) {
                    layer.close(roomTipLayer);
                });
            }
        })
    },
    roomAddtime : function(){
        var html = '<div class="stateroom"><div class="stateCon"><div class="formGroup"><label class="controlLabel">包厢号：</label><span>7670</span></div><div class="formGroup"><label class="controlLabel">剩余时间：</label><span>0小时29分钟</span></div><div class="slideGroup timeGroup orange"><div class="groupDiv"><span class="spanLeft">续时：<b id="timeVal">0.5小时</b></span><span class="spanRight">费用：<b id="priceVal">300</b></span></div><input id="timeSlider" type="range" min="0" max="10" value="0" data-rangeslider></div></div><div class="roomBot"><a id="btnSetHelp" href="javascript:" class="btnConfirm">续时</a></div></div>';

        var roomTipLayer = layer.open({
            title: '包厢续时',
            type: 1,
            skin: 'stateroom-class',
            content: html,
            area: ['680px',''],
            success: function(){
                var $inputRange = $('[data-rangeslider]');
                $(document).on('input', '#timeSlider', function(e) {
                    var value = $(this).val();
                    $("#timeVal").text(timeArr[value]);
                    $("#priceVal").text(orgeArr[value]);
                });
                $inputRange.rangeslider({
                    polyfill: false
                });
                $(document).on('click', '#btnSetHelp', function(e) {
                    layer.close(roomTipLayer);
                });
            }
        })
    }
}

/*-------包厢功能 start------*/
//创建包厢
$(document).on('click','.createRoom',function(){
    stateroom.createRoom();
})
//高级设置
$(document).on('click','.highSet',function(){
    stateroom.highSet();
})
//高级设置帮助
$(document).on('click', '.helpBtn', function() {
    stateroom.setHelp();
})

//创建包厢请求
$(document).on('click', '#createRoomBtn', function() {
    var jsonData = {};
    layer.close(tipsNameLayer);
    layer.close(tipsPassLayer);
    if(verifyRoomName($('#roomName').val()) && verifyRoomPass($('#roomPass').val())){
        jsonData.roomName = $('#roomName').val();
        jsonData.open = $('input[name="roomType"]:checked').val();
        jsonData.type = $('input[name="dealType"]:checked').val();
        jsonData.blind = blind;
        jsonData.expire = timeArr[timeIndex];
        jsonData.seats = peopleArr[peopleIndex];
        jsonData.minCarry = blind * minCarryArr[minCarryIndex];
        if(jsonData.open=="false"){
            jsonData.password = $('#roomPass').val();
        }
        if(maxCarryIndex<10){
            jsonData.maxCarry = blind * maxCarryArr[maxCarryIndex];
        }
        if(totalCarryIndex<5){
            jsonData.totalCarry = blind * totalCarryArr[totalCarryIndex];
        }
        jsonData.lowestBlind = blind * anteArr[anteIndex];


        console.log(jsonData)
        // alert('验证通过')
        // $.post('/room/roomCreate', jsonData, function (res) {
        //
        // })
    }

})

//包厢名验证
var tipsNameLayer;//提示弹窗
$(document).on('keyup', '#roomName', function() {
    var val = $(this).val();
    verifyRoomName(val);
})
var tipsPassLayer;//提示弹窗
$(document).on('keyup', '#roomPass', function() {
    var val = $(this).val();
    verifyRoomPass(val);
})


//验证包厢名
function verifyRoomName(val){
    layer.close(tipsNameLayer);
    if(val.len()>2&&val.len()<23){
        return true;
    }
    else{
        tipsNameLayer = layer.tips('由3-22位字母、数字，或2-11位中文字符组成','#roomName', {
            tipsMore: true,
            tips: [1, '#cc1616'],
            time: 4000
        });
        return false;
    }
}
//验证包厢密码
function verifyRoomPass(val){
    layer.close(tipsPassLayer);
    if(val.length>2&&val.length<17&&!/[\u4e00-\u9fa5]/g.test(val)&&val.indexOf(" ")==-1){
        return true;
    }
    else{
        tipsPassLayer = layer.tips('由3-16位字母（区分大小写）、数字或符号组成、不允许空格','#roomPass', {
            tipsMore: true,
            tips: [1, '#cc1616'],
            time: 4000
        });
        return false;
    }
}
//创建包厢成功提示
// stateroom.enterRoomTip();
// stateroom.roomEdit();
// stateroom.roomAddtime();
/*-------包厢功能 end------*/