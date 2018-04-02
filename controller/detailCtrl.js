var pool = require("../conf/conn");
var detailmodel = require("../model/detailModel");

module.exports = {
  query: function (req, res) {
    pool.getConnection(function (err, connection) {
      var param = req.query;
      var companyId = param.companyId + "";
      var weekDay = param.weekDay + "";
      var orderType = param.orderType;

      connection.query(
        detailmodel.querybycom, [companyId, weekDay, orderType],
        function (err, result) {
          if (result && result[0]) {
            //成功

            var code = result[0].foodId;
            var dataList = [{
              departId: result[0].departId,
              [code]: result[0].sumfood,
              departName: result[0].departname,
              sum: parseInt(result[0].sumfood)
            }];
            for (var a = 1; a < result.length; a++) {
              var noRep = true;
              for (var b = 0; b < dataList.length; b++) {
                if (result[a].departId == dataList[b].departId) {
                  var code = result[a].foodId;
                  dataList[b][code] = result[a].sumfood;
                  dataList[b].sum += parseInt(result[a].sumfood);
                  noRep = false;
                } else {
                  noRep = true;
                }
              }
              //判断部门id是否重复，如果没有重复则添加一个新的部门
              if (noRep) {
                var code = result[a].foodId;
                dataList.push({
                  departId: result[a].departId,
                  [code]: result[a].sumfood,
                  departName: result[a].departname,
                  sum: result[a].sumfood
                });
              }
            }

            res.json({
              list: dataList
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
    });
  },
  queryAll: function (req, res) {
    pool.getConnection(function (err, connection) {
      var param = req.query;
      var weekDay = param.weekDay + "";
      var orderType = param.orderType;

      connection.query(detailmodel.queryAll, [weekDay, orderType], function (
        err,
        result
      ) {
        if (result && result[0]) {
          //成功
          var code = result[0].companyId;
          var dataList = [{
            departId: result[0].departId,
            [code]: result[0].companysum,
            departName: result[0].departname,
            sum: parseInt(result[0].companysum)
          }];

          for (var a = 1; a < result.length; a++) {
            var noRep = true;
            for (var b = 0; b < dataList.length; b++) {
              var code = result[a].companyId;
              if (dataList[b].departId == result[a].departId) {
                dataList[b][code] = result[a].companysum;
                dataList[b].sum += parseInt(result[a].companysum);
                noRep = false;
              } else {
                noRep = true;
              }
            }
            if (noRep) {
              dataList.push({
                departId: result[a].departId,
                [code]: result[a].companysum,
                departName: result[a].departname,
                sum: parseInt(result[a].companysum)
              });
            }
          }
          res.json({
            list: dataList
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
  queryByDepart: function (req, res) {
    pool.getConnection(function (err, connection) {
      var id = req.query.departId;
      connection.query(detailmodel.queryByDepartment, [id], function (
        err,
        result
      ) {
        if (result && result[0]) {
          res.json({
            list: result
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
  }
};