//子弹类(构造函数)

function Bullet(){
	this.ele = document.createElement("div");
	//gameEngine.bullets对象中的id
	this.id = parseInt(Math.random()*100000) ;
	
	//初始化方法
	this.init = function(){
		this.ele.className = "bullet";
		gameEngine.ele.appendChild(this.ele);
		gameEngine.bullets[this.id] = this;
		
		//位置
		var left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2;
		this.ele.style.left = left + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//子弹移动 (向上移动)
	this.move = function(){
		var self = this;
		
		this.timer = setInterval(function(){
			
			if(self.ele.offsetTop < -18){
				clearInterval(self.timer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.bullets[self.id];
			}
			else{
				self.ele.style.top = self.ele.offsetTop - 10 + "px";
			}
			
		},30)
		
	}
	
	//子弹爆炸
	this.boom = function(){
		//清除move方法里的定时器
		clearInterval(this.timer);
		this.ele.className = "bullet-die";
		var self = this;
		var dieImgs = ["images/die1.png","images/die2.png"];//爆炸的状态保存在数组中
		var index = 0;
		
		var dieTimer = setInterval(function(){   //设置定时器
			
			if(index >= 2){
				clearInterval(dieTimer);				//关闭定时器
				gameEngine.ele.removeChild(self.ele);  //移除子弹
			}
			else{
				self.ele.style.background = "url("+ dieImgs[index] +") no-repeat";
				index++;
			}
		},30);
		
	}
}
