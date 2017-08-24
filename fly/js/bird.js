
/*
* 创建小鸟模块
* ctx: 绘制环境
* img: 图片资源
* widthFrame: 横坐标帧数
* heightFrame: 纵坐标帧数
* DownSpeed: 小鸟下落速度
* speedPlus: 小鸟下落加速度
* UpSpeed: 点击画布,小鸟上升初始速度(负值)
**/
(function (w) {
	function Bird(ctx,img,widthFrame,heightFrame,DownSpeed,speedPlus,UpSpeed) {
		this.ctx=ctx;
		this.img=img;
		this.widthFrame=widthFrame;
		this.heightFrame=heightFrame;
		this.DownSpeed=DownSpeed || 1;
		this.speedPlus=speedPlus || 0.05;
		this.UpSpeed=UpSpeed || -2;

		//小鸟当前帧
		this.currentFrame=0;
		//小鸟所在坐标
		this.x=10;
		this.y=10;
		//小的宽高
		this.width=this.img.width/this.widthFrame;
		this.height=this.img.height/this.heightFrame;

		this._bind();
	}
	Bird.prototype={
		constructor: Bird,
		//绘制小鸟
		draw: function () {
			//下落的角度
			var radius=Math.PI/180*this.DownSpeed*8;
			//保存当前绘图环境
			this.ctx.save();

			this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
			this.ctx.rotate(radius);
			this.ctx.drawImage(this.img,
				this.currentFrame*this.width,0,this.width,this.height,
				-this.width / 2, -this.height / 2,this.width,this.height)

			//恢复绘图环境
			this.ctx.restore();
		},
		// 更新每一帧
		update: function () {
			this.currentFrame++;
			if(this.currentFrame>=this.widthFrame){
				this.currentFrame=0;
			}
			
			this.y+=this.DownSpeed;
			this.DownSpeed+=this.speedPlus;
			

		},
		//点击画布，小鸟初始速度朝上
		_bind: function () {
			var self=this;
			this.ctx.canvas.addEventListener("click", function () {
				self.DownSpeed=self.UpSpeed;
			}, false)
		}
	}

	var bird=null;
	//工厂模式
	w.getBird=function (ctx,img,widthFrame,heightFrame,DownSpeed,speedPlus,UpSpeed) {
		//单例模式
		if(!bird){
			bird=new Bird(ctx,img,widthFrame,heightFrame,DownSpeed,speedPlus,UpSpeed);
		}
		return bird;
		
	}
}(window))