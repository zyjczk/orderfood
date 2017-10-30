var pool = require('../conf/conn');
var companyModel = require('../model/companyModel');

module.exports = {
    del:function(req,res){

        pool.getConnection(function(err,connection){

            var param = req.query;
            var id = param.id;

            connection.query(companyModel.del,[id],function(err,result){
               
                
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
            connection.query(companyModel.selectOne,[id],function(err,result){
               
                if(result && result[0]){
                    res.render('company/edit', { title: '编辑供应商',detail:result[0]});

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

            connection.query(companyModel.edit,[name,code,id],function(err,result){
              
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
            var name = param.name;
            var code = param.code

            connection.query(companyModel.add,[name,code],function(err,result){
               
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
            connection.query(companyModel.select,[],function(err,result){
              
                if(result && result[0]){
                    res.render('company/list', { title: '供应商列表',list:result});

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
    api:function(req,res){

        pool.getConnection(function(err,connection){

            connection.query(companyModel.select,[],function(err,result){
               
                if(result && result[0]){
                    res.json({ list:result});

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