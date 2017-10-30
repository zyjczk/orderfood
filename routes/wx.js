var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');
var fs = require('fs');
var wxCtrl = require('../controller/wxCtrl');
/* 微信网页授权 */
var AppID = config.appid;
var AppSecret = config.appsecret;
var agentid = 1000020;
//入口页面
router.get('/', function(req,res, next){
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri=http%3a%2f%2fdc.che001.com%2fwx%2fuser&response_type=code&scope=snsapi_userinfo&&agentid='+agentid+'&state=STATE#wechat_redirect');

//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwe59cd5608392744f&redirect_uri=http%3a%2f%2fdc.che001.com%2fuser&response_type=code&scope=snsapi_userinfo&agentid=1000020&state=STATE#wechat_redirect
//     fs.readFile('../public/time.txt','utf8', function(err,data){
//         //格式：时间戳-时间戳
//
//         if(data){
//
//             var timearr = data.split('-');
//             var start_timestamp = parseInt(timearr[0]);
//             var end_timestamp = parseInt(timearr[1]);
//
//             var current_timestamp = Date.parse(new Date());
//             if((current_timestamp>=start_timestamp) && (current_timestamp<=end_timestamp)){
//                 //进入预定页面
//                 res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri=http%3a%2f%2fdc.che001.com%2fwx%2fuser&response_type=code&scope=snsapi_userinfo&&agentid='+agentid+'&state=STATE#wechat_redirect');
//
//
//             }else{
//                 res.redirect('/wx/nopage');
//             }
//
//         }else{
//             res.redirect('/wx/nopage');
//         }
//     });

});

/* 获取access_token */
router.get('/user', function(req,res, next){
    if(req.session.dearUserInfo){
        fs.readFile('../public/time.txt','utf8', function(err,data){
            //格式：时间戳-时间戳

            if(data){

                var timearr = data.split('-');
                var start_timestamp = parseInt(timearr[0]);
                var end_timestamp = parseInt(timearr[1]);

                var current_timestamp = Date.parse(new Date());
                if((current_timestamp>=start_timestamp) && (current_timestamp<=end_timestamp)){
                    //进入预定页面
                   // res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri=http%3a%2f%2fdc.che001.com%2fwx%2fuser&response_type=code&scope=snsapi_userinfo&&agentid='+agentid+'&state=STATE#wechat_redirect');
                    res.render('wx/orderfood',{userInfo:req.session.dearUserInfo});

                }else{
                    res.redirect('/wx/nopage?userid='+req.session.dearUserInfo.userid);
                }

            }else{
                res.redirect('/wx/nopage?userid='+req.session.dearUserInfo.userid);
            }
        });

    }else{
        // 第二步：通过code换取网页授权access_token
        var code = req.query.code;
        console.log('code>>>',code);
        //https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wwe59cd5608392744f&corpsecret=noA-426ktnwSZQsdIy8dlajESnCloNH46nExmdP7AvM
        request.get(
            {
                url:'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='+AppID+'&corpsecret='+AppSecret
            },
            function(error, response, body){
                if(response.statusCode == 200){

                    // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                    //console.log(JSON.parse(body));
                    var data = JSON.parse(body);
                    console.log('first step>>',data);
                    var access_token = data.access_token;
                    req.session.access_token = access_token;
                    if(data['errmsg'] =='ok'){
                        request.get(
                            {
                                url:"https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" + access_token + "&code=" + code
                            },
                            function(error2, response2, body2){
                                var data2 = JSON.parse(body2);
                                console.log('sencode step>>>',data2);
                                if(data2['errmsg'] =='ok'){
                                    request.get(
                                        {

                                            url:"https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=" + access_token + "&userid=" + data2.UserId
                                        },
                                        function(error3, response3, body3){
                                            var data3= JSON.parse(body3);
                                            req.session.dearUserInfo = data3;
                                            //只有在到了订餐时间后，才能看到订餐页面
                                            fs.readFile('../public/time.txt','utf8', function(err,data){
                                                //格式：时间戳-时间戳

                                                if(data){

                                                    var timearr = data.split('-');
                                                    var start_timestamp = parseInt(timearr[0]);
                                                    var end_timestamp = parseInt(timearr[1]);

                                                    var current_timestamp = Date.parse(new Date());
                                                    if((current_timestamp>=start_timestamp) && (current_timestamp<=end_timestamp)){
                                                        //进入预定页面
                                                        console.log('进入员工比对~~');
                                                        wxCtrl.insertEmployee(req,res,next);

                                                    }else{
                                                        //res.redirect('/wx/nopage');
                                                        res.redirect('/wx/nopage?userid='+data3.userid);
                                                    }

                                                }else{
                                                    //res.redirect('/wx/nopage');
                                                    res.redirect('/wx/nopage?userid='+data3.userid);
                                                }
                                            });






                                        }
                                    );
                                }else{
                                    res.redirect('/wx');
                                }

                            }
                        );
                    }else{
                        res.redirect('/wx');
                    }

                }else{
                    res.redirect('/wx');
                }
            }
        );
    }


});
router.get('/myfood',function(req,res,next){
   //res.json({code:200});
    var id = req.query.userid;
    res.render('wx/myfood',{employeeId:id});
});
router.get('/nopage',function(req,res,next){
    //res.json({code:200});
    res.render('wx/nopage');
});
router.post('/sendmessage', function(req,res, next){

    request.get(
        {
            url:'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid='+AppID+'&corpsecret='+AppSecret
        },function(error, response, body){
        var data = JSON.parse(body);
        console.log('first step>>',data);
        var access_token = data.access_token;
        if(data['errmsg'] =='ok'){
           
            var param = req.body;
            var minus_arr = JSON.parse(param.memberList);
           
            var url =  'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token='+access_token;
            
            //计数器
            var count = 0;
            var memberLength = minus_arr.length;
            var send=function(){
               
                if(count < memberLength){
                    var sendObj = {
                        "touser" : minus_arr[count],
                        "msgtype" : "text",
                        "agentid" : agentid,
                        "text" : {
                        "content" : "您还未订下周餐食,如需在公司用餐请尽快在工作台中完成订餐"
                    },
                        "safe":0
                    }
                   
                    request.post({
                        url: url,
                        method: "POST",
                        json: true,
                        headers: {
                            "content-type": "application/json",
                        },
                        body: sendObj
                    },function(error, response,body){
    
                    });
                    count++
                }else{
                    console.log('取消定时')
                    count=0;
                    clearInterval(sendInter);
                    res.json({
                        mes:'发送完成'
                    })
                }

            }

            var sendInter=setInterval(send,1000)
        }
    })

});



module.exports = router;
