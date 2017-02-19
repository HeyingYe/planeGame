<?php 
	$name = $_REQUEST["name"];
	$con = new mysqli("127.0.0.1","root","","planewar");
	if(!$con->connect_error){
		$flag = false;//假设玩家不存在
		$sql = "select * from play";
		$data = $con->query($sql);
		if($data->num_rows>0){
			while($row = $data->fetch_assoc()){
				if($row["name"] == $name){
					$flag = true;//玩家名已存在
				}
			}
		}
		// echo "连接成功";
	}
	if($flag){
		echo $flag;
	}else{
		$sql = "insert into play(name) values('$name')";
		if($con->query($sql)){
			echo "玩家id注册成功";
		}else{
			echo "玩家id注册失败";
		}
	}
 ?>