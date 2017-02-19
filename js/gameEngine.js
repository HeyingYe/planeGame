

//游戏引擎(对象)
/*
 * 开始游戏, 加载游戏, 进入游戏主界面
 * 创建敌机, 控制移动我的飞机, 碰撞检测...
 */
var gameEngine = {
	//属性ele:是游戏的主界面(游戏区域) 
	ele: null,
	name:null,//玩家名
	bullets:[], //保存所有在游戏区域显示的子弹
	enemys:[], //保存所有在游戏区域显示的敌机
	isCrashmyPlane: false, //是否碰撞到了我的飞机
	scoreNode: null, //分数的节点对象
	//方法:
	//初始化方法init
	init: function(){
		this.ele = document.getElementById("main_body");
		return this;
	},
	
	//开始游戏start
	start: function(){
		//加载游戏
		gameEngine.loading(function(){
			//现在已经加载游戏完毕
			//现在可以正式游戏了
			// console.log("开始正式游戏");
			
			//1, 显示我的飞机, 并发射子弹
			myPlane.init().fire();
			
			//2, 开启键盘监听
			gameEngine.keyListening();
			
			//3, 创建敌机
			gameEngine.crateEnemy();
			
			//4, 碰撞检测
			gameEngine.crashListening();
			 
			//5, 显示分数
			gameEngine.showScore();
			
			//6, 让背景图移动
			gameEngine.move();
		});
		
	},
	
	//加载游戏
	loading: function(loadCallBack) {
		
		//显示logo
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//显示加载动画的图片
		var load = document.createElement("div");
		load.className = "loading";
		gameEngine.ele.appendChild(load);
		
		//开始加载动画
		var index = 0;
		var loadImgs = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
		var timer = setInterval(function(){
			
			//当运动到index==2时, 则游戏加载结束
			if (index >= 2) {
				clearInterval(timer); //关闭定时器
				//移除图片(logo,load)
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				loadCallBack(); 
			}
			else {
				//切换图片
				index++;
				load.style.background = "url(" + loadImgs[index%3] + ") no-repeat";
			}
		}, 500);
		
	},
	//键盘监听 
 	keyListening : function(){
 		var speed=0;
		var ispeed=0;
		document.onkeydown=function(evt){
			var oEvent= evt || event;
			if(oEvent.keyCode==37){
				speed=-10;
				}
			if(oEvent.keyCode==38){
				ispeed=-10;
				}
			if(oEvent.keyCode==39){
				speed=10;
				}
			if(oEvent.keyCode==40){
				ispeed=10;
				}
			}
		document.onkeyup=function(){
			speed=0;
			ispeed=0;
			}
		 this.timer=setInterval(function(){
			var x=myPlane.ele.offsetLeft+speed;
			var y=myPlane.ele.offsetTop+ispeed;
			if(x<0){
					x=0;
					}
				if(y<0){
					y=0;
					}
				if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
					}
				if(y>gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
					y=gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight;
					}
				myPlane.ele.style.left=x+'px';
				myPlane.ele.style.top=y+'px';
			},30);
		},
 	
 	//创建敌机
 	crateEnemy : function(){
 		//随机出现大型敌机
 		setInterval(createBig,6000);
 		function createBig(){
 			var flag = Math.random() > 0.7 ? true : false;    //30%的机会出现大型敌机
 			if(flag){
 				// console.log("大型机");
 				var bigEnemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
 				bigEnemy.init().move();
 			}
 		}
 		//随机出现中型敌机
 		setInterval(createMiddle,1000);
 		function createMiddle(){
 			var flag = Math.random() > 0.6 ? true : false;  //40%的机会出现中型敌机
 			if(flag){
 				// console.log("中型机");
 				var middleEnemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
 				middleEnemy.init().move();
 			}
 		}
 		
 		//随机出现小型敌机
 		setInterval(createSmall,500);
 		function createSmall(){
 			var flag = Math.random() > 0.5 ? true : false;  //50%的机会出现小型敌机
 			if(flag){
 				var smallEnemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
 				smallEnemy.init().move();
 			}
 		} 		
 	// 	this.timer = setInterval(function(){
		// 	var num = Math.random();
		// 	if(num > 0.85){
		// 		var big = new Enemy(Enemy.prototype.Enemy_type_big);
		// 		big.init().move();
		// 	}else if(num >= 0.6&&num<=0.85){
		// 		var mid = new Enemy(Enemy.prototype.Enemy_type_mid)
		// 		mid.init().move();
		// 	}else if(num > 0&&num < 0.6){
		// 		var small = new Enemy(Enemy.prototype.Enemy_type_small);
		// 		small.init().move();
		// 	}
		// },50)
 	},
	
	//碰撞检测
	crashListening : function(){
		
		var timer = setInterval(function(){
			
			for(var i in gameEngine.enemys){
				
				for(var j in gameEngine.bullets){
					
					if(isCrash(gameEngine.enemys[i].ele,gameEngine.bullets[j].ele)){
						
						gameEngine.bullets[j].boom();
						delete gameEngine.bullets[j];
						gameEngine.enemys[i].hurt();
					}
				}
				
				if(!gameEngine.isCrashmyPlane && isCrash(gameEngine.enemys[i].ele,myPlane.ele)){
					
					isCrashmyPlane = true;
					clearInterval(timer);
					myPlane.boom(function(){
						//传送数据到后台，存入数据库
						ajax({
							"method":"GET",
							"async":true,
							"url":"./php/planeWar.php",
							"data":{
								"name":gameEngine.name,
								"score":gameEngine.scoreNode.innerHTML
							},
							callback:function(str){
								var oUl = document.createElement('ul');
								oUl.className = "result";
								var aLi = document.createElement('li');
     								aLi.innerHTML = "<span class='player_name'>玩家ID</span><span class='play_score'>分数</span>";
     							oUl.appendChild(aLi);
								document.body.appendChild(oUl);
								var data = JSON.parse(str);
								// console.log(data)
     							for(var i = 0;i<data.length;i++){
     								var aLi = document.createElement('li');
     								aLi.innerHTML = "<span class='player_name'>"+data[i].name+"</span><span class='play_score'>"+data[i].score+"</span>";
     								oUl.appendChild(aLi);
     							}
							 }
						})
						// alert("Game Over!");
						// location.reload();
					});
				}
			}
		},30);
 
	},
	//显示分数
	showScore : function(){
		
		this.scoreNode = document.createElement("div");
		this.scoreNode.className = "score";
		this.scoreNode.innerHTML = "0";
		gameEngine.ele.appendChild(this.scoreNode);
	},
	
	//让背景图移动
	
	move : function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
			
		},30);
	},


}






