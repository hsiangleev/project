
/*
* 创建矩形方阵
* ctx : 绘制环境
* minSpeed : 初始最小下落速度
* maxSpeed : 初始最大下落速度
**/
(function (w) {
	//创建雪花
	function Snowflake(ctx,minSpeed,maxSpeed) {
		 this.ctx=ctx;
		 this.minSpeed=minSpeed;
		 this.maxSpeed=maxSpeed;
		 this.speed=1;
		 this.x=0;
		 this.y=0;
		 this.widthLen=0;

		 this._init();
	}
	Snowflake.prototype={
		constructor: Snowflake,
		draw: function () {
			

			this.ctx.fillStyle="#fff";
			this.ctx.strokeStyle="#f00";
			this.ctx.rect(this.x,this.y,this.widthLen,this.widthLen);
			// this.ctx.fill();


			this.ctx.stroke();

		},
		_init: function () {
			// 随机长度
			var randomNum2=Math.random()*25+15;
			// 随机x坐标
			var randomNum1=Math.random()*this.ctx.canvas.width-randomNum2;

			var k=this.maxSpeed-this.minSpeed;
			var randomSpeed=Math.random()*k+this.minSpeed;
			this.speed=randomSpeed;
			this.x=randomNum1;
			this.widthLen=randomNum2;
		},
		update: function () {
			this.y+=this.speed;
			if(this.y>this.ctx.canvas.height){
				this.y=0;
				this._init();
			}
		}
	}
	w.getSnow=function (ctx,minSpeed,maxSpeed) {
		return new Snowflake(ctx,minSpeed,maxSpeed);
	}
}(window))