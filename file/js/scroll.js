/*
* 在vue原型中添加c_scroll（）插件
* 
* 
* 1.可拖动小球上下移动
* 2.点击滚动条移动
* 3.滚轮滚动移动
*
* 	***************模板*********************
*   <div id="c-scroll">
		<div id="c-scrollBar">
			<div id="rollingBall"></div>
		</div>
		<div id="c-content">
			<div id="c-content-body">
				<!-- 存放内容 -->
			</div>
		</div>
	</div>
* 	***************模板*********************
* 
* 
**/
(function (vue){
	function c_scroll(){
		var box=document.getElementById("c-scroll");
		var scrollBar=document.getElementById("c-scrollBar");
		var rollingBall=document.getElementById("rollingBall");
		var content=document.getElementById("c-content");
		var contentBody=document.getElementById("c-content-body");

		var vueCon=document.querySelector(".content");

		//当前滚轮位置
		var step=0;
		//小球可移动区域距离
		var ballMaxHeight=scrollBar.offsetHeight-rollingBall.offsetHeight;
		// 内容可移动区域距离
		var contentMaxHeight=contentBody.offsetHeight-content.offsetHeight;
		//若内容高度超过父盒子的高度才可以滚动
		if(contentMaxHeight>0){
			//拖拽滚动
			EventUtil.addHandler(rollingBall,"mousedown",function (e){
				var e=event || window.event;
				//点击处距离小球顶部高度
				var y1=e.clientY-box.offsetTop-rollingBall.offsetTop;
				EventUtil.addHandler(document,"mousemove",pcScroll);
				EventUtil.addHandler(document,"mouseup",function (){
					EventUtil.removeHandler(document,"mousemove",pcScroll);
				})
				function pcScroll(){
					var e=event || window.event;
					//小球距离父盒子滚动条顶部的高度
					var y2=e.clientY-box.offsetTop-y1;
					if(y2<0){
						y2=0;
					}
					if(y2>ballMaxHeight){
						y2=ballMaxHeight;
					}
					rollingBall.style.top=y2+"px";
					//比率，距离父盒子高度/可移动区域距离
					var bite=y2/ballMaxHeight;
					var y4=bite*contentMaxHeight;
					contentBody.style.top=-1*y4+"px";

					step=y2;
					//让被选文字清除。
	                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
			})
				
			//点击滚动
			EventUtil.addHandler(scrollBar,"click",function (e){
				var e=event || window.event;
				var y1=e.clientY-box.offsetTop-vueCon.offsetTop;
				if(y1>ballMaxHeight){
					y1=ballMaxHeight;
				}
				animate(rollingBall,"top",y1);
				var bite=y1/ballMaxHeight;
				var y4=bite*contentMaxHeight;
				animate(contentBody,"top",-y4);

				step=y1;

			})

			//滚轮滚动
			EventUtil.addHandler(box,"mousewheel",function (e){
				var e=event || window.event;
				//e.wheelDelta: 每向下移动一次为-120
				step-=e.wheelDelta/5;
				if(step>ballMaxHeight){
					step=ballMaxHeight;
				}
				if(step<0){
					step=0;
				}
				animate(rollingBall,"top",step);
				var bite=step/ballMaxHeight;
				var y4=bite*contentMaxHeight;
				animate(contentBody,"top",-y4);
			})


			//手机小球拖拽滚动
			EventUtil.addHandler(rollingBall,"touchstart", function (e){
				var e=event || window.event;
				//阻止手机滚动默认行为
				EventUtil.preventDefault(e);
				//点击处距离小球顶部高度
				var y1=e.touches[0].clientY-box.offsetTop-rollingBall.offsetTop;
				
				EventUtil.addHandler(document,"touchmove",phoneTouch);

				EventUtil.addHandler(rollingBall,"touchend",function (e){
					EventUtil.removeHandler(document,"touchmove", phoneTouch)
				});
				//阻止冒泡
				EventUtil.stopPropagation(e);

				function phoneTouch(){
					var e=event || window.event;
					//小球距离父盒子滚动条顶部的高度
					var y2=e.touches[0].clientY-box.offsetTop-y1;

					if(y2<0){
						y2=0;
					}
					if(y2>ballMaxHeight){
						y2=ballMaxHeight;
					}
					rollingBall.style.top=y2+"px";
					//比率，距离父盒子高度/可移动区域距离
					var bite=y2/ballMaxHeight;
					var y4=bite*contentMaxHeight;
					contentBody.style.top=-1*y4+"px";


					step=y2;
					//让被选文字清除。
		            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
			});

			//手机手势滚动
			EventUtil.addHandler(box,"touchstart", function (e){
				var e=event || window.event;
				var y1=e.touches[0].pageY;
				//阻止手机滚动默认行为
				EventUtil.preventDefault(e);
				EventUtil.addHandler(document,"touchmove",phoneTouch);

				EventUtil.addHandler(box,"touchend",function (e){
					EventUtil.removeHandler(document,"touchmove", phoneTouch)
				});

				function phoneTouch(){
					var e=event || window.event;
					var y2=e.touches[0].pageY;
					//y2-y1: 滚动的距离
					//speed: 减慢速度
					var speed=(y2-y1)/10;
					//currentHeight: contentBody当前距离父盒子高度
					var currentHeight=contentBody.offsetTop;
					var y3=currentHeight+speed;
					if(y3<-contentMaxHeight){
						y3=-contentMaxHeight;
					}
					if(y3>0){
						y3=0;
					}
					contentBody.style.top=y3+"px";
					//比率，距离父盒子高度/可移动区域距离
					var bite=y3/contentMaxHeight;
					var y4=bite*ballMaxHeight;
					rollingBall.style.top=-1*y4+"px";

					step=y2;
					//让被选文字清除。
		            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
			});

		}
	}	
	//单属性缓动动画
	function animate(ele,attr,target){
		clearInterval(ele.timer);

		ele.timer=setInterval(function(){
			var leader=parseInt(getStyle(ele,attr))||0;
			var step=(target-leader)/10;
			step=step>0?Math.ceil(step):Math.floor(step);
			leader=leader+step;
			ele.style[attr]=leader+"px";

			if(Math.abs(target-leader)<=Math.abs(step)){
				ele.style[attr]=target+"px";
				clearInterval(ele.timer);
			}
		},30);
	}
	//兼容方法获取元素样式
    function getStyle(ele,attr){
        if(window.getComputedStyle){
            return window.getComputedStyle(ele,null)[attr];
        }
        return ele.currentStyle[attr];
    }

    //兼容性事件
    var EventUtil={
		addHandler: function (ele,type,handler) {
			if(ele.addEventListener){
				ele.addEventListener(type,handler,false);
			}else if(ele.attachEvent){
				ele.attachEvent("on"+type,handler);
			}else{
				ele["on"+type]=handler;
			}
		},
		getEvent:function (event) {
			return event ? event : window.event;
		},
		getTarget:function (event) {
			return event.target || event.srcElement;
		},
		preventDefault:function (event) {
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue=false;
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
		},
		//阻止冒泡
		stopPropagation:function (event) {
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelable=true;
			}
		}
	}

	vue.prototype.c_scroll=function (){
		return c_scroll();
	};
})(Vue)
