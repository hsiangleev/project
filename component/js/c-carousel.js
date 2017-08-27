
/**
* 说明：
* 需要在模板外添加父盒子，轮播图宽高与父盒子相等
* 引入文件后调用函数: Carousel();
* ie8报错；ie9兼容性不高
* 
* html模板:
<div id="c-carousel">
	<ul id="c-imgContent">
		<li><a href="javascript:;"><img src="" alt=""></a></li>
		<li><a href="javascript:;"><img src="" alt=""></a></li>
		<li><a href="javascript:;"><img src="" alt=""></a></li>
		<li><a href="javascript:;"><img src="" alt=""></a></li>
		<li><a href="javascript:;"><img src="" alt=""></a></li>
	</ul>
	<ul id="c-iconContent">
		<li class="active"></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
	<div id="c-left">&lt;</div>
	<div id="c-right">&gt;</div>
</div>
*/
(function (w){
	var oCarousel=document.getElementById("c-carousel");
	var ImgContent=document.getElementById("c-imgContent");
	var imgLi=ImgContent.getElementsByTagName("li");
	var IconContent=document.getElementById("c-iconContent");
	var iconLi=IconContent.getElementsByTagName("li");
	var oLeft=document.getElementById("c-left");
	var oRight=document.getElementById("c-right");

	function Carousel(){
		this.oldIndex=0;
		this.lrIndex=0;
		this.oWidth=oCarousel.offsetWidth;
		this.oHeight=oCarousel.offsetHeight;
		this.timer=null;
		this.imgLiWidth=0;


		this.cloneFirst();
		this._init();
		this.addActive();
		this.clickLeft();
		this.clickRight();
	}
	Carousel.prototype={
		constructor: Carousel,
		//复制第一张图添加到最后
		cloneFirst: function (){
			var cloneFirstLi=imgLi[0].cloneNode(true);
			ImgContent.appendChild(cloneFirstLi);
			//重新获取li
			imgLi=ImgContent.getElementsByTagName("li");
		},
		_init: function (){
			//初始化ul长度和li长度
			ImgContent.style.width=(imgLi.length)*this.oWidth+this.oWidth/10+"px";
			for (var j = 0,len=imgLi.length; j < len; j++) {
				imgLi[j].style.width=ImgContent.offsetWidth/imgLi.length+"px";
			}
			oLeft.style.lineHeight = this.oHeight+"px";
			oRight.style.lineHeight = this.oHeight+"px";
			//每个li长度
			this.imgLiWidth=imgLi[0].offsetWidth;
		},
		//点击下方小按钮添加样式
		addActive: function (){
			var self=this;
			for (var i = 0,len=iconLi.length; i < len; i++) {
				iconLi[i].index=i;
				this.addHandler(iconLi[i],"click",function (){
					this.className="active";
					//取消上一次的样式(点击的不是同一个)
					if(self.oldIndex!=this.index){
						iconLi[self.oldIndex].className="";
						self.oldIndex=this.index;
						self.lrIndex=this.index;
					}
						
					//执行动画
					self.animate(ImgContent,"left",-1*self.imgLiWidth*this.index);
				})
			}
		},
		// 点击左侧
		clickLeft: function (){
			var self=this;
			this.addHandler(oLeft,"click",function (){
				self.lrIndex--;
				if(self.lrIndex<0){
					self.lrIndex=imgLi.length-2;
					ImgContent.style.left=-1*self.imgLiWidth*(self.lrIndex+1)+"px";
				}
				self.animate(ImgContent,"left",-1*self.imgLiWidth*self.lrIndex);
				//下面的样式跟随移动
				if(self.lrIndex==-1){
					iconLi[imgLi.length-2].className="active";
					iconLi[self.oldIndex].className="";
					self.oldIndex= imgLi.length-2;
				}else{
					iconLi[self.lrIndex].className="active";
					iconLi[self.oldIndex].className="";
					self.oldIndex= self.lrIndex;
				}
			})
		},
		clickRight: function (){
			var self=this;
			//点击右移
			this.addHandler(oRight,"click",rightMove);
			//定时器右移
			self.timer=setInterval(rightMove, 2000);
			this.addHandler(oCarousel,"mouseenter",function (){
				clearInterval(self.timer);
			});
			this.addHandler(oCarousel,"mouseleave",function (){
				self.timer=setInterval(rightMove, 2000);
			});
			function rightMove(){
				self.lrIndex++;
				if(self.lrIndex>=imgLi.length){
					self.lrIndex=1;
					ImgContent.style.left="0px";
				}
				self.animate(ImgContent,"left",-1*self.imgLiWidth*self.lrIndex);
				//下面的样式跟随移动
				if(self.lrIndex==imgLi.length-1){
					iconLi[0].className="active";
					iconLi[self.oldIndex].className="";
					self.oldIndex= 0;
				}else{
					iconLi[self.lrIndex].className="active";
					iconLi[self.oldIndex].className="";
					self.oldIndex= self.lrIndex;
				}
			}
		},
		// 自定义事件
		addHandler: function (ele,type,handler){
			if(ele.addEventListener){
				ele.addEventListener(type,handler,false);
			}else if(ele.attachEvent){
				ele.attachEvent("on"+type,handler);
			}else{
				ele["on"+type]=handler;
			}
		},
		//单属性缓动动画
		animate: function (ele,attr,target){
			var self=this
			clearInterval(ele.timer);
			ele.timer=setInterval(function(){
				var leader=parseInt(self.getStyle(ele,attr))||0;
				var step=(target-leader)/10;
				step=step>0?Math.ceil(step):Math.floor(step);
				leader=leader+step;
				ele.style[attr]=leader+"px";

				if(Math.abs(target-leader)<=Math.abs(step)){
					ele.style[attr]=target+"px";
					clearInterval(ele.timer);
				}
			},30);
		},
		//兼容方法获取元素样式
		getStyle: function (ele,attr){
			if(window.getComputedStyle){
                return window.getComputedStyle(ele,null)[attr];
            }
            return ele.currentStyle[attr];
		}
	}
	//单例模式
	var onlyCarousel=null;
	w.Carousel=function (){
		if(!onlyCarousel){
			onlyCarousel=new Carousel();
		}
		return onlyCarousel;
	}
	
})(window)