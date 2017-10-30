var express = require('express');
var router = express.Router();
var detailCtrl = require("../controller/detailCtrl")

//订餐详情页面
router.get('/detail', function(req, res, next) {
    res.render('detail/detail', { title: '一号车订餐管理后台' });
});

//部门订餐人员查询页
router.get('/memberFood', function(req, res, next) {
    res.render('detail/detailDepart');
});

//按部门查询订餐人员
router.get('/queryMemberFood', function(req, res, next) {
    detailCtrl.queryByDepart(req,res,next);
});

//订餐历史页面
router.get('/history', function(req, res, next) {
    res.render('detail/history', { title: '一号车订餐管理后台' });
});

//删除动作
router.get('/deleteFood', function(req, res, next) {
});

//查询订单详情
router.get('/queryOrder', function(req, res, next) {
    if(req.session.user) {
        detailCtrl.query(req,res,next);
    }else{
        res.redirect('/');
    }
});
//查询订单详情
router.get('/queryAll', function(req, res, next) {
    if(req.session.user) {
        detailCtrl.queryAll(req,res,next);
    }else{
        res.redirect('/');
    }
});
module.exports = router;
