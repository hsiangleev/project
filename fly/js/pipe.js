
/*
* 绘制管道
* ctx: 绘制环境
* imgUp: 上管道图片
* imgDown: 下管道图片
* speed: 移动速度
* space: 两管道之间空隙
**/
(function (w) {
	Pipe.len=0;
	function Pipe(ctx,imgUp,imgDown,landHeight,speed,space) {
		 this.ctx=ctx;
		 this.imgUp=imgUp;
		 this.imgDown=imgDown;
		 this.landHeight=landHeight;
		 this.speed=speed;
		 this.space=space;
		 Pipe.len++;

		 this.width=this.imgUp.width;
		 this.height=this.imgUp.height;
		 this.x=300+(Pipe.len-1)*this.width*4;

		 this._init();
	}
	Pipe.prototype={
		constructor: Pipe,
		_init: function () {
			var minHeight=100;
			var maxHeight=this.ctx.canvas.height-this.landHeight-this.space-minHeight*2;
			this.randomHeight=Math.random()*maxHeight+minHeight
		},
		draw: function () {
			this.ctx.drawImage(this.imgUp,
				0,0,this.width,this.height,
				this.x,this.randomHeight-this.height,this.width,this.height)

			this.ctx.drawImage(this.imgDown,
				0,0,this.width,this.height,
				this.x,this.randomHeight+this.space,this.width,this.height)

			//绘制路径
			this.ctx.rect(this.x,this.randomHeight-this.height,this.width,this.height);
			this.ctx.rect(this.x,this.randomHeight+this.space,this.width,this.height);
		},
		update: function() {
			this.x-=this.speed;
			if(this.x<-this.width){
				this.x+=this.width*16;
				this._init();
			}
		}
	}

	w.getPipe=function (ctx,imgUp,imgDown,landHeight,speed,space) {
		return new Pipe(ctx,imgUp,imgDown,landHeight,speed,space);
	}
}(window))