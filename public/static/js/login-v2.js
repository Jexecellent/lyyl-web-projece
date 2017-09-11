$(function(){
  /* 
   * 新版的Login
   */
   var regMob = /^1[3578]\d{9}$/;
   $('#loginForm').on('submit', function(E){
      E.preventDefault();
      var form = $(this),
        subData = {},
        fData = form.serializeArray();
        $.each(fData, function(i,e) {
          var input = $('[name='+e.name+']'),
            field = input.parent(),
            errTip = input.siblings('.field-tip');
            if(e.value!=='') {
                if(lib.form.checkField(e)) {
                  subData[e.name] = e.value;
                }
            } else {
              field.addClass('invalid')
              lib.form.iconTog(field.find('.icon'), false)
            }
        });
        var size = lib.api.size(subData);

        if(size>=2) {
          if(regMob.test(subData.account)) {
            subData.mobile = subData.account;
            delete subData.account;
          }
          subData.password = md5(subData.password).toUpperCase();
          subData.source = 1;
          subData.loginType = 2;
          lib.api.senPost('USER_LOGIN', subData, function(resp){
            if(resp.number === '0') {
              location.href = '/';
            } else {
              lib.form.showMsg('mobile', resp.detailMsg);
            }
          })
        }
   })
   
})