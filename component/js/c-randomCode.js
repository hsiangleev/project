
/**
* html模板: 
*	<div class="c-code">
*		<canvas id="c-cvs"></canvas>
*	</div>
*
* 使用: 
* 1. 引用js文件
* 2. 在模板之外添加一个盒子，宽高必须给，验证码宽高与之相等
* 3. 每调用一次drawBg()，刷新一次
* 4. drawBg().textArr 得到当前的文本内容存为数组
* 5. drawBg().text 得到当前的文本内容存为字符串
*/

(function (w){
	var oCode=document.getElementsByClassName("c-code")[0];
	var cvs=document.getElementById("c-cvs");
	var ctx=cvs.getContext("2d");
	//设置整个内容宽高与父盒子相等
	oCode.style.width="100%";
	oCode.style.height="100%";
	
	function drawBg(){
		//获取盒子宽高
		this.width=oCode.offsetWidth;
		this.height=oCode.offsetHeight;
		//随机点坐标
		this.randomX=0;
		this.randomY=0;
		//存放验证码内容(数组)
		this.textArr=[];
		//存放验证码内容(字符串)
		this.text="";

		this._init();
		this.draw();
		this.addPoint();
		this.addText();
	}
	drawBg.prototype={
		constructor: drawBg,
		//设置画布宽高
		_init: function (){
			cvs.width=this.width;
			cvs.height=this.height;
		},
		//获取随机的颜色
		randomColor: function (){
			var colorStr="0123456789abcdef";
			var colorArr=colorStr.split("");
			this.color="#";
			//0-15随机数
			var randomNum;
			for (var i = 0; i < 6; i++) {
				randomNum=Math.floor(Math.random()*16)
				this.color+=colorArr[randomNum]
			}
			return this.color;
		},
		//绘制背景
		draw: function (){
			//每次创建先清除画布
			ctx.clearRect(0,0,this.width,this.height);
			ctx.fillStyle=this.randomColor();
			ctx.fillRect(0,0,this.width,this.height);
		},
		//绘制随机点
		randomPoint: function (){
			this.randomX=Math.random()*this.width;
			this.randomY=Math.random()*this.height;
			ctx.fillStyle=this.randomColor();
			ctx.fillRect(this.randomX,this.randomY,2,2);
			ctx.fill();
		},
		//添加多个随机点
		addPoint: function (){
			//生成的点的个数等于(宽*高/10)
			var num=Math.floor(this.width*this.height/10);
			for (var i = 0; i < num; i++) {
				this.randomPoint();
			}
		},
		//添加文本
		addText: function (){
			// 0-61随机数
			var randomNum;
			//textData: (0-9 a-z A-Z)
			var textData=[];
			for(var i=48;i<58;i++){
				textData.push(String.fromCharCode(i));
			}
			for(var i=65;i<91;i++){
				textData.push(String.fromCharCode(i));
			}
			for(var i=97;i<123;i++){
				textData.push(String.fromCharCode(i));
			}
			
			this.text="";
			this.textArr=[];
			for(var i=0;i<4;i++){
				randomNum=Math.floor(Math.random()*62);
				this.text+=textData[randomNum];
				this.textArr.push(textData[randomNum]);
			}
			//绘制文本
			ctx.font="bold 25px Arial";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillStyle=this.randomColor;
			ctx.fillText(this.text,this.width/2,this.height/2);
		}
	}

	w.drawBg=function (){
		return new drawBg();
	}
})(window)