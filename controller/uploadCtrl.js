var pool = require('../conf/conn');
var multiparty = require('multiparty');//引入这个中间件处理图片
var fs = require('fs');
module.exports = {
    uploadFile:function(req,res){
        var form = new multiparty.Form({uploadDir: '../public/upload/'});//图片存储目录
        form.parse(req, function(err, fields, files) {

            var patharray = files.files[0].path.split("\\");
            var filename = patharray[patharray.length-1];
            var path = '/upload/'+filename;

            fs.writeFile('../public/upload.txt', path,function(err){
                if(err){
                    console.log(err);
                }
                else{

                    res.json({
                        code:'200',
                        path:path,
                        msg: 'success'
                    });
                }
            });

        });
    }

};