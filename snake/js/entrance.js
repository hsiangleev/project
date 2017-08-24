
/*
* oWidth : 整个背景的宽
* oHeight : 整个背景的高
* eleHead : 头节点
* eleBody : body节点
* eleFood : 食物节点
* btn : 按钮节点
* over : 游戏是否结束
* oBtn : 手机控制键节点
**/
(function (w){
	var DrawSnake=function (oWidth,oHeight,eleHead,eleBody,eleFood,btn,over,oBtn){
		this.oWidth=oWidth;
		this.oHeight=oHeight;
		this.eleHead=eleHead;
		this.eleBody=eleBody;
		this.eleFood=eleFood;
		this.btn=btn;
		this.over=over;
		this.oBtn=oBtn;

		//当前方向
		this.up=false;
		this.left=false;
		this.down=false;
		this.right=true;

		//食物随机坐标
		this.randomX=0;
		this.randomY=0;

		this._init();
		this.bind();
		//蛇头所在位置
		this.x=parseInt(this.eleHead.style.left);
		this.y=parseInt(this.eleHead.style.top);
		//上一次蛇头坐标
		this.currentX=0;
		this.currentY=0;
		//蛇身的每个点坐标
		this.arr=[];
	}
	DrawSnake.prototype={
		constructor: DrawSnake,
		//食物生成随机坐标
		food: function (){
			var arr1=[];
			for (var i = 20; i < this.oWidth; i+=20) {
				arr1.push(i);
			}
			var arr2=[];
			for (var i = 20; i < this.oHeight; i+=20) {
				arr2.push(i);
			}
			this.randomX=arr1[parseInt(Math.random()*arr1.length)];
			this.randomY=arr2[parseInt(Math.random()*arr2.length)];
			this.eleFood.style.left=this.randomX+"px";
			this.eleFood.style.top=this.randomY+"px";
		},
		//初始化蛇身
		_init: function (){
			for (var i = 0,len=this.eleBody.length; i < len; i++) {
				this.eleBody[i].style.left=(80-i*20)+"px";
			}
			this.eleHead.style.left="100px";
			this.eleHead.style.top="100px";
		},
		direction: function (contrary,boolean1,boolean2,boolean3,boolean4){
			if(contrary){
				this.left=boolean1;
				this.up=boolean2;
				this.down=boolean3;
				this.right=boolean4;
			}
		},
		headMove: function (){
			//重新获取节点
			this.eleBody=document.querySelectorAll(".oBody");
			var self=this;
			//上一次蛇头坐标
			this.currentX=this.x;
			this.currentY=this.y;
			/*
			* 1.如果不是pc端，则控制键显示
			* 2.否则添加键盘事件，判断蛇头移动方向
			* 3.不能反向移动，即当前若向右，则按不了左键
			**/
			if(this.oWidth<=768){
				this.oBtn.style.display="block";
				for(var i=2;i<6;i++){
					this.btn[i].onclick=function () {
						//获取自定义变量num
						control(parseInt(this.dataset["num"]));
					}
				}
			}else{
				document.addEventListener("keydown", function (e) {
					//左上右下：37 38 39 40
					var e=event || w.event;
					control(e.keyCode);
				}, false)
			}
			function control(num){
				switch (num){
					case 37:
						self.direction(!self.right,true,false,false,false);
						break;
					case 38:
						self.direction(!self.down,false,true,false,false);
						break;
					case 39:
						self.direction(!self.left,false,false,false,true);
						break;
					case 40:
						self.direction(!self.up,false,false,true,false);
						break;
					default:
				
						break;
				}
				
			}

			//出界则游戏结束，否则判断当前方向再移动蛇头
			if(this.x<0 || this.y<0 || this.x>=this.oWidth || this.y>=this.oHeight){
				this.over=true;
			}else{
				if(this.left){
					this.x-=20;
					this.eleHead.style.left=this.x+"px";
				}else if(this.right){
					this.x+=20;
					this.eleHead.style.left=this.x+"px";
				}else if(this.up){
					this.y-=20;
					this.eleHead.style.top=this.y+"px";
				}else{
					this.y+=20;
					this.eleHead.style.top=this.y+"px";
				}
			}
			/*
			* 1.调用bodyArr
			* 2.判断当蛇头坐标等于数组中的其中一个
			* 3.则认为蛇头撞蛇尾，游戏结束
			**/
			this.bodyArr();
			for (var i = 0,len=this.arr.length; i < len; i++) {
				if(this.x==this.arr[i].left && this.y==this.arr[i].top){
					this.eatFood();
					this.over=true;
				}
			}
		},
		//删除蛇尾，添加到蛇头，以模拟蛇尾移动
		bodyMoveDelete: function (){
			var lastNode=this.eleBody[this.eleBody.length-1].parentNode.removeChild(this.eleBody[this.eleBody.length-1]);
			lastNode.style.left=this.currentX+"px";
			lastNode.style.top=this.currentY+"px";
			this.eleBody[0].parentNode.insertBefore(lastNode,this.eleBody[0]);
		},
		//则克隆新节点，添加到蛇头，以模拟蛇尾移动
		bodyMoveClone: function (){
			var newNode=this.eleBody[0].cloneNode(false);
			newNode.style.left=this.currentX+"px";
			newNode.style.top=this.currentY+"px";
			this.eleBody[0].parentNode.insertBefore(newNode,this.eleBody[0]);
		},
		/*
		* 1.若蛇头坐标与食物坐标重合，则表示吃到食物
		* 2.吃到食物则重新生成食物坐标
		* 3.克隆新节点，添加到蛇头，执行 bodyMoveClone
		* 4.否则删除蛇尾，添加到蛇头，执行 bodyMoveDelete
		**/
		eatFood: function (){
			if(this.x==this.randomX && this.y==this.randomY){
				this.food();
				this.bodyMoveClone();
			}else{
				this.bodyMoveDelete();
			}
		},
		//把蛇身的每个节点坐标都加入数组,用来判断蛇头撞蛇尾
		bodyArr: function (){
			//每次先清空数组
			this.arr=[];
			for (var i = 0,len=this.eleBody.length; i < len; i++) {
				this.arr.push({
					"left": this.eleBody[i].offsetLeft,
					"top": this.eleBody[i].offsetTop
				})
			}
		},
		bind: function (){
			//点击结束返回
			this.btn[0].onclick=function (){
				history.go(0);
			}
		}
	}
	//单例模式
	var snake=null;
	w.DrawSnake=function (oWidth,oHeight,eleHead,eleBody,eleFood,btn,over,oBtn){
		if(!snake){
			snake=new DrawSnake(oWidth,oHeight,eleHead,eleBody,eleFood,btn,over,oBtn);
		}
		return snake;
	}
})(window)