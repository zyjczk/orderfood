//得到对象
function getObj(lsObj){
	if(typeof(lsObj)=="object")return lsObj;
	return document.getElementById(lsObj);
}
//是否为空  
function isNullStr(lsValue){
	if(lsValue==null || lsValue=="") return true;
	else return false;
}
//去空格
function trim(lsValue){
	if(lsValue==null || lsValue=="") return "";
	return lsValue.replace(/(^\s*)|(\s*$)/g, "");
}
//判断是否为空
function checkEmpty(lsObj,lsLabel){
	var loObj = getObj(lsObj);//获取对象
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(lsValue==""){
	  var loMsgDiv=getObj("msg_"+lsObj);//获取错误提示节点对象
	  if(loMsgDiv!=null){
	  	loMsgDiv.innerHTML="<font color=red>请输入"+lsLabel+"！</font>";
	  }else{
	    alert("请输入"+lsLabel+"！");
	    getObj(lsObj).focus();
	  }
	  return false;
	  }else{
	  var loMsgDiv=getObj("msg_"+lsObj);
	  	if(loMsgDiv!=null){
	  		loMsgDiv.innerHTML="<font color=blue>通过</font>";
	  	}
	  }
	return true;
}
//判断是否是整型
function checkInt(lsObj,lsLabel){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(isNullStr(lsValue)) return true;
	var loMsgDiv=getObj("msg_"+lsObj);
	if(isNaN(lsValue)){//不是数字的时候
		 if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的输入格式正确！</font>";
		 }else{
			alert("请确保"+lsLabel+"的输入格式正确！");
			getObj(lsObj).focus();
		  }
			return false;
	}
	return true;	
}
//判断是否是数字
function checkNum(lsObj,lsLabel){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(isNullStr(lsValue)) return true;
	var loMsgDiv=getObj("msg_"+lsObj);
	if(isNaN(lsValue)){
		 if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的输入格式正确！</font>";
		 }else{
			alert("请确保"+lsLabel+"的输入格式正确！");
			getObj(lsObj).focus();
		  }
			return false;
	}
	return true;	
}

//检测只能是26个大小写英文字母和数字的函数
function checkNumAbc(lsObj,lsLabel){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(isNullStr(lsValue)) return true;
	var loMsgDiv=getObj("msg_"+lsObj);
	if(!IsNumAbc(lsValue)){
		 if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的输入格式为英文字字母或数字！</font>";
		 }else{
			alert("请确保"+lsLabel+"的输入格式为英文字字母或数字！");
			getObj(lsObj).focus();
		  }
			return false;
	}
	return true;	
}
//限制字符个数
function checkLength(lsObj,lsLabel,maxLen){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = loObj.value;
	if(isNullStr(lsValue)) return true;
	var loMsgDiv=getObj("msg_"+lsObj);
	if(lsValue.length>maxLen){
	     if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的内容长度不超过"+maxLen+"个汉字！</font>";
		 }else{
			alert("请确保"+lsLabel+"的内容长度不超过"+maxLen+"个汉字！");
			getObj(lsObj).focus();
		}
		
		return false;
	}
	return true;
}

//限制最小值
function checkBig(lsObj,lsLabel,lsStand){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = loObj.value;
	if(isNullStr(lsValue)) return true;
	var loMsgDiv=getObj("msg_"+lsObj);
	if(lsValue<=lsStand){
	    if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的数据大于"+lsStand+"！</font>";
		 }else{
			alert("请确保"+lsLabel+"的数据大于"+lsStand+"！");
			getObj(lsObj).focus();
		}
		return false;
	}
	return true;
}
//判断在该范围的字符之内
function checkIn(lsObj,lsLabel,lsRange){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(lsRange===null || lsRange=="") return true;
	var bWrong = false;
	for(var i=0;i<lsValue.length;i++){
		var iChar = lsValue.charAt(i);
		if(lsRange.indexOf(iChar)<0){
			bWrong = true;
			break;
		}
	}
	var loMsgDiv=getObj("msg_"+lsObj);
	if(bWrong){
	     if(loMsgDiv!=null){
		  	loMsgDiv.innerHTML="<font color=red>请确保"+lsLabel+"的输入格式正确！</font>";
		 }else{
	    	alert("请确保"+lsLabel+"的输入格式正确！");
	    	getObj(lsObj).focus();
	    }
	    return false;
	 }
	return true;	
}
//判断邮箱
function checkEmail(lsObj,lsLabel){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var strEmail = loObj.value;
	if(isNullStr(strEmail)) return true;
	var msgObj = getObj("msg_"+lsObj);
	if(isNullStr(strEmail)){
		if(msgObj!=null){msgObj.innerHTML="<font color=red>请输入"+lsLabel+"！</font>";}else{alert("请输入"+lsLabel+"！");}
		return false;
	}
	if (strEmail.search
	(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
	{var loMsgDiv=getObj("msg_"+lsObj);
	if(loMsgDiv!=null)
	{loMsgDiv.innerHTML="<font color=blue>通过</font>";}
	return true;}
	if(msgObj!=null){msgObj.innerHTML="<font color=red>请确保"+lsLabel+"的格式输入正确！</font>";}else{alert("请确保"+lsLabel+"的格式输入正确！");getObj(lsObj).focus();}
}
//清除
function clearValue(lsObj,lsDefaultValue){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(lsDefaultValue==lsValue){
		loObj.value="";
	}
}
function fullInValue(lsObj,lsDefaultValue){
	var loObj = getObj(lsObj);
	var lsValue = trim(loObj.value);
	if(lsValue!=""){return ;}else{loObj.value="请输入搜索关键字或词！";}
}
//两个控件输入内容是否一致
function checkEq(lsObj,lsObj2,lsLabel,lsLabel2){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var loObj2 = getObj(lsObj2);
	if(loObj2==null){alert("没有找到对象"+lsObj2+"组件！");return false;}
	var lsValue = loObj.value;
	var lsValue2 = loObj2.value;
	if(isNullStr(lsValue)&&isNullStr(lsValue2))return true;
	var msgObj = getObj("msg_"+lsObj);
	if(isNullStr(lsValue)){
		if(msgObj!=null){msgObj.innerHTML="<font color=red>请输入"+lsLabel+"！</font>";}else{alert("请输入"+lsLabel+"！");}
		return false;
	}
	if(lsValue!=lsValue2){if(msgObj!=null){msgObj.innerHTML="<font color=red>请确保"+lsLabel+"的输入与"+lsLabel2+"保持一致！</font>";}else{alert("请确保"+lsLabel+"的输入与"+lsLabel2+"保持一致！");getObj(lsObj).focus();}return false;}
	else if(lsValue2!=null && lsValue2!=""){var loMsgDiv=getObj("msg_"+lsObj);if(loMsgDiv!=null){loMsgDiv.innerHTML="<font color=blue>通过</font>";}}
	return true;
}
//判断是数字且有两位小数
function checkXiaoShu(lsObj,lsLabel){
alert(11);
	var xiaoshu=/^\d+[.]\d{2}$/;
	var loObj = getObj(lsObj);
	
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(!xiaoshu.test(lsValue)){//测试不通过时
		alert(11);
		var loMsgDiv=getObj("msg_"+lsObj);
		if(loMsgDiv!=null){
			loMsgDiv.innerHTML="<font color=red>"+lsLabel+"的小数位少于2位！</font>";
		}else{
			alert(""+lsLabel+"的小数不能少于2位！");
			getObj(lsObj).focus();
		}
		return false;
	}
	return true;
}

//输入至少长度的值
function checkLessLen(lsObj,lsLabel,lessLen){
	var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var lsValue = trim(loObj.value);
	if(lsValue==null || lsValue==""){var loMsgDiv=getObj("msg_"+lsObj);if(loMsgDiv!=null){loMsgDiv.innerHTML="<font color=red>请输入"+lsLabel+"！</font>";}else{alert("请输入"+lsLabel+"！");getObj(lsObj).focus();}return false;}
	if(lsValue.length<lessLen){var loMsgDiv=getObj("msg_"+lsObj);if(loMsgDiv!=null){loMsgDiv.innerHTML="<font color=red>"+lsLabel+"的长度不能少于"+lessLen+"位！</font>";}else{alert(""+lsLabel+"的长度不能少于"+lessLen+"位！");getObj(lsObj).focus();}return false;}
	else{var loMsgDiv=getObj("msg_"+lsObj);if(loMsgDiv!=null){loMsgDiv.innerHTML="<font color=blue>通过</font>";}}
	return true;
}

//检查两个日期
function CheckBigDate(lsObj,lsObj2,lsLabel,lsLabel2){
    var loObj = getObj(lsObj);
	if(loObj==null){alert("没有找到对象"+lsObj+"组件！");return false;}
	var loObj2 = getObj(lsObj2);
	if(loObj2==null){alert("没有找到对象"+lsObj2+"组件！");return false;}
	var lsValue = loObj.value;
	var lsValue2 = loObj2.value;
	var msgObj = getObj("msg_"+lsObj);

if(CheckDateNoAlert(lsObj,lsObj2)<=0){
	alert(lsLabel+"应该大于"+lsLabel2);
	return false;
}

}

//检查两个日期的输入是否正确(默认为相等0，小于-1,大于1,错误<-2),只返回结果,不提示
function CheckDateNoAlert(loStartDate,loEndDate)
{
	if(loStartDate==null || loEndDate==null)
	{
		return -2;
	}
	var YearDif,MonthDif,DayDif;
	
	var StartDate = loStartDate.value;
	var EndDate = loEndDate.value;
	
	if(StartDate.length==0) return -3;	
	if(EndDate.length==0) return -4;
	if(!IsRightDate(StartDate))
	{
		return -5;
	}
	if(!IsRightDate(EndDate))
	{
		return -6;
	}
	
	lnarray_Start_Date = StartDate.split("-");
	lnarray_End_Date = EndDate.split("-");
	
	
	YearDif = parseInt(lnarray_End_Date[0],10) - parseInt(lnarray_Start_Date[0],10);
	if(YearDif<0)
	{
		return -1;
	}
	if(YearDif>0)	return 1;
	
	MonthDif = parseInt(lnarray_End_Date[1],10) - parseInt(lnarray_Start_Date[1],10);
	if(MonthDif<0)
	{
		return -1;
	}
	if(MonthDif>0) 
		return 1;
			
	DayDif = parseInt(lnarray_End_Date[2],10) - parseInt(lnarray_Start_Date[2],10);

	if(DayDif<0)
	{
		return -1;
	}
	if(DayDif>=0) return 1;
}
//日期的正则
function IsRightDate(Str)
{
	var r = Str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if(r==null)return false;
	var d= new Date(r[1], r[3]-1, r[4]);
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
//判断当前字符串中的所有字符在指定的字符串中
function IsRightStr(lsStr1,lsStr2)
{
	if(lsStr1==null || lsStr2==null) return 0;
	var IsRight=1;
	var ch;
	for(i=0;i < lsStr1.length;i++)
	{
		ch=lsStr1.charAt(i);
		if(lsStr2.indexOf(ch)==-1)
		{
			IsRight=0;
			break;
		}
	}
	return IsRight;
}

//判断是否为数字
function IsNum(Str){
	if(IsRightStr(Str,"0123456789.-+")==0) return 0;	
	return 1;
}
//判断是否为整数
function IsInt(Str){
	if(Str==null || Str.length<=0) return 1;
	return IsRightStr(Str,"0123456789");
}
// 只允许输入数字 <input  ONKEYPRESS="event.returnValue=IsDigit();">
function IsDigit(){
  return ((event.keyCode >= 48) && (event.keyCode <= 57));
}
//检测只能是26个大小写英文字母和数字的函数
function IsNumAbc(e){
	var ok = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
	for(var i=0; i<e.length; i++){
		if (ok.indexOf(e.charAt(i))<0) {return false;}
	}
	return true;
}
//--加载样式--------------------------------------------------------------------------------------------------------------
//文本框，按钮样式
function form_style(){
	var aray =document.getElementsByTagName("td");
	for(var i = 0; i<aray.length; i++) {if(aray[i].innerHTML=="")aray[i].innerHTML="&nbsp;";}
	//按钮样式以及文本样式   动态加载样式
	var list_input=document.getElementsByTagName("input");//获取input表单并付给数组
	for(var i=0;i<list_input.length &&list_input[i];i++){
	    if(list_input[i].className!="")continue;
	    if(list_input[i].type.indexOf("button") !=  -1)list_input[i].className="inputTextbutton";
		if(list_input[i].type.indexOf("text") !=  -1)list_input[i].className="input_text";
		if(list_input[i].type.indexOf("password") !=  -1)list_input[i].className="input_text";	
		if(list_input[i].type.indexOf("submit") !=  -1)list_input[i].className="inputTextbutton";
		if(list_input[i].type.indexOf("reset") !=  -1)list_input[i].className="inputTextbutton";
		if(list_input[i].type.indexOf("file") !=  -1)list_input[i].className="input_text";
	    //--
	    if(list_input[i].disabled ==true&&list_input[i].type.indexOf("checkbox") ==  -1)list_input[i].className="input_text_reaonly";
	} 
//大文本框样式
	var list_textarea=document.getElementsByTagName("textarea");//获取textarea表单并付给数组
   	for(var i=0;i<list_textarea.length &&list_textarea[i];i++){list_textarea[i].className="input_text";}
 //下拉框 
 	var list_select=document.getElementsByTagName("select");//获取select表单并付给数组
   	for(var i=0;i<list_select.length &&list_select[i];i++){
   	    list_select[i].className="input_text";
   	    if(list_select[i].disabled ==true)list_select[i].className="input_text_reaonly";
    }
}