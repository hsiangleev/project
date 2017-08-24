
/*
* 创建小人
* ctx： 绘制环境
* img： 加载图片地址
* widthFrame： 图片横坐标帧数
* heightFrame： 图片纵坐标帧数
* speed： 每次移动速度
**/
(function (w) {
	function Sunny(ctx,img,widthFrame,heightFrame,speed) {
		this.ctx=ctx;
		this.img=img;
		this.widthFrame=widthFrame;
		this.heightFrame=heightFrame;
		this.speed=speed;

		this.width=this.img.width/this.widthFrame;
		this.height=this.img.height/this.heightFrame;
		//当前帧
		this.currentX=0;
		this.currentY=0;
		//图片在画布上的位置
		this.xx=(this.ctx.canvas.width+this.width)/2;
		this.yy=this.ctx.canvas.height-this.height;

		this._bind();
		
	}
	Sunny.prototype={
		constructor: Sunny,
		draw: function (){
			//图片在原图的位置
			this.x=this.currentX*this.width;
			this.y=this.currentY*this.height;

			this.ctx.drawImage(this.img,
				this.x,this.y,this.width,this.height,
				this.xx,this.yy,this.width,this.height)

			// this.ctx.rect(this.xx,this.yy,this.width,this.height);
			// this.ctx.stroke();
		},
		update: function (){
			this.currentX++;
			if(this.currentX>=this.widthFrame){
				this.currentX=0;
			}

			this.draw();
		},
		_bind: function (){
			var self=this;
			var bodyWidth= document.body.clientWidth;
			var bodyheight= document.body.clientheight;
			if(bodyWidth<768){
				this.speed+=10;
				oBtn.style.display="block";
				for(var i=3;i<7;i++){
					btn[i].onclick=function () {
						//获取自定义变量num
						move(parseInt(this.dataset["num"]));
					}
				}
			}else{
				document.addEventListener("keydown", function (e) {
					//左上右下：37 38 39 40
					var e=event || window.event;
					move(e.keyCode);
				}, false)
			}
			function move(num) {
				switch (num) {
					case 37:
						self.currentY=1;
						self.xx-=self.speed;
						if(self.xx<=0){
							self.xx=0;
						}
						break;
					case 38:
						self.currentY=3;
						self.yy-=self.speed;
						if(self.yy<=0){
							self.yy=0;
						}
						break;
					case 39:
						self.currentY=2;
						self.xx+=self.speed;
						if(self.xx>=self.ctx.canvas.width-self.width){
							self.xx=self.ctx.canvas.width-self.width;
						}
						break;
					case 40:
						self.currentY=0;
						self.yy+=self.speed;
						if(self.yy>=self.ctx.canvas.height-self.height){
							self.yy=self.ctx.canvas.height-self.height;
						}
						break;
					default:
						// statements_def
						break;
				}
			}
			
		}
	}
	//单例模式
	var sun=null;
	w.getSunny=function (ctx,img,widthFrame,heightFrame,speed){
		if(!sun){
			sun=new Sunny(ctx,img,widthFrame,heightFrame,speed);
		}
		return sun;
	}
}(window))