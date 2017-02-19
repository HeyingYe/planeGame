//我方飞机

var myPlane = {
	//属性
	ele : null,
	fireInterval : 80,  //子弹发射频率
	
	//初始化方法
	init : function(){
		this.ele = document.createElement("div");  //创建飞机
		this.ele.className = "myplane";  //引用样式
		
		// console.log(gameEngine.ele);
		gameEngine.ele.appendChild(this.ele);  //追加到游戏区域中来
		//位置；
		this.ele.style.left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth)/2 + 'px';
		//this.ele.style.top = gameEngine.ele.offsetHeight - this.ele.offsetHeight + "px";
		this.ele.style.bottom = 0;
 		
 		//飞机拖拽
 		this.startDrag();
		return this;
 	
	},
	
	//发射子弹
	fire : function(){
		this.timer = setInterval(function(){
			//创建子弹并发射
			var bullet = new Bullet();   //实例化子弹对象
			bullet.init().move();   //初始化子弹对象并发射
	
		},this.fireInterval)
	},
	
	//飞机拖拽
	// offsetX: 鼠标位置距离目标元素(鼠标点击的元素)的左边界的距离
	// offsetY: 鼠标位置距离目标元素(鼠标点击的元素)的上边界的距离
	startDrag : function(){
		this.ele.onmousedown = function(evt){
			var oEvent = evt || event;
			var divX = oEvent.offsetX;
			var divY = oEvent.offsetY;
			
			document.onmousemove = function(evt){
				var oEvent = evt || event;
				var x = oEvent.clientX - gameEngine.ele.offsetLeft - divX;
				var y = oEvent.clientY - divY;
				
				if(x < 0){ //移动出游戏区域左边界
					x = 0;
				}
				if(y < 0){
					y = 0;
					}
				//移动出游戏区域右边界
				else if(x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}else if(y > gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
					y = gameEngine.ele.offsetHeight - myPlane.ele.offsetHeight;
					}
				
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";
	
			}
			
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
 
	},
	
	//飞机爆炸
	boom : function(callback){
		
		clearInterval(this.timer); //清除定时器，发射子弹的定时器
		
		var dieImgs = ["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];
		var index = 0;
		
		var dieTimer = setInterval(function(){
			
			if(index >= dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				callback(); //回调
			}else{
				myPlane.ele.style.background = "url("+ dieImgs[index++] +") no-repeat";
			}
			
		},50);
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
