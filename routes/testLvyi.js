var express = require('express');
var router = express.Router();
var testLvyiCtrl= require("../controller/testLvyiCtrl");

//列表
router.get('/excelTxt', function(req, res, next) {
    // res.render('food/list', { title: '列表' });
    console.log('进入router')
    
    testLvyiCtrl.exportTxt(req,res,next);

});
// //增加动作
// router.post('/addAction', function(req, res, next) {
//     if(req.session.user) {
//         foodCtrl.add(req,res,next);
//     }else{
//         res.redirect('/');
//     }
// });

module.exports = router;
