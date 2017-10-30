var express = require('express');
var router = express.Router();
var companyCtrl = require('../controller/companyCtrl');
//获取数据
router.get('/listapi', function(req, res, next) {
    // res.render('department/list', { title: '列表' });
    if(req.session.user){
        companyCtrl.api(req,res,next);
    }else{
        res.redirect('/');
    }
});
//列表
router.get('/list', function(req, res, next) {
    // res.render('department/list', { title: '列表' });
    if(req.session.user){
        companyCtrl.list(req,res,next);
    }else{
        res.redirect('/');
    }
});
//增加
router.get('/add', function(req, res, next) {
    res.render('company/add', { title: '增加' });
});
//增加动作
router.post('/addAction', function(req, res, next) {
    if(req.session.user) {
        companyCtrl.add(req,res,next);
    }else{
        res.redirect('/');
    }
});
//修改
router.get('/edit', function(req, res, next) {
    // res.render('department/edit', { title: '修改' });
    if(req.session.user) {
        companyCtrl.editPage(req,res,next);
    }else{
        res.redirect('/');
    }
});
//修改动作
router.post('/editAction', function(req, res, next) {
    if(req.session.user) {
        companyCtrl.edit(req,res,next);
    }else{
        res.redirect('/');
    }
});
//删除动作
router.get('/delAction', function(req, res, next) {
    if(req.session.user) {
        companyCtrl.del(req,res,next);
    }else{
        res.redirect('/');
    }
});

module.exports = router;
