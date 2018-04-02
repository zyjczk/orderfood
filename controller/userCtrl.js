var pool = require('../conf/conn');
var usermodel = require('../model/userModel');
var md5 = require('../utils/md5');
module.exports = {
    logincheck:function(req,res){
        pool.getConnection(function(err,connection){

            var param = req.body;
            var username = param.username;
            var passwd = md5(param.passwd);
            // console.log(username);
           //  console.log(passwd);
           // console.log(usermodel.select);
            console.log(passwd);
            connection.query(usermodel.select,[username,passwd],function(err,result){
               // console.log(err);
               // console.log(result);
                if(result && result[0]){
                    //放行
                  // console.log(result[0]['id']);
                    req.session.user = result[0];
                    res.json({
                        code:200,
                        msg:'success'
                    });
                }else{
                    res.json({
                        code:'-1',
                        msg:'查无此人'
                    });
                }
                connection.release();//释放连接
            });
        });
    }
};