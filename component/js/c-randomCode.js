
/**
* html模板: 
*	<div id="c-code">
*		<canvas id="c-cvs"></canvas>
*	</div>
*
* 使用: 
* 1. 引用js文件
* 1. 在模板父层添加一个盒子，宽高必须，验证码宽高与之相等
* 2. 每调用一次drawBg()，刷新一次
* 3. drawBg().textArr 得到当前的文本内容存为数组
*/

(function (w){
	var oCode=document.getElementById("c-code");
	var cvs=document.getElementById("c-cvs");
	var ctx=cvs.getContext("2d");
	oCode.style.width="100%";
	oCode.style.height="100%";
	
	function drawBg(){
		this.width=oCode.offsetWidth;
		this.height=oCode.offsetHeight;
		this.color="#";
		this.randomX=0;
		this.randomY=0;
		//存放数据
		this.textArr=[];

		this._init();
		this.randomColor();
		this.draw();
		this.randomPoint();
		this.addPoint();
		this.addText();
	}
	drawBg.prototype={
		constructor: drawBg,
		_init: function (){
			cvs.width=this.width;
			cvs.height=this.height;
		},
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
		draw: function (){
			//每次创建先清除画布
			ctx.clearRect(0,0,this.width,this.height);
			ctx.fillStyle=this.color;
			ctx.fillRect(0,0,this.width,this.height);
		},
		randomPoint: function (){
			this.randomX=Math.random()*this.width;
			this.randomY=Math.random()*this.height;
			ctx.fillStyle=this.randomColor();
			ctx.fillRect(this.randomX,this.randomY,2,2);
			ctx.fill();
		},
		addPoint: function (){
			//生成的点的个数等于(宽*高/10)
			var num=Math.floor(this.width*this.height/10);
			for (var i = 0; i < num; i++) {
				this.randomPoint();
			}
		},
		addText: function (){
			// 0-61随机数
			var randomNum;
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
			
			var text="";
			for(var i=0;i<4;i++){
				randomNum=Math.floor(Math.random()*62);
				text+=textData[randomNum];
				this.textArr.push(textData[randomNum]);
			}
			ctx.font="bold 25px Arial";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillStyle=this.randomColor;
			ctx.fillText(text,this.width/2,this.height/2);
		}
	}

	w.drawBg=function (){
		return new drawBg();
	}
})(window)