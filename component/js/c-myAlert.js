
/**
* 调用: MyAlert()
* html模板: 
<div id="c-myAlert">
	<div id="c-myAlert-content">
		<div id="c-title">
			<div id="c-close" title="关闭">✘</div>
			<div id="c-text">
				存放标题
			</div>
		</div>
		<div id="c-content">
			主体
		</div>
		<div id="c-modify">确认</div>
	</div>
</div>
*
*/
(function (w){
	var myAlert=document.getElementById("c-myAlert");
	var oContent=document.getElementById("c-myAlert-content");
	var oTitle=document.getElementById("c-title");
	var oClose=document.getElementById("c-close");
	var aSpan=oContent.getElementsByTagName("span");

	function MyAlert(){
		
		this.addSpanNode();
		this.close();
		this.titleDrag();
		this.runLineDrag();
	}
	MyAlert.prototype={
		constructor: MyAlert,
		addSpanNode: function (){
			var str='<span id="c-top"></span>'+
				'<span id="c-right"></span>'+
				'<span id="c-bottom"></span>'+
				'<span id="c-left"></span>'+
				'<span id="c-tl"></span>'+
				'<span id="c-tr"></span>'+
				'<span id="c-br">'+
					'<i></i>'+
					'<i></i>'+
					'<i></i>'+
				'</span>'+
				'<span id="c-bl"></span>';
			oContent.innerHTML+=str;
			//重新获取dom节点
			oTitle=document.getElementById("c-title");
			oClose=document.getElementById("c-close");
			aSpan=oContent.getElementsByTagName("span");
		},
		//点击关闭隐藏弹出窗
		close: function (){
			this.addHandler(oClose,"click",function (){
				myAlert.style.display="none";
			});
		},
		//鼠标在title中拖拽
		titleDrag: function (){
			var self=this;
			this.addHandler(oTitle,"mousedown",function (e){
				var e=window.event || event;
				//获取鼠标在oContent中的坐标
				var x=e.clientX-oContent.offsetLeft;
				var y=e.clientY-oContent.offsetTop;
				self.addHandler(document,"mousemove",move);

				self.addHandler(document,"mouseup",function (){
					self.removeHandler(document,"mousemove",move);
				})
				function move(){
					var e=window.event || event;
					//oContent距离左侧和上方的距离
					var xx=e.clientX-x;
					var yy=e.clientY-y;
					//盒子可移动的最大距离
					var oContentMaxLeft=document.body.clientWidth-oContent.offsetWidth-4;
					var oContentMaxTop=document.body.clientHeight-oContent.offsetHeight-4;
					//超界处理
					xx=(xx < 0) ? 0 : xx;
					yy=(yy < 0) ? 0 : yy;
					xx=xx>oContentMaxLeft ? oContentMaxLeft : xx;
					yy=yy>oContentMaxTop ? oContentMaxTop : yy;
					oContent.style.left=xx+"px";
					oContent.style.top=yy+"px";

					//让被选文字清除。
		            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
					
			});
		},
		/*
		* 八个方向实现拖拽：
		* lineDrag(ele,isTop,isRight,isBottom,isLeft)
		* ele : 当前节点
		* isTop : 是否是上方节点
		* isRight : 是否是右方节点
		* isBottom : 是否是下方节点
		* isLeft : 是否是左方节点
		**/
		lineDrag: function (ele,isTop,isRight,isBottom,isLeft){
			var self=this;
			this.addHandler(ele,"mousedown",function (e){
				var e=window.event || event;
				//上一次高度
				var x=e.clientX;
				var y=e.clientY;
				self.addHandler(document,"mousemove",move);
				
				self.addHandler(document,"mouseup",function (){
					self.removeHandler(document,"mousemove",move);
				})
				function move(){
					var e=window.event || event;
					var xx=e.clientX;
					var yy=e.clientY;
					//当前top
					var currentLeft=oContent.offsetLeft;
					var currentTop=oContent.offsetTop;
					//左上边界处理
					currentLeft = currentLeft > 0 ? currentLeft : 0;
					currentTop = currentTop > 0 ? currentTop : 0;
					//当前高度
					var currentWidth=oContent.offsetWidth;
					var currentHeight=oContent.offsetHeight;
					//最大宽高
					var currentMaxWidth=document.body.clientWidth-currentLeft-8;
					var currentMaxHeight=document.body.clientHeight-currentTop-8;
					//右下边界处理
					currentWidth=currentWidth>=currentMaxWidth ? currentMaxWidth : currentWidth;
					currentHeight=currentHeight>=currentMaxHeight ? currentMaxHeight : currentHeight;
					//增加的高度
					var addWidth=xx-x;
					var addHeight=yy-y;
					if(isBottom){
						oContent.style.height=currentHeight+addHeight+"px";
					}
					if(isRight){
						oContent.style.width=currentWidth+addWidth+"px";
					}
					if(isTop){
						oContent.style.height=currentHeight-addHeight+"px";
						if(parseInt(oContent.style.height)>180){
							oContent.style.top=currentTop+addHeight+"px";
						}
					}
					if(isLeft){
						oContent.style.width=currentWidth-addWidth+"px";
						if(parseInt(oContent.style.width)>320){
							oContent.style.left=currentLeft+addWidth+"px";
						}
					}
					//当前位置赋值给上一次
					x=xx;
					y=yy;
					//让被选文字清除。
		            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
					
			})
		},
		runLineDrag: function (){
			this.lineDrag(aSpan[0],true,false,false,false);
			this.lineDrag(aSpan[1],false,true,false,false);
			this.lineDrag(aSpan[2],false,false,true,false);
			this.lineDrag(aSpan[3],false,false,false,true);

			this.lineDrag(aSpan[4],true,false,false,true);
			this.lineDrag(aSpan[5],true,true,false,false);
			this.lineDrag(aSpan[6],false,true,true,false);
			this.lineDrag(aSpan[7],false,false,true,true);
		},
		addHandler: function (ele,type,handler) {
			if(ele.addEventListener){
				ele.addEventListener(type,handler,false);
			}else if(ele.attachEvent){
				ele.attachEvent("on"+type,handler);
			}else{
				ele["on"+type]=handler;
			}
		},
		removeHandler:function (ele,type,handler) {
			if(ele.removeEventListener){
				ele.removeEventListener(type,handler,false);
			}else if(ele.detachEvent){
				ele.detachEvent("on"+type,handler);
			}
			else{
				ele["on"+type]=null;
			}
		}
	}
	w.MyAlert=function (){
		return new MyAlert();
	}
})(window)