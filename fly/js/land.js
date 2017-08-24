
/*
* 创建大地图片模块
* ctx: 绘制环境
* img: 图片资源
* speed: 移动速度
**/
(function (w) {
	//实例个数
	Land.len=0;
	function Land(ctx,img,speed) {
		this.ctx=ctx;
		this.img=img;
		this.speed=speed;
		this.width=this.img.width;
		this.height=this.img.height;

		Land.len++;
		this.x=(Land.len-1)*this.width;
		this.y=this.ctx.canvas.height-this.height;
	}
	Land.prototype={
		constructor: Land,
		//大地绘制
		draw: function () {
			this.ctx.drawImage(this.img,
				0,0,this.width,this.height,
				this.x,this.y,this.width,this.height)
		},
		//更新每一帧
		update: function () {
			this.x-=this.speed;
			if(this.x<-this.width){
				this.x+=this.width*4;
			}
		}
	}
	//工厂模式，创建多个实例
	w.getLand=function (ctx,img,speed) {
		return new Land(ctx,img,speed);
	}
}(window))