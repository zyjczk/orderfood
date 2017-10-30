var express = require('express');
var router = express.Router();

/* 首页架子页面，上左右结构. */
router.get('/', function(req, res, next) {
  if(req.session.user){
      res.render('index', { title: '一号车订餐管理后台' });
  }else{
    res.redirect('users/login');
  }

});

module.exports = router;
