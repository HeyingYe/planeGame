//敌机
//type 敌机类型 ，大 中 小
function Enemy(type){
	//属性
	this.ele = document.createElement("div");
	this.hp = 0;  //血量
	this.speed = 0; //速度
	this.dieImgs = []; //爆炸时的状态图片数组
	
	this.score = 0; //分数
	//当前敌机在gameEngine.enemys对象中的id
	this.id = parseInt(Math.random()*100000) ;  
	
	//敌机的初始化的方法
	this.init = function(){
		switch(type){
			case this.Enemy_Type_Large :
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_HP_Large;
				// console.log(this.hp);
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png"];
				this.score = 30;
				break;
			case this.Enemy_Type_Middle :
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_HP_Middle;
				// console.log(this.hp);
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png"];
				this.score = 20;
				break;	
			case this.Enemy_Type_Small :
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_HP_Small;
				// console.log(this.hp);
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png"];
				this.score = 10;
				break;						
		}
		
		gameEngine.ele.appendChild(this.ele);
		gameEngine.enemys[this.id] = this;
		
		//位置
		var left = Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth);
		this.ele.style.left = left + "px";
		this.ele.style.top = - gameEngine.ele.offsetHeight + "px";
		return this;
	}
	
	//敌机移动的方法(向下移动)
	this.move = function(){
		var self = this;
		this.timer = setInterval(function(){
			if(self.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(self.timer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];				
			}
			else{
				self.ele.style.top = self.ele.offsetTop + self.speed + "px";
			}
	
		},30)
		
	}
	
	//失去一滴血量
	this.hurt = function() {
		this.hp--; //掉一点血
		if (this.hp == 0) { //当血量为0时
			this.boom(); //爆炸
			//把分数添加
			// console.log(this.score);
			gameEngine.scoreNode.innerHTML = (gameEngine.scoreNode.innerHTML-0) + this.score;
		}
	}
	
	//敌机爆炸
	this.boom = function(){
		var self = this;
		clearInterval(this.timer);
		var index = 0;
		var dieTimer = setInterval(function(){
			if(index >= self.dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];					
			}
			else{
				self.ele.style.background = "url("+ self.dieImgs[index++] +") no-repeat";
			}
			
			
		},50);
	}
	
 	
}

Enemy.prototype = {
	Enemy_Type_Large : 1,   //大型敌机
	Enemy_Type_Middle : 2,  //中型敌机
	Enemy_Type_Small : 3,   //小型敌机
	
	Enemy_HP_Large : 8,     //大型敌机血量
	Enemy_HP_Middle : 4,	//中型敌机血量
	Enemy_HP_Small : 1,		//小型敌机血量
	
	Enemy_Speed_Large : 2,	//大型敌机速度
	Enemy_Speed_Middle : 4, //中型敌机速度
	Enemy_Speed_Small : 8	//小型敌机速度
}


