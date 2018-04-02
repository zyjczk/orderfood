var express = require('express');
var router = express.Router();
var apictrl = require('../controller/apiCtrl');
var fs = require('fs');
//部门列表
router.get('/getDepartment', function(req, res, next) {

    apictrl.getDepartment(req,res,next);


});
//提交认证
//1.查询员工表，确保有信息
//2.更新员工表
router.post('/employeeAuth', function(req, res, next) {

    apictrl.employeeAuth(req,res,next);



});

//获取供应商列表
router.get('/getCompanyList', function(req, res, next) {

    apictrl.getCompanyList(req,res,next);
});

//获取菜单图片和餐食列表
router.get('/getMenuPic', function(req, res, next) {

    apictrl.getMenuPic(req,res,next);
});

//提交点餐信息
//查询是否订过餐
router.post('/queryFoodById', function(req, res, next) {
    
        apictrl.queryFoodById(req,res,next);
    
    });

//插入订餐表
router.post('/orderFood', function(req, res, next) {

    apictrl.commitFood(req,res,next);

});

//更新我订的餐
router.post('/updataFood', function(req, res, next) {
    
        apictrl.updataFood(req,res,next);
    
});

//查询我定的餐
router.get('/myFood', function(req, res, next) {
    apictrl.myfood(req,res,next);
});

//删除所有订餐数据
router.get('/deleteData', function(req, res, next) {
    apictrl.deletefood(req,res,next);
});

//删除当前登录人的订餐
router.get('/delMyFood', function(req, res, next) {
    apictrl.delMyFood(req,res,next);
});
//订餐时间
router.get('/orderfooddate', function(req, res, next) {
    res.render('index/ordertime');
});

router.get('/readorderfooddate', function(req, res, next) {
    fs.readFile('../public/time.txt','utf8', function(err,data){
        //格式：时间戳-时间戳
        res.json({ ordertime:data});

    });
});
router.post('/writeorderfooddate', function(req, res, next) {

    //接收数据
    var starttime = req.body.startime;
    var endtime = req.body.endtime;
    starttime = new Date(Date.parse(starttime.replace(/-/g, "/")));
    starttime = starttime.getTime();
    endtime = new Date(Date.parse(endtime.replace(/-/g, "/")));
    endtime = endtime.getTime();
    console.log(starttime);
    console.log(endtime);
    fs.writeFile('../public/time.txt',starttime+'-'+endtime, function(err,data){
        //格式：时间戳-时间戳
        //传入两个时间2017-08-29 8:00:00 2017-09-01 12:59:59
        res.json({ code:'ok'});

    });
});
router.get('/ordernot', function(req, res, next) {

    //将myfood表读出，然后跟employee表比对，以订餐时间为准。
    apictrl.notorder(req,res,next);

});
router.post('/saveRemark',function(req,res,next){
    apictrl.saveRemark(req,res,next)
});
router.get('/queryRemark',function(req,res,next){
    apictrl.queryRemark(req,res,next)
});

//历史
router.post('/keepHistoryFood',function(req,res,next){
    apictrl.keepHistoryFood(req,res,next);

});
//历史
router.get('/findHistoryFood',function(req,res,next){
    apictrl.findHistoryFood(req,res,next);

});
module.exports = router;
