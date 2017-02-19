

//碰撞检测
function isCrash(obj1,obj2){
	var t1 = obj1.offsetTop;
	var b1 = obj1.offsetTop + obj1.offsetHeight;
	var l1 = obj1.offsetLeft;
	var r1 = obj1.offsetLeft + obj1.offsetWidth;
	
	var t2 = obj2.offsetTop;
	var b2 = obj2.offsetTop + obj2.offsetHeight;
	var l2 = obj2.offsetLeft;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	
	if(t1 > b2 || b1 < t2 || r1 < l2 || l1 > r2){
		return false;
	}else{
		return true;
	}
	
	
}
