<?php
//h1源码网  www.h1.com
if(isset($_FILES['file'])){
if(is_uploaded_file($_FILES['file']['tmp_name']))
{
    $ext_suffix = pathinfo($_FILES["file"]["name"])['extension'];
	$allow_suffix = array('png');
	if(!in_array($ext_suffix, $allow_suffix)){
		$json = '{"code":1,"msg":"抱歉,您上传的数据,格式不支持！"}';
        echo $json;
	}else{
        $ret = array();
        $uploadDir = 'images'.DIRECTORY_SEPARATOR.date("Y").DIRECTORY_SEPARATOR.date("m").DIRECTORY_SEPARATOR.date("d").DIRECTORY_SEPARATOR;
        $dir = dirname(__FILE__).DIRECTORY_SEPARATOR.$uploadDir;
        file_exists($dir) || (mkdir($dir,0777,true) && chmod($dir,0777));
              if(!is_array($_FILES["file"]["name"])) //single file
              {
              $fileName = time().uniqid().'.'.pathinfo($_FILES["file"]["name"])['extension'];
              move_uploaded_file($_FILES["file"]["tmp_name"],$dir.$fileName);
              $ret['file'] =get_http_type().$_SERVER['SERVER_NAME'].DIRECTORY_SEPARATOR.$uploadDir.$fileName;
              }
        $json = '{"code":0,"msg":"'.$ret['file'].'"}';
        echo $json;
	}
}else{
    $json = '{"code":1,"msg":"抱歉,您上传的数据,不是图片！"}';
    echo $json;
}
}
//自动获取协议头
function get_http_type()
{
    $http_type = ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https')) ? 'https://' : 'http://';
    return $http_type;
}
?>