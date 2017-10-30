var pool = require('../conf/conn');
var wxmodel = require('../model/wxModel');
var fs = require('fs');
var moment = require('moment');
module.exports = {

    insertEmployee: function (req, res) {
        var  code =  req.session.dearUserInfo.userid;
        var  username = req.session.dearUserInfo.name;
        console.log('员工code》》',code);
        console.log('员工username》》',username);

        pool.getConnection(function (err, connection) {
            connection.query(wxmodel.select, [code], function (err, result) {

                if (result && result[0]) {
                    //如果有记录，就什么都不做
                    console.log('有记录，就去渲染');
                    //res.render('wx/orderfood',{userInfo:req.session.dearUserInfo});
                } else {
                    //如果没有记录，就插入
                    pool.getConnection(function (err, connection2) {

                        connection.query(wxmodel.insert, [code,username], function (err, result2) {

                            if(result2.insertId>0){
                                //成功插入
                                console.log('插入员工数据成功');

                            }else{
                                console.log('插入员工失败');
                            }
                        });

                        connection2.release();
                    });
                }
                res.render('wx/orderfood',{userInfo:req.session.dearUserInfo});
                connection.release();//释放连接
            });

        })
    }

};
