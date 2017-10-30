/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d
;
    template.helper('dateFormat', function (date, format) {/* 在模板中追加可模板直接调用的日期格式化方法 */
        if(!date){return '';}
        // 后端返回的日期时间格式有两种
        // "2015-08-14T01:41:57.475+0000" "2015-08-14 09:41:57"
        // new Date("2015-08-14 09:41:57")在ff/IE中总报错。
        // new Date("2015-08-14T01:41:57.475+0000")在IE8及之前中总报错。
        var matches=date.match(/(\d+)-(\d+)-(\d+)(?:[^\d]+)(\d+):(\d+):(\d+)/);
        date = new Date(matches[1]-0,matches[2]-1,matches[3]-0,matches[4]-0,matches[5]-0,matches[6]-0);
        var map = {
            "M": date.getMonth() + 1, /* 月份 */
            "d": date.getDate(), /* 日 */
            "h": date.getHours(), /* 小时 */
            "m": date.getMinutes(), /* 分 */
            "s": date.getSeconds(), /* 秒 */
            "q": Math.floor((date.getMonth() + 3) / 3), /* 季度 */
            "S": date.getMilliseconds() /* 毫秒 */
        };

        if(!format)format='yyyy-MM-dd hh:mm:ss';
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });
    template.helper('temSplit', function (str,seperator,index) {/* 指定分隔符和下标获取元素 */
        return str.split(seperator)[index];
    });
    template.helper('weekToStr', function (str,seperator,index) {/* 指定分隔符和下标获取元素 */
        var temp = null;
        var arrWeek = [{'mon':'周一'},{'tue':'周二'},{'wed':'周三'},{'thu':'周四'},{'fri':'周五'},{'sat':'周六'},{'sun':'周日'}];
        for(var i=0;i<arrWeek.length;i++){
            for(var key in arrWeek[i]){
                if(key == str){
                    return arrWeek[i][key];
                }
            }
        }

       // return str.split(seperator)[index];
    });
    template.helper('tplParseInt', function (num) {
        if(num==null||num==='')return '';
        return parseInt(num||0);
    });
    template.helper('ObjtoStr',function(obj,seperator){
        //console.log(obj);
        return JSON.stringify(obj);
    });
    //处理以下两种情况的日期，返回2015-09-14这样的格式。
    //2015-12-02T02:53:23.777+0000;
    // 2015-09-14 00:00:00
    template.helper('dateSubstr',function(str, separator){
        //console.log(obj);
        var datestr = str.match(/\d{4}-\d{2}-\d{2}/);
        return datestr[0];
    });
    template.helper('che_dateFormat',function(str, fmt){
        //console.log(obj);
        var datestr = str.match(/\d{4}-\d{2}-\d{2}/);
        var t = new Date(datestr[0]);
        //alert(t.getMonth());
        var o = {
            "M+" : t.getMonth()+1,                 //月份
            "d+" : t.getDate(),                    //日
            "h+" : t.getHours(),                   //小时
            "m+" : t.getMinutes(),                 //分
            "s+" : t.getSeconds(),                 //秒
            "q+" : Math.floor((t.getMonth()+3)/3), //季度
            "S"  : t.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (t.getFullYear()+"").substr(4 - RegExp.$1.length));
        //alert(fmt);
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    });
    //处理以下两种情况的日期，返回 2015年09月14日 这样的格式。
    //2015-12-02T02:53:23.777+0000;
    // 2015-09-14 00:00:00

    template.helper('formatMoney', function (string, separator) {/* 格式化金额，默认逗号分隔 */
        if(!string)return 0.00;

        string =toDecimal2(string);

        if(!separator) separator = ',';
        typeof string === 'number' && (string += '');
        return string.replace(/\b\d+\b/, function(str){
            var len = str.length, miu = Math.floor((len%3 === 0 ? (len - 1) : len)/3);
            if (len < 4) {return str};
            str = str.split('');
            for(var i=1,j=0; i<= miu; i++,j++){
                str.splice(len-i*3-j, 0, separator);
                len++
            }
            return str.join('');
        })
    });
// 制保留2位小数，如：2，会在2后面补上00.即2.00
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
}();
//禁用缓存
template.config('cache', false);