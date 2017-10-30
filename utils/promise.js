

var request = require('request');

exports.createPromise = function(url){
    var callback = function(resolve,reject){
        request(url,function(err,response,body){
            if(err){
                reject(err);
            }else{
                resolve(body);
            }
        });
    }
    var promise = new Promise(callback);
    return promise;
}