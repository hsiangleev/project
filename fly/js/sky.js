
/*
* 创建天空图片模块
* ctx: 绘制环境
* img: 图片
* speed: 图片移动速度
*/
(function (w) {
	//实例个数
	Sky.len=0;
	function Sky(ctx,img,speed) {
		this.ctx=ctx;
		this.img=img;
		this.speed=speed;
		this.width=this.img.width;
		this.height=this.img.height;
		//每创建一个实例，长度自增
		Sky.len++;
		//当前实例的x坐标
		this.x=(Sky.len-1)*this.width;
		this.y=0;
	}
	Sky.prototype={
		constructor: Sky,
		//绘制图片
		draw: function () {
			this.ctx.drawImage(this.img,this.x,this.y);
		},
		//更新每一帧
		update: function () {
			this.x-=this.speed;
			if(this.x<-1*this.width){
				this.x+=this.width*2;
			}
		}
	}

	//工厂模式，实例接口
	w.getSky=function (ctx,img,speed) {
		return new Sky(ctx,img,speed);
	}
}(window))