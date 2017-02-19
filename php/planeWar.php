<?php 
	// header("Access-Control-Allow-Origin: *");
	$name = $_REQUEST["name"];
	$score = $_REQUEST["score"];
	$con = new mysqli("127.0.0.1","root","","planewar");
	if(!$con->connect_error){
		$flag = false;//假设玩家不存在
		$sql = "select * from play";
		$data = $con->query($sql);
		if($data->num_rows>0){
			while($row_name = $data->fetch_assoc()){
				if($row_name["name"] == $name){
					$flag = true;//玩家名已存在
				}
			}
		}
	}
	//玩家id存在，开始记录分数
	if($flag){
		$sql = "update play set score='$score' where name='$name'";
		if($con->query($sql)){
			$sql = "select * from play order by score desc";
			$result = $con->query($sql);
			// print_r(json_encode($result));
			if($result->num_rows>0){
				$msg = array();
				while($row_play = $result->fetch_assoc()){
					if($row_play["score"]!=null){
						$player = array('name'=>$row_play['name'],'score'=>$row_play['score']);
						array_push($msg,$player);
					}
				}
			}
			print_r(json_encode($msg));
		}
	}
 ?>