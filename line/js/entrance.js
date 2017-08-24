
/*
* 入口函数
* ctx : 绘制环境
* len : 矩形初始数量
* minSpeed : 矩形初始下落最小速度
* maxSpeed : 矩形初始下落最大熟读
**/
(function (w) {
	function Avoid(ctx,len,minSpeed,maxSpeed) {
		this.ctx=ctx;
		this.len=len;
		this.minSpeed=minSpeed;
		this.maxSpeed=maxSpeed;
		this.timer1=null;
		this.timer2=null;
		//设置数组存储雪花实例
		this.arr=[];
		//存储分数
		this.num=0;
		//开关，判断是否处于暂停状态
		this.onOff=false;
		this.draw();
		this.update();
	}
	Avoid.prototype={
		constructor: Avoid,
		draw: function (){
			var self=this;

			btn[1].onclick=function () {
				if(self.onOff){
					this.innerHTML="暂停";
					this.classList.remove("current");
					self.onOff=false;
					self.timerFun1();
					self.timerFun2();
				}else{
					clearInterval(self.timer1);
					clearInterval(self.timer2);
					this.innerHTML="继续";
					this.classList.add("current");
					self.onOff=true;
				}
			}
			//实例化矩形方阵
			for (var i = 0; i < this.len; i++) {
				this.arr.push(getSnow(this.ctx,this.minSpeed,this.maxSpeed));
			}
			// 每10秒增加2个矩形,每次增加的雪花最小速度和最大速度都加1
			self.timerFun2=function () {
				self.timer2=setInterval(function () {
					self.minSpeed+=1;
					self.maxSpeed+=1;
					for (var i = 0; i < 2; i++) {
						self.arr.push(getSnow(self.ctx,self.minSpeed,self.maxSpeed));
					}
				}, 10000)
			}
			self.timerFun2();
		},
		update: function (){
			var self=this;
			loadImg({
				bgc: "images/p9mUO.jpg",
				girl: "images/NPCrabbitbaby-2.png"
			},function(imgObj){
				self.ctx.drawImage(imgObj.bgc,0,0,self.ctx.canvas.width,self.ctx.canvas.height);
				//sunny实例
				var sun=getSunny(self.ctx,imgObj.girl,4,4,10);
				//雪花下落
				self.timerFun1=function () {
					self.timer1=setInterval(function () {
						self.num+=1;
						aI[0].innerHTML=self.num;
						self.ctx.save();
						//下落之前先清除画布，背景图重新覆盖
						self.ctx.clearRect(0,0,self.ctx.canvas.width,self.ctx.canvas.height);
						self.ctx.drawImage(imgObj.bgc,0,0,self.ctx.canvas.width,self.ctx.canvas.height);
						self.ctx.beginPath();
						//调用雪花实例方法，绘制雪花
						for (var i = 0; i < self.arr.length; i++) {
							self.arr[i].draw();
							self.arr[i].update();

						}
						sun.update();
						//获取小人四点坐标
						var x=sun.xx+10;
						var y=sun.yy;
						var xx=sun.xx+sun.width-10;
						var yy=sun.yy+sun.height;
						//中心点坐标
						var cornerX=(x+xx)/2;
						var cornerY=(y+yy)/2;

						//判断周身八点坐标加上中心点
						if(self.ctx.isPointInPath(x,y) || self.ctx.isPointInPath(xx,yy) || this.ctx.isPointInPath(x,yy) || this.ctx.isPointInPath(xx,y) || this.ctx.isPointInPath(cornerX,cornerY) || this.ctx.isPointInPath(cornerX,y) || this.ctx.isPointInPath(x,cornerY) || this.ctx.isPointInPath(cornerX,yy) || this.ctx.isPointInPath(xx,cornerY)){
							clearInterval(self.timer1);
							end.style.display="block";
							inner.style.display="none";
							aI[1].innerHTML=self.num;
						}
						self.ctx.restore();
					}, 100);
				}

				self.timerFun1();
			})
		}
	}
	//单例模式
	var voi=null;
	w.entrance=function (ctx,len,minSpeed,maxSpeed) {
		if(!voi){
			voi=new Avoid(ctx,len,minSpeed,maxSpeed);
		}
		return voi;
	}
}(window))