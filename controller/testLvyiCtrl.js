var pool = require('../conf/conn');
var fs = require('fs');
var ejsExcel=require("ejsExcel");
// var companyModel = require('../model/companyModel');


module.exports = {
    exportTxt:function(req,res){
        pool.getConnection(function(err,connection){
            console.log("导出数据");
            res.json({
                code:200,
                msg:'success'
            });
        });
    }
};