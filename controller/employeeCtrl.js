var pool = require('../conf/conn');
var employeemodel = require('../model/employeeModel');

module.exports = {
    query:function(req,res){

        pool.getConnection(function(err,connection){

            var name = req.query.name;
        
            console.log(name);
            connection.query(employeemodel.query,[name],function(err,result){
                console.log(result);
                console.log(err);
                if(result){
                    res.json({list:result});
                }else{
                    res.json({
                        code:'-1',
                        msg:'error'
                    });
                }
                connection.release();//释放连接
            });
        });
    },
    del:function(req,res){

        pool.getConnection(function(err,connection){

            var code = req.query.code;
            

            connection.query(employeemodel.del,[code],function(err,result){
              
                if(result){
                    //成功
                    res.json({
                        code:200,
                        msg:'success'
                    });

                }else{
                    res.json({
                        code:'-1',
                        msg:'error'
                    });
                }
                connection.release();//释放连接
            });
        });
    },
    // editPage:function(req,res){
    //     pool.getConnection(function(err,connection){
    //         var id = req.query.id;
    //         connection.query(employeemodel.selectOne,[id],function(err,result){
               
    //             if(result && result[0]){
    //                 res.render('employee/edit', { title: '编辑员工',detail:result[0]});

    //             }else{
    //                 res.json({
    //                     code:'-1',
    //                     msg:'error'
    //                 });
    //             }
    //             connection.release();//释放连接
    //         });
    //     });
    // },
    // edit:function(req,res){
    //     pool.getConnection(function(err,connection){

    //         var param = req.body;
    //         var id = param.id;

    //         var name = param.name;
    //         var departmentId = param.departmentId;
    //         var isWorker = param.isWorker;
    //         connection.query(employeemodel.edit,[name,departmentId,isWorker,id],function(err,result){

               
    //             if(result){
    //                 //成功
    //                 res.json({
    //                     code:200,
    //                     msg:'success'
    //                 });

    //             }else{
    //                 res.json({
    //                     code:'-1',
    //                     msg:'error'
    //                 });
    //             }
    //             connection.release();//释放连接
    //         });
    //     });
    // },
    // add:function(req,res){

    //     pool.getConnection(function(err,connection){

    //         var param = req.body;
    //         var employeename = param.employeename;
    //         var deparmentId = param.departmentId;
    //         var isWorker = param.isWorker;
    //         connection.query(employeemodel.add,[employeename,deparmentId,isWorker],function(err,result){
               
    //             if(result.insertId>0){
    //                //成功插入
    //                 res.json({
    //                     code:200,
    //                     msg:'success'
    //                 });

    //             }else{
    //                 res.json({
    //                     code:'-1',
    //                     msg:'error'
    //                 });
    //             }
    //             connection.release();//释放连接
    //         });
    //     });
    // },
    // list:function(req,res){

    //     pool.getConnection(function(err,connection){

    //         connection.query(employeemodel.select,[],function(err,result){
              
    //             if(result && result[0]){
    //                 res.render('employee/list', { title: '员工列表',list:result});

    //             }else{
    //                 res.json({
    //                     code:'-1',
    //                     msg:'error'
    //                 });
    //             }
    //             connection.release();//释放连接
    //         });
    //     });
    // }
};