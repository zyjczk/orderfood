var pool = require('../conf/conn');
var apimodel = require('../model/apiModel');
var fs = require('fs');
var moment = require('moment');
module.exports = {
    getDepartment: function (req, res) {

        pool.getConnection(function (err, connection) {

            connection.query(apimodel.department, [], function (err, result) {
               
                if (result && result[0]) {
                    res.json({list: result});

                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });
        });
    },
    employeeAuth: function (req, res) {
        pool.getConnection(function (err, connection) {
            var employeename = req.body.employeename;
            var departId = req.body.departmentId;
           
            connection.query(apimodel.selectOne, [employeename, departId], function (err, result) {

                if (result && result[0]) {
                    res.json({code: 200, msg: "success", employeeId: result[0]['id']});

                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            })
        })
    },
    getCompanyList:function (req, res) {
        pool.getConnection(function (err, connection) {
            connection.query(apimodel.selectCompany, [], function (err, result) {
                if (result && result[0]) {
                    res.json({companyList: result});
                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });
        });
    },
    getMenuPic: function (req, res) {
        pool.getConnection(function (err, connection) {
            var provider = req.query.provider;
            connection.query(apimodel.selectFood, [provider], function (err, result) {
                if (result && result[0]) {
                        res.json({foodList: result});
                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });
        });
    },

    commitFood: function (req, res) {
        pool.getConnection(function (err, connection) {
            var food = JSON.parse(req.body.food);
            var departId = req.body.departId;
            var employeeId =req.body.employeeId;
            var departname = req.body.departName;

            var timer = null;
            var len = 0;
            var count = 0;
            for(var key2 in food){
                len++;
            }

            for (var key in food) {
               
                   // food[key]
                connection.query(apimodel.addorder, [employeeId, departId, departname, food[key]['companyId']+'', food[key]['foodId']+'', key], function (err, result) {
                    console.log('question>>>',err);
                /*    if (!result) {
                        flag = false;
                    }*/
                    count++;

                });
                // connection.release();//释放连接
            }

            timer = setInterval(function(){

                if(count == len){
                    console.log('cancel timer ok');
                    clearInterval(timer);
                    connection.release();//释放连接
                    res.json({code:200,msg:"success"});
                }


            },500);

        })
    },
    queryFoodById: function (req, res) {
        pool.getConnection(function (err, connection) {
            
            var employeeId =req.body.employeeId;

            connection.query(apimodel.selectbyId, [employeeId], function (err, result) {
                if (result) {
                        res.json({food: result});
                } else {
                    res.json({
                        code: '-1',
                        food:'',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });

        })
    },
    myfood:function (req, res) {
        pool.getConnection(function (err, connection) {
            var employeeid = req.query.employeeid;
            connection.query(apimodel.myfood, [employeeid], function (err, result) {
              
                if(result){
                    res.json({code:200,msg:'success',list:result});
                }else{
                    res.json({code:200,msg:'noPerson',list:""});
                }


                connection.release();//释放连接
            });
        });
    },
    updataFood: function (req, res) {
        pool.getConnection(function (err, connection) {
            
            var employeeId =req.body.employeeId;
            var food = req.body.food;
            var type = req.body.type;

            var ordertime = moment().format("YYYY-MM-DD");
            if(type=='update'){
                connection.query(apimodel.updatefood, [food,ordertime,employeeId], function (err, result) {
                   
                    if (!err) {
                        res.json({ 
                            code: '1',
                            msg: 'success'
                        });
                    } else {
                        res.json({
                            code: '-1',
                            msg: 'error'
                        });
                    }
                    connection.release();//释放连接
                });
            }else if(type=='inset'){
                connection.query(apimodel.insetfood, [employeeId,food,ordertime], function (err, result) {
                    if (!err) {
                        res.json({ 
                            code: '1',
                            msg: 'success'
                        });
                    } else {
                        res.json({
                            code: '-1',
                            msg: 'error'
                        });
                    }
                    connection.release();//释放连接
                });
            }
        })
    },
    deletefood:function (req, res) {
        pool.getConnection(function (err, connection) {
            
            connection.query(apimodel.deletefood, [], function (err, result) {
                if (!err) {
                    res.json({ 
                        code: '1',
                        msg: 'success'
                    });
                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });
        })
    },
    delMyFood:function (req, res) {
        pool.getConnection(function (err, connection) {
            var employeeid = req.query.employeeId;
            connection.query(apimodel.delMyFood, [employeeid], function (err, result) {
                if (!err) {
                    res.json({ 
                        code: '1',
                        msg: 'success'
                    });
                } else {
                    res.json({
                        code: '-1',
                        msg: 'error'
                    });
                }
                connection.release();//释放连接
            });
        })
    },
    //未定餐名单
    notorder:function (req, res) {
        pool.getConnection(function (err, connection) {
            //获取所有员工数据
            connection.query(apimodel.selectEmployee, [], function (err, result) {
                if (!err) {



                    connection.query(apimodel.selectMyfood, [], function (err2, result2) {
                        if(!err2){
                            res.render('detail/ordernot',{
                                allemployee:result,
                                allfood:result2
                            });
                        }

                    });


                }
                connection.release();//释放连接
            });
        })
    }

};
