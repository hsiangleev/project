
(function (w){
	var myAlert=document.getElementById("c-myAlert");
	var oContent=document.getElementById("c-myAlert-content");
	var oTitle=document.getElementById("c-title");
	var oClose=document.getElementById("c-close");
	var aSpan=oContent.getElementsByTagName("span");

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
	//点击关闭隐藏弹出窗
	EventUtil.addHandler(oClose,"click",function (){
		myAlert.style.display="none";
	});
	//鼠标在title中拖拽
	EventUtil.addHandler(oTitle,"mousedown",function (e){
		var e=window.event || event;
		//获取鼠标在oContent中的坐标
		var x=e.clientX-oContent.offsetLeft;
		var y=e.clientY-oContent.offsetTop;
		EventUtil.addHandler(document,"mousemove",move);

		EventUtil.addHandler(document,"mouseup",function (){
			EventUtil.removeHandler(document,"mousemove",move);
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
	lineDrag(aSpan[0],true,false,false,false);
	lineDrag(aSpan[1],false,true,false,false);
	lineDrag(aSpan[2],false,false,true,false);
	lineDrag(aSpan[3],false,false,false,true);

	lineDrag(aSpan[4],true,false,false,true);
	lineDrag(aSpan[5],true,true,false,false);
	lineDrag(aSpan[6],false,true,true,false);
	lineDrag(aSpan[7],false,false,true,true);
	/*
	* 八个方向实现拖拽：
	* lineDrag(ele,isTop,isRight,isBottom,isLeft)
	* ele : 当前节点
	* isTop : 是否是上方节点
	* isRight : 是否是右方节点
	* isBottom : 是否是下方节点
	* isLeft : 是否是左方节点
	**/
	function lineDrag(ele,isTop,isRight,isBottom,isLeft){
		EventUtil.addHandler(ele,"mousedown",function (e){
			var e=window.event || event;
			//上一次高度
			var x=e.clientX;
			var y=e.clientY;
			EventUtil.addHandler(document,"mousemove",move);
			
			EventUtil.addHandler(document,"mouseup",function (){
				EventUtil.removeHandler(document,"mousemove",move);
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
	}

})(window)