var express = require("express");
var router = express.Router();
var departmentCtrl = require("../controller/departmentCtrl");

//列表
router.get("/list", function(req, res, next) {
  // res.render('department/list', { title: '列表' });
  if (req.session.user) {
    departmentCtrl.list(req, res, next);
  } else {
    res.redirect("/");
  }
});
//增加
router.get("/add", function(req, res, next) {
  res.render("department/add", { title: "增加" });
});
//增加动作
router.post("/addAction", function(req, res, next) {
  if (req.session.user) {
    departmentCtrl.add(req, res, next);
  } else {
    res.redirect("/");
  }
});
//修改
router.get("/edit", function(req, res, next) {
  // res.render('department/edit', { title: '修改' });
  if (req.session.user) {
    departmentCtrl.editPage(req, res, next);
  } else {
    res.redirect("/");
  }
});
//修改动作
router.post("/editAction", function(req, res, next) {
  if (req.session.user) {
    departmentCtrl.edit(req, res, next);
  } else {
    res.redirect("/");
  }
});
//删除动作
router.get("/delAction", function(req, res, next) {
  if (req.session.user) {
    departmentCtrl.del(req, res, next);
  } else {
    res.redirect("/");
  }
});
//查询
router.get("/query", function(req, res, next) {
  departmentCtrl.query(req, res, next);
});

module.exports = router;
