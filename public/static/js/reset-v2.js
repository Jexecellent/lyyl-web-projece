$(function(){
  /*
   * 重置密码
   */
   $('#resetForm').on('submit', function(E){
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

        console.log('SSS=>', size, subData);

        if( size >= 4 ) {
            delete subData.passwordIdent;
            subData.password = md5(subData.password).toUpperCase();
            subData.companyId = 1
            lib.api.senPost('USER_RESETPASS', subData, function(resp) {
                if(resp.number === '0') {
                  alert('密码重置成功，现在可以登录了');
                } else {
                  if(resp.number ==='10009') {
                    lib.form.showMsg('mobile', 'mobile.exists');
                  }
                }
            });
        }
   })

   .on('blur', 'input', function() {
      var t = $(this);
      if(!this.name) return;
      var e = {
        value:t.val(),
        name:t.attr('name')
      };
      lib.form.checkField(e);
   })

   .on('click', '.btn-sendcode', function(e){
      var mobile = $('[name=mobile]'),
          codeInput = $('[name=valideCode]'),
          val = mobile.val(),
          btn = $(this);
      if(btn.hasClass('btn-disable')) return ;
      if(val.length===11) {
        lib.api.senPost('GET_SMSCODE', {
            mobile:val
        }, function(resp){
          if(resp.number === '0') {
            if('data' in resp && resp.data.length === 4) {
                codeInput.val(resp.data);
            }
          }
        }, function() {
          // 请求完成
          lib.form.btnCountdown(btn, 60)
        })
      } else {
        lib.form.checkField({name:'mobile',value:val});
      }
   })
});