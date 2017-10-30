var express = require('express');
var router = express.Router();

var userctrl = require('../controller/userCtrl');
//登录页面
router.get('/login', function(req, res, next) {

    res.render('login/login', { title: '管理员登录' });
});
//登录动作
router.post('/logincheck', function(req, res, next) {
    //交给控制器处理
    userctrl.logincheck(req,res,next);

});
router.get('/loginout', function(req, res, next) {

    delete req.session.user;
    res.redirect('/users/login');
});
module.exports = router;
