var pool = require('../conf/conn');
var departmentModel = require('../model/departmentModel');

module.exports = {
    del:function(req,res){

        pool.getConnection(function(err,connection){

            var param = req.query;
            var id = param.id;

            connection.query(departmentModel.del,[id],function(err,result){
                console.log(result);
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
    editPage:function(req,res){
        pool.getConnection(function(err,connection){
            var id = req.query.id;
            connection.query(departmentModel.selectOne,[id],function(err,result){
                console.log(result);
                if(result && result[0]){
                    res.render('department/edit', { title: '编辑部门',detail:result[0]});

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
    edit:function(req,res){
        pool.getConnection(function(err,connection){

            var param = req.body;
            var id = param.id;
            var name = param.name;
            var code = param.code;

            connection.query(departmentModel.edit,[name,code,id],function(err,result){
                console.log(result);
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
    add:function(req,res){

        pool.getConnection(function(err,connection){

            var param = req.body;
            var departmentname = param.departmentname;
            var code=param.code;

            connection.query(departmentModel.add,[departmentname,code],function(err,result){
                console.log(result.insertId);
                if(result.insertId>0){
                   //成功插入
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
    list:function(req,res){

        pool.getConnection(function(err,connection){

            connection.query(departmentModel.select,[],function(err,result){
                console.log(result);
                if(result && result[0]){
                    res.render('department/list', { title: '员工列表',list:result});

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
    query:function(req,res){
        
        pool.getConnection(function(err,connection){
            
            connection.query(departmentModel.select,[],function(err,result){

                if(result && result[0]){
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
    }
};