var anchorId = $('.userInfo').data('userid');//主播id
var albumId,//相册id
    index,
    photoId,
    videoId,
    mvnickname,
    mvremark;
/**
 * 弹出层
 * @param title
 * @param height
 * @param tpl
 */
var layerModal = function (title, height, tpl) {
    layer.open({
        title: title,
        skin: 'haiyao-class',
        type: 1,
        area: ['600px', height],
        shadeClose: true, //点击遮罩关闭
        content: tpl
    });
};
/**
 * 上传图片/MV
 * @param  {[type]} isAuto     [是否自动上传]
 * @param  {[type]} url        [上传URL]
 * @param  {[type]} pick       [选择文件按钮]
 * @param  {[type]} data       [上传参数]
 * @return {[type]}            [description]
 * * @param  {[type]} extensions [shangchaun格式]
 */
var curUpload = function(isAuto,url,pick,data,extensions){
       return  WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: isAuto,
        // swf文件路径
        swf: 'path_of_swf',
        // 文件接收服务端。
        server: url,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: pick,
        formData: data,
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: extensions,
            mimeTypes: '*'
        },
        method: 'POST',
    });
}

/**
 * 获取相册列表
 */
var getPicList = function () {
    lib.api.senGet('ANCHOR_GETANCHORALBUM', {anchorId: anchorId}, function (res) {
        $('.albumList-c').html('');
        var html = template('album', {data: res.data.list});
        $('.albumList-c').prepend(html);
    });
};

/**
 * 获取相册封面信息
 */
var getCover = function () {
    lib.api.senPost('ANCHOR_LISTPHOTO', {albumId: albumId}, function (res) {
        $('.editCover .editCover-c').html('');
        var html = template('editCover', {data: res.data});
        $('.editCover .editCover-c').prepend(html);
    });
};

/**
 * 获取相册里的相片列表
 */
var getPhotoList = function () {
    lib.api.senPost('ANCHOR_LISTPHOTO', {albumId: albumId}, function (res) {
        $('.pictureList').html('');
        var html = template('photoList', {data: res.data.anchorPhotoList});
        $('.pictureList').prepend(html);
    });
};

/*
* 获取MV列表
*/
var getMvList = function(){
    lib.api.senGet('ANCHOR_GETANCHORMVLIST', {anchorId: anchorId}, function (res) {
        $('.mvList-c').html('');
        var html = template('mvl', {data: res.data.list});
        $('.mvList-c').prepend(html);
    });
}

/*
* 获取城市列表
*/
var getCityList = function(parentId,idName,cur){ 
    lib.api.senGet('ANCHOR_FINDCITY', {parentId: parentId}, function (res) {
        if(res.data&&res.data.length){
        $(idName).html("<option value=''>- 请选择 -</option>");
            var items = res.data;
            for(var i=0;i<items.length;i++){
                if(items[i].cityName == cur){
                    var tpl = '<option value='+
                    items[i].id+
                    ' selected = selected  >' +
                    items[i].cityName
                    '</option>';
                    $(idName).append(tpl);
                }else{
                    var tpl = '<option value='+
                    items[i].id+
                    '>' +
                    items[i].cityName
                    '</option>';
                    $(idName).append(tpl)
                }
            }
        }else{
            $(idName).html("<option value=''>- 请选择 -</option>");
        }
    });
}

/*
* 获取星座
*/
var getDictionary = function(idName,cur){ 
    lib.api.senGet('DICTIONARY_FIND', {'type':'constype'}, function (res) {
        if(res.data&&res.data.length){
        $(idName).html("<option value=''>- 请选择 -</option>");
            var items = res.data;
            for(var i=0;i<items.length;i++){
                if(items[i].value == cur){
                    var tpl = '<option value='+
                    items[i].id+
                    ' selected = selected  >' +
                    items[i].value
                    '</option>';
                    $(idName).append(tpl);
                }else{
                    var tpl = '<option value='+
                    items[i].id+
                    '>' +
                    items[i].value
                    '</option>';
                    $(idName).append(tpl)
                }
            }
        }else{
            $(idName).html("<option value=''>- 请选择 -</option>");
        }
    });
}

/*
* 获取主播基本信息
*/
var getAnchorInfo = function(){
    lib.api.senGet('ANCHOR_GETANCHORINFO', {anchorId:anchorId}, function (res) {
        $('.defaultPage').html('');
        var html = template('info', {data: res.data});
        $('.defaultPage ').prepend(html);
    });
}



/*===============================================================主播资料=========================================================================*/

/*上传新头像*/
var uploadNewAvatar  = curUpload(true,'/upload/image','#uploadNewAvatarBtn',{"userId": anchorId},'gif,jpg,jpeg,bmp,png');
// 文件上传成功
uploadNewAvatar.on('uploadSuccess', function (file, response) {
    var _url = response.data.group + '/' + response.data.remoteFilePath;
    $(".headIcon").attr('src',_url); 

    getAnchorInfo();
});
// 文件上传失败
uploadNewAvatar.on('uploadError', function (file) {
    var $li = $('#' + file.id),
        $error = $li.find('div.error');
    // 避免重复创建
    if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li);
    }
    $error.text('上传失败');
});
//修改主播资料-编辑
$(document).on('click', '#toEdit', function () {
    $(".editPage").show();
    $(".defaultPage").hide();
    var province = $('.province').text();
    var provinceID = $('.province').attr('value');
    var city = $('.city').text();
    var html = "<option value=''>- 请选择 -</option>"; $("#s_city").append(html);
    var constellationid = $('#constellation').data('constellationid');
    getCityList('0','#s_province',province);
    getCityList(provinceID,'#s_city',city);
    getDictionary('#constellation',constellationid)
})
//修改主播资料-保存
$(document).on('click', '#anchorDetail .saveBtn', function () {
    var nickName,sex,constellation,birthday,provinceId,cityId,hobby,sign,headIcon;
    headIcon = $(".headIcon").attr('src');
    nickName = $('#nickName').val();
    sex = $('#sex').val();
    //constellation = $('#constellation').val();
    birthday = $('#birthday').val();
    provinceId = $('#s_province').val();
    cityId = $('#s_city').val();
    hobby = $('#hobby').val();
    sign = $('#sign').val();
    var data = {
        id : anchorId,
        headIcon : headIcon,
        nickName : nickName,
        sex : sex,
        constellation : 1,
        birthday : birthday,
        provinceId : provinceId,
        cityId : cityId,
        hobby : hobby,
        sign : sign
    }
    lib.api.senPost('ANCHOR_UPDATEANCHOR', data, function (res) {
        if(res.flag == 0){
            layer.msg('修改成功！');
            $(".editPage").hide();
            $(".defaultPage").show();
            getAnchorInfo();
        }else{
            layer.msg('修改失败！');
        }
    });
    // lib.api.senPost('ANCHOR_SAVEORUPDATEPHOTO', {albumId: albumId, path: _url}, function (res) {
    //     getPhotoList()
    // });
});
//获取市
$('#s_province').change(function() {
    var p1 = $(this).children('option:selected').val();
    getCityList(p1,'#s_city');
})


/*===============================================================主播相册=========================================================================*/

//主播相册列表
$(document).on('click', '#anchorAlbumBtn', function () {
    getPicList();
});
//编辑相册
$(document).on('click', '#albumList .editBtn', function () {
    index = $(this).index();
    albumId = $(this).parent().parent().parent().data('albumid');
    $('#albumDetail').show();
    getCover();
    getPhotoList();
    $('#albumList').hide();
});
//返回相册
$(document).on('click', '#albumDetail .backBtn', function () {
    $('#albumList').show();
    $('#editBox').children('div').eq(index).hide();
    getPicList()
});
/*主播添加相册弹窗*/
$('#addAlbumBtn').on('click', function () {
    var tpl = '<div class="form" id="addAlbumBox">' +
        '<div class="formGroup">' +
        '<label class="formLabel">相册名称：</label>' +
        '<input class="formInput" type="text" name="" placeholder="请输入相册名称">' +
        '</div>' +
        '<div class="formBtn"><a class="btn blue" href="javascript:" id="toSave">保存</a></div>' +
        '</div>';
    layerModal('上传相册', '200px', tpl)
});
//添加相册
$(document).on('click', '#toSave', function () {
    var albumName = $(this).parent().siblings('div').find('.formInput').val();
    lib.api.senPost('ANCHOR_ADDORUPDATEALBUM', {albumName: albumName, userId: anchorId}, function (res) {
        if (res.flag == 0) {
            layer.closeAll();
            getPicList();
        }
    });
})
/*修改相册名称-显示*/
$(document).on('click', '.updateBtn ', function () {
    $(this).hide();
    $(".updateHide").show();
});
//修改相册名称-确定
$(document).on('click', '.preserve', function () {
    var albumName = $(this).siblings('input').val();
    lib.api.senPost('ANCHOR_ADDORUPDATEALBUM', {
        albumName: albumName,
        userId: anchorId,
        albumId: albumId
    }, function (res) {
        if (res.flag == 0) {
            getCover();
            $(".updateHide").hide();
            $(".updateBtn").show();
        }
    });
    $(".updateHide").hide();
    $(".updateBtn").show();
})
//取消相册名称
$(document).on('click', '.cancel', function () {
    $(".updateHide").hide();
    $('.updateBtn').show();
});
//删除相册
$(document).on('click', '#albumList .deleteBtn', function () {
    albumId = $(this).parent().parent().parent().data('albumid');
    layer.confirm('您确定要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        lib.api.senPost('ANCHOR_DELALBUM', {albumId: albumId}, function (res) {
            if (res.flag == 0) {
                getPicList();
                layer.closeAll();
                layer.msg('修改成功！');
            }
        });
    });
})
//删除相册里的相片
$(document).on('click', '.delPhotoBtn', function () {
    photoId = $(this).parent().parent().parent().data('id');
    layer.confirm('您确定要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        lib.api.senPost('ANCHOR_DELPHOTO', {photoId: photoId}, function (res) {
            if (res.flag == 0) {
                getPhotoList();
                layer.closeAll();
            }
        });
    });
})
//更新照片
$(document).on('change', '#changeBtn', function () {
    photoId = $(this).parents('.list').data('id');
    $.ajaxFileUpload({
        url: '/upload/image',
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: 'changeBtn', //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        name:'file',
        success: function (data, status)  //服务器成功响应处理函数
        {
            console.log('---',data)
            var imgUrl = data.data.group + '/' + data.data.remoteFilePath;
            lib.api.senGet('ANCHOR_SAVEORUPDATEPHOTO', {photoId:photoId,path:imgUrl,albumId:albumId}, function(res){
                if(res.flag == 0) {
                    layer.msg('修改成功！');
                    getPhotoList();
                }
                else{
                    layer.msg('修改失败！');
                }
            });
        },
        error: function (data, status, e)//服务器响应失败处理函数
        {
            alert(e);
        }
    })
});


/*上传照片*/
var toUploadImg = curUpload(true,'/upload/image','#filePicker',{"userId": anchorId},'gif,jpg,jpeg,bmp,png');
// 文件上传成功，给item添加成功class, 用样式标记上传成功。
toUploadImg.on('uploadSuccess', function (file, response) {
    var _url = response.data.group + '/' + response.data.remoteFilePath
    lib.api.senPost('ANCHOR_SAVEORUPDATEPHOTO', {albumId: albumId, path: _url}, function (res) {
        getPhotoList()
    });
});
// 文件上传失败，显示上传出错。
toUploadImg.on('uploadError', function (file) {
    var $li = $('#' + file.id),
        $error = $li.find('div.error');

    // 避免重复创建
    if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li);
    }

    $error.text('上传失败');
});


/*修改头像*/
var modifyTheAvatar  = curUpload(true,'/upload/image','#modifyTheAvatarBtn',{"userId": anchorId},'gif,jpg,jpeg,bmp,png');
// 文件上传成功，给item添加成功class, 用样式标记上传成功。
modifyTheAvatar.on('uploadSuccess', function (file, response) {
    var _url = response.data.group + '/' + response.data.remoteFilePath;
    lib.api.senPost('ANCHOR_SAVEORUPDATEPHOTO', {albumId: albumId, path: _url}, function (res) {
        $('#albumCover .listCover').attr('src',_url);
    });
});
// 文件上传失败，显示上传出错。
modifyTheAvatar.on('uploadError', function (file) {
    var $li = $('#' + file.id),
        $error = $li.find('div.error');

    // 避免重复创建
    if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li);
    }

    $error.text('上传失败');
});

/*===============================================================主播mv=========================================================================*/

//主播mv列表
$(document).on('click', '#anchorMvBtn', function () {
    var anchorId = $('.userInfo').data('userid')
    getMvList();
});

//上传mv
var toUploadMV = curUpload(false,'/upload/video','#chooseBtn',{"userId": anchorId,"companyId": 1,'nickname':mvnickname,'remark':mvremark},'mp4,flv');//,'nickname':nickname,'remark':remark
// 当有文件添加进来的时候
toUploadMV.on('fileQueued', function (file) {  // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于 uploader.onFileueued = function(file){...} ，类似js的事件定义。
    $(".mvName").val(file.name);
});
// 文件上传过程中创建进度条实时显示。
toUploadMV.on('uploadProgress', function (file, percentage) {
    var $li = $('#' + file.id),
        $percent = $li.find('.progress span');

    // 避免重复创建
    if (!$percent.length) {
        $percent = $('<p class="progress"><span></span></p>')
            .appendTo($li)
            .find('span');
    }
    $percent.css('width', percentage * 100 + '%');
});
// 文件上传成功，给item添加成功class, 用样式标记上传成功。
toUploadMV.on('uploadSuccess', function (file, response) {
    var _url =  response.data.cover;
    console.log('=============',_url)
    var tpl = '<div class="list">' +
        '<div class="coverOut">' +
        '<div class="cover">' +
        '<i class="icon selected"></i>' +
        '</div>' +
        '</div>' +
        '<img class="listCover" src=' + _url + '>' +
        '<div class="listB">' +
        '<span class="btnGroup">' +
        '<a class="editBtn" href="javascript:">更换</a>' +
        '<a class="deleteBtn" href="javascript:">删除</a>' +
        '</span>' +
        '</div>' +
        '</div>';
    $(".mvList-c").append(tpl);
    if(response.flag == 0){
        getMvList();
    }
    //$( '#'+file.id ).addClass('upload-state-done');
    //
});
// 文件上传失败，显示上传出错。
toUploadMV.on('uploadError', function (file) {
    var $li = $('#' + file.id),
        $error = $li.find('div.error');

    // 避免重复创建
    if (!$error.length) {
        $error = $('<div class="error"></div>').appendTo($li);
    }

    $error.text('上传失败');
});
// 完成上传完了，成功或者失败，先删除进度条。
toUploadMV.on('uploadComplete', function (file) {
    $('#' + file.id).find('.progress').remove();
    $('#thelist img').remove()
});
//上传保存视频
$(document).on('click','.uploadMvBox .uploadbtn',function(){
    // 第一、上传视频，调用上传MV的接口，和上传图片一样
    
    // 第二、保存数据：MV名称、MV上传成功之后返回的地址、MV描述，提交表单，调用保存接口
    mvnickname = $('.mvName').find('input').val();
    mvremark = $('.mvRemark').find('textarea').val();
    
    toUploadMV.upload();
    // 上传MV    
    // 提交表单
    $('#mvList ').addClass('active');
    $('.uploadMvBox').removeClass('active');
    $('.mvName').find('input').val("");
    $('.mvRemark').find('textarea').val("");
    console.log(mvremark,mvnickname)
})
//显示上传框
$(document).on('click','.uploadMvBtn',function(){
    //$('#mvList').removeClass('active');
    $('.uploadMvBox').addClass('active');
});
//关闭上传框
$(document).on('click','.uploadMvBox .close',function(){
    $('#mvList ').addClass('active');
    $('.uploadMvBox').removeClass('active');
});

//删除视频
$(document).on('click', '.mvList-c .deleteBtn', function () {
    fileId = $(this).parent().parent().parent().data('id');
    layer.confirm('您确定要删除？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        lib.api.senPost('VIDEO_DELETEVIDEO', {fileId: fileId}, function (res) {
            if (res.flag == 0) {
                getMvList();
                layer.closeAll();
            }
        });
    });
});

//修改mv名称-保存
function alterMvName(videoId){
    var nickname = $('.nickName').children('input').val();
    var remark = $('.remark').children('textarea').val();
    lib.api.senGet('VIDEO_UPDATEVIDEO', {videoId: videoId,remark: remark, nickname: nickname}, function (res) {
        if (res.flag == 0) {
            layer.closeAll();
            getMvList()
        }
    });
    
}
//修改mv名称-编辑
$(document).on('click','#anchorMv .editBtn',function(){
    videoId = $(this).parents('.list').data('id');
    var nickname = $(this).parent().siblings('.title').html();
    var remark = $(this).parents('.listB').siblings('.listSummary').html();
    var tpl = '<div class="form" id="reviseVideoBox">' +
        '<div class="formGroup nickName">' +
        '<label class="formLabel">视频名称:</label>' +
        '<input class="formInput" type="text" name="" placeholder="请输入相册名称" maxlength="8" value="'+ nickname +'">' +
        '</div>' +
        '<div class="formGroup remark">' +
        '<label class="formLabel">视频描述:</label>' +
        '<textarea class="formTextarea" rows="5" placeholder="请输入20字内的MV描述" maxlength="20">'+ remark +'</textarea>' +
        '</div>' +
        '<div class="formBtn" onclick="alterMvName(videoId)"><a class="btn blue" href="javascript:">保存</a></div>' +
        '</div>';
    layerModal('修改视频名称', '340px', tpl)
});




/*主播封面图片选中状态*/
$("#albumDetail .pictureList .list").unbind().click(function () {
    $(this).find(".coverOut").toggle();
});
