/**
 * Created by fc on 2016/5/20.
 */
var hhly_login = function ($,window) {

	
	var currentURL= window.location.href;
	
    // 暴露的方法
    var _this = {};
    // 避免冲突提交
    var _submit = false;

    // 本机地址
    var urlheader = "http://platform.1332255.com/";
    // 初始化给dom添加div
    var init = function () {
        $(document).ready(function () {
            loadCssDiv();
            bindEvent();
        });
    };

    var _config = {};

    // 初始化配置
    _this.initConfig = function (config) {
        _config = config || {};
        var url = _config["url"] || window.location.href;

       
        // 注册跳转返回URL，附加参数为游客帐号，用于游戏中帐号绑定
        var redirectUrl = url;
        var search = window.location.search;// eg: ?foo=bar&name=rock
        var tigerGuestId = _config['ly_tiger_guestUserID'] || '';
        var comeFrom = _config['comeFrom'] || '';
        var partnerNo = _config['partnerNo'] || '';
        
        if (tigerGuestId) {
            // 判断请求地址是否包含参数，存在则清除查询参数，避免重复添加请求参数
            if (search) {
                redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));
            }
            redirectUrl = redirectUrl + '?ly_tiger_guestUserID=' + tigerGuestId+"&comeFrom="+comeFrom;
        }

    };
    // 显示登录弹出层
    _this.show = function(){
        // 显示登录窗口
        $('#hhly_sso_login_mask').fadeIn(100);
        $('#hhly_sso_login_mask').css("opacity","0.6");
        $('#hhly_sso_login').slideDown(200);
        //$("body").height($(window).height()).css({ "overflow": "hidden"});
    };

    // 关闭弹出层
    function hide(){
        $('#hhly_sso_login_mask').fadeOut(100);
        $('#hhly_sso_login').slideUp(200);
        $("body").height($(window).height()).css({ "overflow": ""});
        // 清理表单值
        $("#hhly_sso_login_account").val("");
        $("#hhly_sso_login_password").val("");
        $("#hhly_sso_login_error").html("");
    }

    // 绑定事件
    function bindEvent(){
        // 关闭
        $("#hhly_sso_login_close").click(function(){
            hide();
        });

        // 下次自动登录
        $("#hhly_sso_login_check").click(function () {
            $(this).toggleClass("check");
        });
        
        // 登录
        $("#hhly_sso_login_submit").click(function () {
            var account = $("#hhly_sso_login_account").val();
            var password = $("#hhly_sso_login_password").val();
            var autologin = $("#hhly_sso_login_check").hasClass("check");
            // 判断入参
            if(!account || !password) return;
            var platformId = _config["platformId"] || 1;
            var comeFrom = _config['comeFrom'] || '';
            /*
             * params
             */
            var params = {
                "password":hex_md5(password).toUpperCase(),
                "cid" : 1,
                'source' : 1
            };
            var regMob = /^1[3587]\d{9}$/;
            if(regMob.test(account)) {
                params.mobile = account;
            } else {
                params.account = account;
            }
            // 避免重复发送请求
            if(!_submit) {
                _submit = true;
                $(this).css("background-color","#ccc");
                submit(this,params);
            }
        });
        
        $("#ali_login").click(function (){
        	  thirdLoginAuthorize('ali');
        })
        
        $("#qq_login").click(function (){
        	  thirdLoginAuthorize('QQ');
        })
        
        $("#wx_login").click(function (){
        	  thirdLoginAuthorize('WX');
        })
        
        $("#wei_bo_login").click(function (){
             thirdLoginAuthorize('weiBo');
        })
    };
    
    
    function thirdLoginAuthorize(type){
    	window.sessionStorage.userId =  "thirduser";//先暂时这样处理
    	var w = window.open('_blank.html','_blank',"top=0,left=0,width=550,height=500,menubar=no,toolbar=no,"
				+"location=no,directories=no,status=no,scrollbars=yes,resizable=yes");
    	setTimeout(function(){
			w.location=urlheader+"web/core/"+type+"Login.authorize.do?autologin="+$("#hhly_sso_login_check").hasClass("check")+"&currentURL="+currentURL;
		}, 20);
    }
    

    // 发送请求
    function submit(_this,params){
        // 检测是否需要下次自动登录
        // 发送请求
        // 执行回调 (成功、失败)
        lib.api.senPost('USER_LOGIN', params, function(data) {
            _submit = false;
            $(_this).css("background-color","#0f8ff2");
            var type = _config['type'];
            if(data && data["flag"] === 0){
                //window.sessionStorage.userId = data["user"]["userId"];
                var autoLogin = false;
                // 判断是否选中自动登录
                if($("#hhly_sso_login_check").hasClass("check")){
                    // 标记自动登录cookie
                    autoLogin = true;
                }
                // 写入cookie的事件，如果不是
                if(autoLogin){
                    // 注册时间
                    var date = data["data"]["createTime"];
                    //setCookie("regTime_lyy_com",date,7);
                }else{
                    // 注册时间
                    var date = data["data"]["createTime"];
                    //setCookie("regTime_lyy_com",date);
                }
                // 执行成功回调
                if(type == 'flash'){
                     // 判断swf平台执行的回调
                    thisMovie( _config["id"]).successFun(data);
                }else{
                    _config["success"] = _config["success"] || function () {};
                    _config["success"](data);
                    
                }
                // 关闭窗口
                hide();
                window.location.reload()
            }else{
                // 执行失败回调
                if(type == 'flash'){
                    // 判断swf平台执行的回调
                    thisMovie( _config["id"]).errorFun(data);
                }else{
                     _config["error"] = _config["error"] || function () {};
                     _config["error"](data);
                }
                if(data["result"] == 1) {
                    $("#hhly_sso_login_error").text("系统繁忙请稍后再试！");
                }else{
                    $("#hhly_sso_login_error").text(data["detailMsg"]);
                }
              
            }
        },function() {
            _submit = false;
            $(_this).css("background-color","#0f8ff2");
        });
    };
    /**
	 * swf平台执行
	 */
    function thisMovie(movieName) {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[movieName];
        } else {
            return document[movieName];
        }
    };
    /**
	 * 格式化时间
	 * 
	 * @param fmt
	 * @returns {*}
	 * @constructor
	 */
    Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    // 自动登录 检测cookie ，执行 登录成功回调
    // 13322.com
    function autoDecectCookie(){

    };

    // 设置cookie
    // http://www.cnblogs.com/dwfbenben/archive/2012/06/09/2543327.html
    function setCookie(c_name,value,expiredays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
      // 测试环境的域名
      document.cookie=c_name+ "=" +value+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
      +";path=/"+((location.host.indexOf("1332255.com")>-1)?";domain=1332255.com":"");
    }

    // 加载样式
    function loadCssDiv() {

        // 加载div到dom，如果dom已经存在则不再加载创建
        var logindiv = [];
        logindiv.push(' <div class="theme-poptit">');
        logindiv.push('     <a title="关闭" class="close" id="hhly_sso_login_close">×</a>');
        logindiv.push('     <h3>登录</h3>');
        logindiv.push(' </div>');
        logindiv.push(' <div class="theme-popbod">');
        logindiv.push('     <form name="loginform" action="" method="post" onsubmit="return false">');
        logindiv.push('         <div>');
        logindiv.push('         <div>'); /* <div class="login-input-content">'*/
        logindiv.push('   		<div class="login-ipt-div user"> ');
        logindiv.push('  		<i class="loginIcon"></i> ');
        logindiv.push('             <input type="text" name="username" placeholder="用户名/手机号/邮箱" id="hhly_sso_login_account" class="login-ipt" oninvalid="setCustomValidity(\'请输入用户名\');" oninput="setCustomValidity(\'\')" maxlength=20 required/>');
        logindiv.push('  		</div>');
        logindiv.push('   		<div class="login-ipt-div password"> ');
        logindiv.push('  		<i class="loginIcon"></i> ');
        logindiv.push('             <input type="password" name="user_possword" placeholder="密码" id="hhly_sso_login_password" class="login-ipt" oninvalid="setCustomValidity(\'请输入密码\');" oninput="setCustomValidity(\'\')" maxlength=20 required/>');
        logindiv.push('  		</div>');
        logindiv.push('             <div class="login-links clearfix">');
        logindiv.push('                 <a class="fr" href="/user/resetpass" target="_blank" id="hhly_sso_login_resetpwd">忘记密码？</a>');
        logindiv.push('                 <span class="log-icon checkbox check" id="hhly_sso_login_check"></span>下次自动登录');
        logindiv.push('             </div>');
        logindiv.push('             <span style="color: #ff0000;" id="hhly_sso_login_error"></span>');
        logindiv.push('             <button class="login-btn" id="hhly_sso_login_submit">立即登录</button>');
        logindiv.push('         </div>');
        logindiv.push('     </form>');
        logindiv.push('     <div class="o-links clearfix">');
        logindiv.push('         <a class="fr" href="/user/register" target="_blank" id="hhly_sso_login_register">点击注册</a>');
        logindiv.push('     <div class="fl clearfix">');
        logindiv.push('         <span class="fl">其他账号登录：</span>');
     /*   logindiv.push(' <a class="login-icon ali-login href="javascript:void(0);" id="ali_login"></a>');*/
        logindiv.push(' <a class="login-icon qq-login" href="javascript:void(0);" id="qq_login"></a>');
        logindiv.push(' <a class="login-icon wx-login" href="javascript:void(0);" id="wx_login"></a>');
        logindiv.push(' <a class="login-icon wb-login" href="javascript:void(0);" id="wei_bo_login"></a>');
        logindiv.push('     </div>');
        logindiv.push('  </div>');
        logindiv.push(' </div>');
        // 加载登录弹出层
        var $login = document.createElement("div");
        $login.setAttribute("class","theme-popover");
        $login.setAttribute("id","hhly_sso_login");
        $login.innerHTML = logindiv.join("");
        $login.style.display="none";
        document.body.appendChild($login);
        // 加载遮挡层
        var $mask = document.createElement("div");
        $mask.setAttribute("class","theme-popover-mask");
        $mask.setAttribute("style","filter:alpha(opacity=50); opacity:0.5;");
        $mask.setAttribute("id","hhly_sso_login_mask");
        document.body.appendChild($mask);

        // 加载样式
        var $css = document.createElement("link");
        $css.type = "text/css";
        $css.rel = "stylesheet";
        $css.href = "/static/css/common/theme.css";
        document.getElementsByTagName('head')[0].appendChild($css);

    };
    
    
    
    // 执行初始化
    init();

    /** *********************************************************************************** */

    /*
	 * Configurable variables. You may need to tweak these to be compatible with
	 * the server-side, but the defaults work in most cases.
	 */
    var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase */
    var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance */
    var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode */

    /*
	 * These are the functions you'll usually want to call They take string
	 * arguments and return either hex or base-64 encoded strings
	 */
    function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
    function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
    function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
    function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
    function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
    function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

    /*
	 * Calculate the MD5 of an array of little-endian words, and a bit length
	 */
    function core_md5(x, len)
    {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);

    }

    /*
	 * These functions implement the four basic operations the algorithm uses.
	 */
    function md5_cmn(q, a, b, x, s, t)
    {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
	 * Calculate the HMAC-MD5, of a key and some data
	 */
    function core_hmac_md5(key, data){
        var bkey = str2binl(key);
        if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

        var ipad = Array(16), opad = Array(16);
        for(var i = 0; i < 16; i++)
        {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    }

    /*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally to
	 * work around bugs in some JS interpreters.
	 */
    function safe_add(x, y){
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
	 * Bitwise rotate a 32-bit number to the left.
	 */
    function bit_rol(num, cnt){
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
	 * Convert a string to an array of little-endian words If chrsz is ASCII,
	 * characters >255 have their hi-byte silently ignored.
	 */
    function str2binl(str){
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
        return bin;
    }

    /*
	 * Convert an array of little-endian words to a string
	 */
    function binl2str(bin){
        var str = "";
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
        return str;
    }

    /*
	 * Convert an array of little-endian words to a hex string.
	 */
    function binl2hex(binarray){
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++)
        {
            str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
        }
        return str;
    }

    /*
	 * Convert an array of little-endian words to a base-64 string
	 */
    function binl2b64(binarray){
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i += 3)
        {
            var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
            for(var j = 0; j < 4; j++)
            {
                if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
            }
        }
        return str;
    }
    /** ***************************************************************************************************** */

    return _this;
}(jQuery,window);

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([jQuery,window], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(jQuery,window);
    } else {
        window.hhly_login = factory(jQuery,window);
    }
}(function (jQuery,window) {
    return hhly_login;
}));