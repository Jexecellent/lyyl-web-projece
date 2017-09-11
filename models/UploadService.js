/**
 * Created by dell on 2017/5/13.
 */
var formidable = require('formidable');
var fs = require('fs');
var logger = require('../tools/utils').logger;
var config = require('../config/config');
var uris = require('../config/uris');

/**
 * 执行上传
 * @param req httpRequest
 * @param res httpResponse
 * @param options
 */
function upload(req, res, options) {
    const _req = req;
    options.method = 'POST';
    var callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            try{
                res.send(JSON.parse(str));
            }catch(e) {
                res.send(str);
            }
        });
    };

    var request = require('http').request(options, callback);

    //formidable ,TODO 有时间研究更好的实现方式
    var form = new formidable.IncomingForm();   //创建上传表单
    form.keepExtensions = true;	 //保留后缀
    form.parse(req, function(err, fields, files) {
        if(err){
            logger.error('parse file exception:%s', err.stack);
            res.end();
            return;
        }
        fields.userId = _req.body.userId;
        uploadFile(files,fields);
    });

    function uploadFile(files, postData) {
        var boundaryKey = Math.random().toString(16);
        var endData = '\r\n----' + boundaryKey + '--';
        var filesLength = 0, content;

        // 初始数据，把post过来的数据都携带上去
        content = (function (obj) {
            var rslt = [];
            Object.keys(obj).forEach(function (key) {
                arr = ['\r\n----' + boundaryKey + '\r\n'];
                arr.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n');
                arr.push(obj[key]);
                rslt.push(arr.join(''));
            });
            return rslt.join('');
        })(postData);

        // 组装数据
        Object.keys(files).forEach(function (key) {
            if (!files.hasOwnProperty(key)) {
                delete files.key;
                return;
            }
            content += '\r\n----' + boundaryKey + '\r\n' +
                'Content-Type: '+files.file.type+'\r\n' +
                'Content-Disposition: form-data; name="' + key + '"; ' +
                'filename="' + files[key].name + '"; \r\n' +
                'Content-Transfer-Encoding: binary\r\n\r\n';
            files[key].contentBinary = new Buffer(content, 'utf-8');
            filesLength += files[key].contentBinary.length + fs.statSync(files[key].path).size;
        });

        //request.setHeader("Set-Cookie", ["token="+varicom.cookies(req).open_token]);
        request.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
        request.setHeader('Content-Length', filesLength + Buffer.byteLength(endData));

        // 执行上传
        var allFiles = Object.keys(files);
        var fileNum = allFiles.length;
        var uploadedCount = 0;
        allFiles.forEach(function (key) {
            request.write(files[key].contentBinary);
            var fileStream = fs.createReadStream(files[key].path, {bufferSize: 4 * 1024});
            fileStream.on('end', function () {
                // 上传成功一个文件之后，把临时文件删了
                fs.unlink(files[key].path);
                uploadedCount++;
                if (uploadedCount == fileNum) {
                    // 如果已经是最后一个文件，那就正常结束
                    request.end(endData);
                }
            });
            fileStream.pipe(request, {end: false});
        });
    }
}

exports.image = function(req, res){
    var options = require('url').parse('http://'+config.api_config.hostname+":"+config.api_config.port+uris.UPLOAD_IMG);
    //var options = {
    //    videoFile:'192.168.1.170',
    //    path:'/upload/img',
    //    port:'8081',
    //    protocol:'http:'
    //}
    upload(req, res, options);
    console.log('111111111',req.session.user)
}

// exports.images = function(req, res){
//     var options = require('url').parse('http://localhost:8081/upload/imgs');
//     upload(req, res, options);
// }

exports.video = function(req, res){
    var options = require('url').parse('http://'+config.api_config.hostname+":"+config.api_config.port+uris.UPLOAD_VIDEO);
    upload(req, res, options);
}