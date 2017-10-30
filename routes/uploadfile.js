var express = require('express');
var router = express.Router();
var uploadctrl = require('../controller/uploadCtrl');
var fs = require('fs');
//上传图片页面
router.get('/', function(req, res, next) {
    fs.readFile('../public/upload.txt','utf8', function(err,data){

        if(err){
            res.render('menu/upload', { title: '上传菜单图片',path:'' });
        }else{
            res.render('menu/upload', { title: '上传菜单图片',path:data});
        }
    });
   // res.render('menu/upload', { title: '上传菜单图片' });

});
//上传图片动作
router.post('/uploadFile', function(req, res, next) {
    uploadctrl.uploadFile(req,res,next);
});
module.exports = router;
