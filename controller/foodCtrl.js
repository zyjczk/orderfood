var pool = require('../conf/conn');
var foodModel = require('../model/foodModel');
var companyModel = require('../model/companyModel');

module.exports = {
    del:function(req,res){

        pool.getConnection(function(err,connection){

            var param = req.query;
            var id = param.id;

            connection.query(foodModel.del,[id],function(err,result){
               
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
            connection.query(foodModel.selectOne,[id],function(err,result){
              
                if(result && result[0]){
                    res.render('food/edit', { title: '编辑餐品',detail:result[0]});

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

            connection.query(foodModel.edit,[name,code,id],function(err,result){
              
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
            var foodval = param.foodval;
            var companyId = param.companyId;
            // var weekDay = param.weekDay;
            var foodCode = param.foodCode;

            connection.query(foodModel.add,[foodval,companyId,foodCode],function(err,result){
               
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

            connection.query(companyModel.select,[],function(err,result){//查询供应商列表
                if(result && result[0]){
                    res.render('food/list',{title:'餐食列表',list:result})
                }else{
                    res.json({
                        code:'-1',
                        msg:'error'
                    })
                }
                connection.release();//释放链接
            })
            
        });
    },

    orderdetail:function(req,res){
        pool.getConnection(function(err,connection){

            var week = req.query.week;
            connection.query(foodModel.orderdetail,[week],function(err,result){
               
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
    },
    addFood:function(req,res){

        pool.getConnection(function(err,connection){

            connection.query(companyModel.select,[],function(err,result){//查询供应商列表
                if(result && result[0]){
                    res.render('food/add', { title: '增加餐品',list:result});
                }else{
                    res.json({
                        code:'-1',
                        msg:'error'
                    })
                }
                connection.release();//释放链接
            })
        });
    },
    query:function(req,res){

        pool.getConnection(function(err,connection){
            
            var companyId=req.query.companyId+"";
            var sql=foodModel.query;
            var sqlList=[companyId];
            // var weekDay=req.query.weekDay;
            // if(weekDay){
            //     sql+=' and weekDay=?';
            //     sqlList.push(weekDay)
            // }
           

            connection.query(sql,sqlList,function(err,result){//查询供应商列表
               
                if(result && result[0]){
                    res.json({list:result})
                }else{
                    res.json({
                        code:'-1',
                        msg:'error'
                    })
                }
                connection.release();//释放链接
            })
        })
    },
    queryFood:function(req,res){
        pool.getConnection(function(err,connection){
            connection.query(foodModel.queryAll,[],function(err,result){//查询供应商列表
                
                 if(result && result[0]){
                     res.json({list:result})
                 }else{
                     res.json({
                         code:'-1',
                         msg:'error'
                     })
                 }
                 connection.release();//释放链接
            })
        })
    },
    queryFoodCode:function(req,res){
        pool.getConnection(function(err,connection){
            var code=req.query.code;
            connection.query(foodModel.queryOne,[code],function(err,result){//查询供应商列表
                
                if(result && result.length==0){
                     res.json({success:true})
                }else{
                     res.json({success:false})
                }
                connection.release();//释放链接
            })
        })
    }
        
};