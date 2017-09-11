(function(win, lib) {
  /*
   * 简单的表单校验方法
   */
   var messages = {
    'mobile.exists' : '每个手机号仅能注册1个账号',
    'mobile.format' : '手机号格式有误',
    'password.format' : '由6-16位字母[区分大小写]、数字或符号组成 ，不允许空格',
    'passwordIdent.format':'再次输入不一致',
    'valideCode.format':'验证码为4位数字',
   },
   // 校验正则
   regMaps = {
    'mobile' : /^1[3578]\d{9}$/,
    'account' : /^\w{5,16}$/,
    'password' : /^\S{6,16}$/,
    'valideCode' : /^\d{4}$/,
   };
   var prevPass = '';
   var _inn = lib.form = {
      iconTog : function (icon, flag) {
        if(flag) {
          icon.removeClass('icon-err').addClass('icon-ok');
        } else {
          icon.removeClass('icon-ok').addClass('icon-err');
        }
       },
       checkField : function (e) {
          var input = $('[name='+e.name+']'),
              icon = input.siblings('.icon'),
              msgel = input.siblings('.field-tip');
              if(e.name === 'hasRead') {
                return true;
              }
              if(e.name==='passwordIdent') {
                var isOK = (e.value!=='' && e.value === prevPass)
              } 
              else if(e.name ==='account') {
                var isOK = regMaps[e.name].test(e.value) || regMaps['account'].test(e.value)
              } else {
                var isOK = regMaps[e.name].test(e.value);
              }

              if(isOK) {
                _inn.iconTog(icon, true);
                if(e.name==='password') {
                  prevPass = e.value;
                }
                msgel.html('').parent().removeClass('invalid')
                return true;
              } else {
                _inn.iconTog(icon, false)
                msgel.html(messages[e.name +　'.format'])
              }

              return false;
        },
        btnCountdown :function (btn, st) {
            btn.removeClass('btn-main').addClass('btn-disable');
            btn.html(st +'秒后重新发送');
            var TM1 = setInterval(function() {
                if(st < 1) {
                  clearInterval(TM1);
                  btn.addClass('btn-main').removeClass('btn-disable')
                  .html('免费获取验证码');
                  return;
                }
                btn.html(st +'秒后重新发送');
                st--;
            }, 1000);
        },
        showMsg:function(name, msgcode) {
          var input = $('[name=' +name+']'),
              icon = input.siblings('.icon');
              tipField = input.siblings('.field-tip');
              _inn.iconTog(icon, false);

            var msg = (msgcode in messages)?messages[msgcode]:msgcode;
              
            tipField.html(msg);
        }
   };
})(window, window.lib||(window.lib={}));