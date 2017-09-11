/*
 * Ajax 发起方法
 */
(function(win, lib) {
  // 依赖 jQuery或Zepto layui

  var curOBJ = {}; // 防止重复请求
  
  function revokeAjax(met, url, data, onSuccess, onComplete, onError) {
    return $.ajax({
      url:getURL(url),
      method:met,
      data:data,
      cache:false,
      dataType:'json',
      timeout:20000,
      xhrFields: {
        withCredentials: true
      },
      success:function(resp) {
        onSuccess&&onSuccess(resp);
      },
      complete:function(jq, statusText) {
        onComplete&&onComplete(statusText);
      },
      error:function(jq, statusText) {
        //
        layer.msg('服务器开小差了~~');
        onError&&onError(statusText);
      }
    });
  }

  function getURL(apiName) {
        return  '/tranApi?api=' + apiName.toUpperCase();
  }

  lib.api = {
    getURL : getURL,
    senPost : function() {
        var arr = ['POST'].concat([].slice.call(arguments, 0));

        return revokeAjax.apply(win, arr);
    },

    senGet : function() {
        var arr = ['GET'].concat([].slice.call(arguments, 0));
        return revokeAjax.apply(win, arr);
    },
    
    size : function(obj) {
      return Object.keys(obj).length;
    }
  }


})(window, window.lib||(window.lib={}));