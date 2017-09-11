    $('.scrollTop').unbind().click(function() {
      $('.content').animate({scrollTop: 0}, 800);}
    );

    $('.refreshBtn').on('click', function() {
        var data = {
          'roomId' : 1,
          'userId' : 1
        };
        lib.api.senGet('LIVE_REFRESH_AUTHKEY', data, function(resp){
          if(resp.number === '0') {
              $('#streamkey').val(resp.data);
              layer.msg('刷新成功！');
            }
        });
    }); 

    var clipboard = new Clipboard('.btn');
    clipboard.on('success', function(e) {
        layer.msg('复制成功！');
    })

    $(".content").scroll(function() {
      viewH =$(this).height();//可见高度  
          scrollTop =$(this).scrollTop();//滚动高度
          if(scrollTop+100>viewH){
            $(".scrollTop").fadeIn();
          }
          else{
            $(".scrollTop").fadeOut();
          }

    })

    /*直播分类弹窗*/
    $('.livetypeBtn').on('click', function(){
      layer.open({
        title: '直播分类',
        skin: 'haiyao-class',
        type: 1,
        area: ['265px', '245px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="gameplayDiv"><div class="tip">请选择游戏玩法</div><div><a href="javascript:" data-type="1">德州扑克</a></div><div><a class="active" href="javascript:" data-type="2">斗地主</a></div><div><a href="javascript:" data-type="3">其他游戏</a></div></div>'
      });
    });

    /*游戏玩法弹窗*/
    $('.gameplayBtn').on('click', function(){
      layer.open({
        title: '游戏玩法',
        skin: 'haiyao-class',
        type: 1,
        area: ['265px', '195px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="gameplayDiv"><div class="tip">请选择游戏玩法</div><div><a href="javascript:">主播发牌</a></div><div><a class="active" href="javascript:">主播陪玩</a></div></div>'
      });
    });

    /*用户发言设置弹窗*/
    $('.usersetBtn').on('click', function(){
      layer.open({
        title: '用户发言设置',
        skin: 'haiyao-class',
        type: 1,
        area: ['390px', '208px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="usersetDiv"><div class="formGroup"><label>用户账号：</label><input type="checkbox" id="you09"><label for="you09">仅超管，主播，管理员发言</label></div><div class="btnGroup"><a class="btn big blueB" href="javascript:">取消</a><a class="btn big blue" href="javascript:">确定</a></div></div>'
      });
    });

    /*添加管理员弹窗*/
    $('.addmanagerBtn').on('click', function(){
      layer.open({
        title: '添加管理员',
        skin: 'haiyao-class',
        type: 1,
        area: ['390px', '232px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="addmanagerDiv"><div class="formGroup"><label>用户账号：</label><input type="text"></div><div class="btnGroup"><a class="btn big blueB" href="javascript:">取消</a><a class="btn big blue" href="javascript:">确定</a></div></div>'
      });
    });

    /*添加禁言弹窗*/
    $('.addblackBtn').on('click', function(){
      layer.open({
        title: '禁止发言',
        skin: 'haiyao-class',
        type: 1,
        area: ['390px', '272px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="addblackDiv"><div class="formGroup"><label>用户账号：</label><input type="text"></div><div class="formGroup"><label>禁言时间：</label><span class="mySelect"><input class="selectInput" type="text" name="" disabled="" value="1天"><i class="icon-arrow"></i><div class="selectDown"><ul><li><a class="active" href="javascript:">1天</a></li><li><a href="javascript:">2天</a></li><li><a href="javascript:">3天</a></li></ul></div></span></div><div class="btnGroup"><a class="btn big blueB" href="javascript:">取消</a><a class="btn big blue" href="javascript:">确定</a></div></div>'
      });
    });

    /*解除禁言弹窗*/
    $('.unbindBtn').on('click', function(){
      layer.open({
        title: '解除禁言',
        skin: 'haiyao-class',
        type: 1,
        area: ['390px', '232px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="unbindDiv"><div class="tip"><img src="./static/img/icon_question.png">您确认解除操作？</div><div class="btnGroup"><a class="btn blueB big" href="javascript:">取消</a><a class="btn blue big" href="javascript:">确定</a></div></div>'
      });
    });

    /*积分记录弹窗*/
    $('.creditslogBtn').on('click', function(){
      layer.open({
        title: '积分记录',
        skin: 'haiyao-class',
        type: 1,
        area: ['800px', '545px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="creditslogList"><table><thead><th>序号</th><th>日期时间</th><th>获得途径</th><th>积分状态</th><th>账号积分</th></thead><tbody><tr><td>1</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>2</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>3</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>4</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>5</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>6</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>7</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>8</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>9</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr><tr><td>10</td><td>2017-6-2 10:29:00</td><td>签到获得</td><td>+20</td><td>2000</td></tr></tbody></table></div>'
      });
    });

    /*主播上传MV弹窗*/
    $('.uploadMvBtn').on('click', function(){
      layer.open({
        title: '上传MV',
        skin: 'haiyao-class',
        type: 1,
        area: ['600px', '360px'],
        shadeClose: true, //点击遮罩关闭
        content: '<div class="form"><div class="formGroup"><label class="formLabel">MV名称：</label><input class="formInput" type="text" name="" placeholder="请输入MV名称最多八个字"></div><div class="formGroup"><label class="formLabel">MV名称：</label><input class="formInput" type="text" name="" placeholder="请选择上传MP4/flv格式的MV"><label class="btn blue min chooseBtn">选择文件<input class="hidden" type="file" name=""></label></div><div class="formGroup"><label class="formLabel">MV名称：</label><textarea class="formTextarea" rows="5" placeholder="请输入20字内的MV描述"></textarea></div><div class="formBtn"><a class="btn blue" href="javascript:">上传</a></div></div>'
      });
    });