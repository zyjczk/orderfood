<?php
//这是一个php的上传图片实例，
/*
$_FILES['files']:从前台表单获取图片元素，files是name名称。
tmp_name：文件上传后，会生成一个临时文件名。
move_uploaded_file($file['tmp_name'],$picName):
将临时图片文件移入目标文件夹。
最后以json格式返回图片路径即可。
*/
jquery_save_img();
function jquery_save_img()  
    {  
        $arrType=array('image/jpg','image/gif','image/png','image/bmp','image/pjpeg','image/jpeg');  
        $max_size='500000000000';      // 最大文件限制（单位：byte）  
        $upfile='./uploads'; //图片目录路径  
        $file=$_FILES['files'];  
  
        /* 
        echo 'filename:'.$file['tmp_name'].';<br />'; 
        echo 'size:'.$file['size'].';<br />'; 
        echo 'type:'.$file['type'].';<br />'; 
        echo 'name:'.$file['name'].';<br />'; 
        */  
          
        if($_SERVER['REQUEST_METHOD']=='POST'){ //判断提交方式是否为POST  
            if(!is_uploaded_file($file['tmp_name'])){ //判断上传文件是否存在  
                echo "<font color='#FF0000'>文件不存在！</font>";  
                exit;  
            }  
  
            if($file['size']>$max_size){  //判断文件大小是否大于500000字节  
                echo "<font color='#FF0000'>上传文件太大！</font>";  
                exit;  
            }   
            if(!in_array($file['type'],$arrType)){  //判断图片文件的格式  
                echo "<font color='#FF0000'>上传文件格式不对！</font>xxx:".$file['type'];  
                exit;  
            }  
            if(!file_exists($upfile)){  // 判断存放文件目录是否存在  
                mkdir($upfile,0777,true);  
            }   
            $imageSize=getimagesize($file['tmp_name']);  
            $img=$imageSize[0].'*'.$imageSize[1];  
            $fname=$file['name'];  
            $ftype=explode('.',$fname);  
            $picName=$upfile."/cloudy".$fname;  
  
            if(file_exists($picName)){  
                
            }  
            if(!move_uploaded_file($file['tmp_name'],$picName)){    
                echo "<font color='#FF0000'>移动文件出错！</font>";  
                exit;  
            }  
            else{   
                echo '{"imgurl":"http://localhost/refactoring/lib/fileUpload/uploads/cloudy'.$fname.'"}';  
            }  
        }  
      
    }