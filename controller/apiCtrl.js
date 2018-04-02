var pool = require("../conf/conn");
var apimodel = require("../model/apiModel");
var fs = require("fs");
var moment = require("moment");
module.exports = {
  getDepartment: function(req, res) {
    pool.getConnection(function(err, connection) {
      connection.query(apimodel.department, [], function(err, result) {
        if (result && result[0]) {
          res.json({ list: result });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  employeeAuth: function(req, res) {
    pool.getConnection(function(err, connection) {
      var employeename = req.body.employeename;
      var departId = req.body.departmentId;

      connection.query(apimodel.selectOne, [employeename, departId], function(
        err,
        result
      ) {
        if (result && result[0]) {
          res.json({ code: 200, msg: "success", employeeId: result[0]["id"] });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  getCompanyList: function(req, res) {
    pool.getConnection(function(err, connection) {
      connection.query(apimodel.selectCompany, [], function(err, result) {
        if (result && result[0]) {
          res.json({ companyList: result });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  getMenuPic: function(req, res) {
    pool.getConnection(function(err, connection) {
      var provider = req.query.provider;
      connection.query(apimodel.selectFood, [provider], function(err, result) {
        if (result && result[0]) {
          res.json({ foodList: result });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },

  commitFood: function(req, res) {
    pool.getConnection(function(err, connection) {
      var food = JSON.parse(req.body.food);
      var departId = req.body.departId;
      var employeeId = req.body.employeeId;
      var departname = req.body.departName;
      var orderType = req.body.orderType;

      var timer = null;
      //var len = 0;
      var count = 0;
      var values_food = [];

      for (var key in food) {

          values_food.push([
              employeeId,
              departId,
              departname,
              food[key]["companyId"] + "",
              food[key]["foodId"] + "",
              key,
              orderType
          ]);
      }

        connection.query(
            apimodel.addorder,
            [values_food],
            function(err, result) {
                console.log("question>>>", err);
                console.log("ok>>>", result);
                  if (!err) {
                          connection.release(); //释放连接
                          res.json({ code: 200, msg: "success" });
               }
              //  count++;
            }
        );


      // timer = setInterval(function() {
      //   if (count == len) {
      //     console.log("cancel timer ok");
      //     clearInterval(timer);
      //     connection.release(); //释放连接
      //     res.json({ code: 200, msg: "success" });
      //   }
      // }, 500);
    });
  },
  queryFoodById: function(req, res) {
    pool.getConnection(function(err, connection) {
      var employeeId = req.body.employeeId;
      var orderType = req.body.orderType;

      connection.query(apimodel.selectbyId, [employeeId, orderType], function(
        err,
        result
      ) {
        if (result) {
          res.json({ food: result });
        } else {
          res.json({
            code: "-1",
            food: "",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  myfood: function(req, res) {
    pool.getConnection(function(err, connection) {
      var employeeid = req.query.employeeid;
      var orderType = req.query.orderType;
      connection.query(apimodel.myfood, [employeeid, orderType], function(
        err,
        result
      ) {
        if (result) {
          res.json({ code: 200, msg: "success", list: result });
        } else {
          res.json({ code: 200, msg: "noPerson", list: "" });
        }

        connection.release(); //释放连接
      });
    });
  },
  updataFood: function(req, res) {
    pool.getConnection(function(err, connection) {
      var employeeId = req.body.employeeId;
      var food = req.body.food;
      var type = req.body.type;
      var orderType = req.body.orderType;

      var ordertime = moment().format("YYYY-MM-DD");
      if (type == "update") {
        connection.query(
          apimodel.updatefood,
          [food, ordertime, employeeId, orderType],
          function(err, result) {
            if (!err) {
              res.json({
                code: "1",
                msg: "success"
              });
            } else {
              res.json({
                code: "-1",
                msg: "error"
              });
            }
            connection.release(); //释放连接
          }
        );
      } else if (type == "inset") {
        connection.query(
          apimodel.insetfood,
          [employeeId, food, ordertime, orderType],
          function(err, result) {
            if (!err) {
              res.json({
                code: "1",
                msg: "success"
              });
            } else {
              res.json({
                code: "-1",
                msg: "error"
              });
            }
            connection.release(); //释放连接
          }
        );
      }
    });
  },
  deletefood: function(req, res) {
    pool.getConnection(function(err, connection) {
      connection.query(apimodel.deletefood, [], function(err, result) {
        if (!err) {
          res.json({
            code: "1",
            msg: "success"
          });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  delMyFood: function(req, res) {
    pool.getConnection(function(err, connection) {
      var employeeid = req.query.employeeId;
      connection.query(apimodel.delMyFood, [employeeid], function(err, result) {
        if (!err) {
          res.json({
            code: "1",
            msg: "success"
          });
        } else {
          res.json({
            code: "-1",
            msg: "error"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  //未定餐名单
  notorder: function(req, res) {
    pool.getConnection(function(err, connection) {
      //获取所有员工数据
      connection.query(apimodel.selectEmployee, [], function(err, result) {
        if (!err) {
          connection.query(apimodel.selectMyfood, [], function(err2, result2) {
            if (!err2) {
              connection.query(apimodel.selectRemark, [], function(
                err3,
                result3
              ) {
                if (!err3) {
                  console.log(result3[0].text);
                  res.render("detail/ordernot", {
                    allemployee: result,
                    allfood: result2,
                    remark: result3[0].text
                  });
                }
              });
            }
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  //修改短信模板
  saveRemark: function(req, res) {
    pool.getConnection(function(err, connection) {
      var text = req.body.text;
      connection.query(apimodel.saveRemark, [text], function(err, result) {
        if (!err) {
          res.json({
            code: 200,
            msg: "success"
          });
        }
        connection.release(); //释放连接
      });
    });
  },
  queryRemark: function(req, res) {
    pool.getConnection(function(err, connection) {
      connection.query(apimodel.queryRemark, [], function(err, result) {
        if (!err) {
          res.json({
            code: 200,
            msg: "success",
            list: result
          });
        }
        connection.release(); //释放连接
      });
    });
  },
//保存历史数据
    keepHistoryFood: function(req, res) {
        var employeeid = req.body.employeeId;
        var foodList = req.body.foodList;
        var ordertime = req.body.ordertime;
        var orderType = req.body.orderType;
        console.log(employeeid);
        console.log(foodList);
        console.log(ordertime);
        console.log(orderType);
        pool.getConnection(function(err, connection) {
            connection.query(apimodel.keepHistoryFood, [employeeid,foodList,ordertime,orderType], function(err, result) {
                if (!err) {
                    res.json({
                        code: 200,
                        msg: "success",
                        list: result
                    });
                }
                connection.release(); //释放连接
            });
        });
    },
    //查找历史数据
    findHistoryFood: function(req, res) {
        var employeeid = req.query.employeeId;

        var orderType = req.query.orderType;
        console.log(employeeid);

        console.log(orderType);
        pool.getConnection(function(err, connection) {
            connection.query(apimodel.findHistoryFood, [employeeid,orderType], function(err, result) {
                if (!err) {
                    res.json({
                        code: 200,
                        msg: "success",
                        list: result
                    });
                }
                console.log(err);
                connection.release(); //释放连接
            });
        });
    }
};
