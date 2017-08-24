
/*
* DrawBg(cvs,ctx,oCon,currentBox,willBox,img,x,y,aOver)
* cvs : 当前绘图环境
* ctx : 当前绘图环境
* oCon : 当前模拟画布拖拽的盒子节点
* currentBox : 当前点击的盒子
* willBox : 将要将换的盒子
* img : 加载的图片素材
* x : 在横轴上等分图片数
* y : 在纵轴上等分图片数
* aOver : 结束时显示的盒子
**/
(function (w){
	function DrawBg(cvs,ctx,oCon,currentBox,willBox,img,x,y,aOver){
		this.cvs=cvs;
		this.ctx=ctx;
		this.oCon=oCon;
		this.currentBox=currentBox;
		this.willBox=willBox;
		this.img=img;
		this.x=x;
		this.y=y;
		this.aOver=aOver;
		//图片宽高
		this.width=this.img.width;
		this.height=this.img.height;
		//画布宽高(800*600)
		this.cvsWidth=this.cvs.width;
		this.cvsHeight=this.cvs.height;

		//在原图片中每一张小图宽高
		this.oWidth=this.width/this.x;
		this.oHeight=this.height/this.y;
		//在当前画布中中每一张小图宽高(画图，清图使用)
		this.cWidth=this.cvsWidth/this.x;
		this.cHeight=this.cvsHeight/this.y;

		//手机满屏画布宽高(屏幕宽高)
		this.cvsPhoneWidth=this.cvs.offsetWidth;
		this.cvsPhoneHeight=this.cvs.offsetHeight;
		//手机满屏,在当前画布中中每一张小图宽高(非手机设备时等于this.cWidth,this.cHeight)
		this.cPhoneWidth=this.cvsPhoneWidth/this.x;
		this.cPhoneHeight=this.cvsPhoneHeight/this.y;

		//存放初始坐标
		this.oArr=[];
		//存放打乱后的坐标
		this.randomArr=[];

		this._init();
		this.draw();
		// this.bind();
		this.phoneBind();
	}
	DrawBg.prototype={
		constructor: DrawBg,
		//初始化大图片
		_init: function (){
			//先清除画布
			this.ctx.clearRect(0,0,this.cvsWidth,this.cvsHeight);
			// this.ctx.drawImage(this.img,0,0,this.width,this.height,
			// 	0,0,this.cvsWidth,this.cvsHeight);
			//初始坐标
			for (var i = 0; i < this.x; i++) {
				for(var j = 0; j < this.y; j++){
					this.oArr.push([i,j]);
					this.randomArr.push([i,j]);
				}
			}
			// console.log(this.randomArr)
		},
		//绘制背景小图片
		draw: function (){
			var self=this;
			//打乱坐标
			this.randomDraw();
			
			this.randomArr.forEach( function(v, i) {
				self.ctx.drawImage(self.img,self.oWidth*v[0],self.oHeight*v[1],self.oWidth,self.oHeight,self.cWidth*self.oArr[i][0],self.cHeight*self.oArr[i][1],self.cWidth,self.cHeight);
			});
		},
		randomDraw: function (){
			//设置随机数组
			this.randomArr.sort(function (a,b){
				return Math.random()-0.5;
			})
		},
		//显示需要交换的两个小盒子
		showBox: function (x,y,ele){
			var currentPosition=0;
			var i1=Math.floor(x/this.cPhoneWidth);
			var i2=Math.floor(y/this.cPhoneHeight);
			for (var i = 0,len=this.oArr.length; i < len; i++) {
				if(i1==this.oArr[i][0] && i2==this.oArr[i][1]){
					currentPosition=i;
				}
			}
			//找到图片所在位置
			var currentPosiLeft=this.oArr[currentPosition][0]*this.cPhoneWidth;
			var currentPosiTop=this.oArr[currentPosition][1]*this.cPhoneHeight;
			console.log(currentPosition)
			
			//修改盒子宽高
			ele.style.width=this.cPhoneWidth+"px";
			ele.style.height=this.cPhoneHeight+"px";
			//显示盒子
			ele.style.display="block";
			//修改盒子出现位置
			ele.style.left=currentPosiLeft+"px";
			ele.style.top=currentPosiTop+"px";
			// 找到图片位置
			var currentImgLeft=this.randomArr[currentPosition][0]*this.cPhoneWidth;
			var currentImgTop=this.randomArr[currentPosition][1]*this.cPhoneHeight;
			ele.style.background="url("+this.img.src+") no-repeat top "+-1*currentImgTop+"px left "+-1*currentImgLeft+"px";
			
			if(this.cvsPhoneWidth<=768){
				ele.style.backgroundSize=this.cvsPhoneWidth+"px "+this.cvsPhoneHeight+"px";
			}else{
				ele.style.backgroundSize=" 800px 600px";
			}

			//返回值便于后面使用
			return currentPosition;
		},
		phoneBind: function (){
			var self=this;
			var currentPosition=0,xx,yy,x,y;
			//初始化鼠标最后停留的index
			var lastIndex=0;
			if(this.cvsPhoneWidth<=768){
				EventUtil.addHandler(this.oCon,"touchstart",down);
			}else{
				EventUtil.addHandler(this.oCon,"mousedown",down);
			}
			
			function down(){
				var e=event || window.event;
				EventUtil.preventDefault(e);
				if(self.cvsPhoneWidth<=768){
					//鼠标在画布中的位置
					x=e.touches[0].clientX-this.offsetLeft;
					y=e.touches[0].clientY-this.offsetTop;
				}else{
					//鼠标在画布中的位置
					x=e.clientX-this.offsetLeft;
					y=e.clientY-this.offsetTop;
				}
				//显示当前盒子
				currentPosition=self.showBox(x,y,self.currentBox);
				// console.log(currentPosition)
				//清除画布
				self.ctx.clearRect(self.oArr[currentPosition][0]*self.cWidth,self.oArr[currentPosition][1]*self.cHeight,self.cWidth,self.cHeight);
				
				//鼠标在box中的位置
				xx=x-self.currentBox.offsetLeft;
				yy=y-self.currentBox.offsetTop;
				if(self.cvsPhoneWidth<=768){
					EventUtil.addHandler(document,"touchmove",move);
				}else{
					EventUtil.addHandler(document,"mousemove",move);
				}
				
			}
			if(this.cvsPhoneWidth<=768){
				EventUtil.addHandler(document,"touchend",up);
			}else{
				EventUtil.addHandler(document,"mouseup",up);
			}
			
			function up(){
				//先画原处
				self.ctx.drawImage(self.img,self.oWidth*self.randomArr[lastIndex][0],self.oHeight*self.randomArr[lastIndex][1],self.oWidth,self.oHeight,
					self.cWidth*self.oArr[currentPosition][0],self.cHeight*self.oArr[currentPosition][1],self.cWidth,self.cHeight);

				self.ctx.drawImage(self.img,self.oWidth*self.randomArr[currentPosition][0],self.oHeight*self.randomArr[currentPosition][1],self.oWidth,self.oHeight,
					self.cWidth*self.oArr[lastIndex][0],self.cHeight*self.oArr[lastIndex][1],self.cWidth,self.cHeight);

				//隐藏盒子
				self.currentBox.style.display="none";
				self.willBox.style.display="none";
				//更新随机数组(交换顺序)
				var temp=self.randomArr[currentPosition];
				self.randomArr.splice(currentPosition,1,self.randomArr[lastIndex]);
				self.randomArr.splice(lastIndex,1,temp);
				// console.log(self.randomArr);

				//两个数组完全相等则游戏结束
				if(self.gameOver()){
					self.aOver.style.display="block";

					if(self.cvsPhoneWidth<=768){
						//游戏结束,移除事件
						EventUtil.removeHandler(self.oCon,"touchstart",down);
						EventUtil.removeHandler(document,"touchend",up);
					}else{
						//游戏结束,移除事件
						EventUtil.removeHandler(self.oCon,"mousedown",down);
						EventUtil.removeHandler(document,"mouseup",up);
					}	
				}
				if(self.cvsPhoneWidth<=768){
					EventUtil.removeHandler(document,"touchmove",move);
				}else{
					EventUtil.removeHandler(document,"mousemove",move);
				}
				
					
			}
			//盒子移动来模拟画布的移动
			function move(){
				var e=event || window.event;
				if(self.cvsPhoneWidth<=768){
					var xxx=e.touches[0].clientX-self.oCon.offsetLeft-xx;
					var yyy=e.touches[0].clientY-self.oCon.offsetTop-yy;
				}else{
					var xxx=e.clientX-self.oCon.offsetLeft-xx;
					var yyy=e.clientY-self.oCon.offsetTop-yy;
				}
					
				//超界处理
				xxx=xxx<0?0:xxx;
				yyy=yyy<0?0:yyy;
				xxx=xxx>self.cvsPhoneWidth-self.cPhoneWidth?self.cvsPhoneWidth-self.cPhoneWidth:xxx;
				yyy=yyy>self.cvsPhoneHeight-self.cPhoneHeight?self.cvsPhoneHeight-self.cPhoneHeight:yyy;

				self.currentBox.style.left=xxx+"px";
				self.currentBox.style.top=yyy+"px";

				//盒子中心点坐标
				var cornerX=xxx+self.cPhoneWidth/2;
				var cornerY=yyy+self.cPhoneHeight/2;
				//显示需要交换的盒子
				lastIndex=self.showBox(cornerX,cornerY,self.willBox);
				
			}
		},
		//已经与上面代码合并
		// bind: function (){
		// 	var self=this;
		// 	var currentPosition=0,xx,yy,x,y;
		// 	//初始化鼠标最后停留的index
		// 	var lastIndex=0;
		// 	EventUtil.addHandler(this.oCon,"mousedown",down)
		// 	function down(){
		// 		var e=event || window.event;
		// 		EventUtil.preventDefault(e);
		// 		//鼠标在画布中的位置
		// 		x=e.clientX-this.offsetLeft;
		// 		y=e.clientY-this.offsetTop;
		// 		//显示当前盒子
		// 		currentPosition=self.showBox(x,y,self.currentBox);
		// 		// console.log(currentPosition)
		// 		//清除画布
		// 		self.ctx.clearRect(self.oArr[currentPosition][0]*self.cWidth,self.oArr[currentPosition][1]*self.cHeight,self.cWidth,self.cHeight);
				
		// 		//鼠标在box中的位置
		// 		xx=x-self.currentBox.offsetLeft;
		// 		yy=y-self.currentBox.offsetTop;
		// 		EventUtil.addHandler(document,"mousemove",move);
		// 	}
			
		// 	function up(){
		// 		//先画原处
		// 		self.ctx.drawImage(self.img,self.oWidth*self.randomArr[lastIndex][0],self.oHeight*self.randomArr[lastIndex][1],self.oWidth,self.oHeight,
		// 			self.cWidth*self.oArr[currentPosition][0],self.cHeight*self.oArr[currentPosition][1],self.cWidth,self.cHeight);

		// 		self.ctx.drawImage(self.img,self.oWidth*self.randomArr[currentPosition][0],self.oHeight*self.randomArr[currentPosition][1],self.oWidth,self.oHeight,
		// 			self.cWidth*self.oArr[lastIndex][0],self.cHeight*self.oArr[lastIndex][1],self.cWidth,self.cHeight);

		// 		//隐藏盒子
		// 		self.currentBox.style.display="none";
		// 		self.willBox.style.display="none";
		// 		//更新随机数组(交换顺序)
		// 		var temp=self.randomArr[currentPosition];
		// 		self.randomArr.splice(currentPosition,1,self.randomArr[lastIndex]);
		// 		self.randomArr.splice(lastIndex,1,temp);
		// 		// console.log(self.randomArr);

		// 		//两个数组完全相等则游戏结束
		// 		if(self.gameOver()){
		// 			self.aOver.style.display="block";
		// 			//游戏结束清空数组,移除事件
		// 			EventUtil.removeHandler(self.oCon,"mousedown",down);
		// 			EventUtil.removeHandler(document,"mouseup",up);
		// 		}
	
		// 	}
		// 	//盒子移动来模拟画布的移动
		// 	function move(){
		// 		var e=event || window.event;
		// 		var xxx=e.clientX-self.oCon.offsetLeft-xx;
		// 		var yyy=e.clientY-self.oCon.offsetTop-yy;
		// 		//超界处理
		// 		xxx=xxx<0?0:xxx;
		// 		yyy=yyy<0?0:yyy;
		// 		xxx=xxx>self.cvsPhoneWidth-self.cPhoneWidth?self.cvsPhoneWidth-self.cPhoneWidth:xxx;
		// 		yyy=yyy>self.cvsPhoneHeight-self.cPhoneHeight?self.cvsPhoneHeight-self.cPhoneHeight:yyy;

		// 		self.currentBox.style.left=xxx+"px";
		// 		self.currentBox.style.top=yyy+"px";

		// 		//盒子中心点坐标
		// 		var cornerX=xxx+self.cPhoneWidth/2;
		// 		var cornerY=yyy+self.cPhoneHeight/2;
		// 		//显示需要交换的盒子
		// 		lastIndex=self.showBox(cornerX,cornerY,self.willBox);

		// 		// console.log(xx+" "+yyy)
		// 		// console.log(cornerX+" "+cornerY)
		// 	}
		// },
		//游戏结束
		gameOver: function (){
			//两个数组完全相等,且不为空则游戏结束
			var self=this;
			if(self.randomArr.join("")===self.oArr.join("")){
				return true;
			}
		}
	}
	w.DrawBg=function (cvs,ctx,oCon,currentBox,willBox,img,x,y,aOver){
		return new DrawBg(cvs,ctx,oCon,currentBox,willBox,img,x,y,aOver);
	}
	
})(window)