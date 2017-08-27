
/**
* 直接在下方loadImg对象中添加图片
* 格式: (bg10: "images/timg10.jpg")
*/
(function (w){
	var cvs=document.querySelector("#cvs");
	var ctx=cvs.getContext("2d");
	var oBg=document.querySelector(".bg")
	var oCon=document.querySelector(".content")
	var oCurPoint=oCon.querySelector(".currentCheckpoint")
	var currentBox=document.querySelector(".currentBox")
	var willBox=document.querySelector(".willBox")
	var oBegin=document.querySelector(".begin")
	var aOver=document.querySelector(".over")
	//当前难度
	var oCurrent=document.querySelector(".current")
	var oH2=aOver.querySelector("h2")
	var aBtn=document.querySelectorAll(".button")
	var aI=document.querySelectorAll("i")
	var aSpan=oCurPoint.querySelectorAll("span")
	//初始关卡
	var checkPoint=1;
	//当前画布可视区宽高
	var screenWidth=cvs.offsetWidth;
	var screenHeight=cvs.offsetHeight;
	//初始化关卡难度系数 ( difficultX * difficultY )
	var difficultX=2;
	var difficultY=3;
	//选择关卡
	var oSel=document.querySelector(".select");
	var oInp=oSel.querySelector("input");
	var oSelSpan=oSel.querySelector("span");
	loadImg({
		bg1: "images/timg1.jpg",
		bg2: "images/timg2.jpg",
		bg3: "images/timg3.jpg",
		bg4: "images/timg4.jpg",
		bg5: "images/timg5.jpg",
		bg6: "images/timg6.jpg",
		bg7: "images/timg7.jpg",
		bg8: "images/timg8.jpg",
		bg9: "images/timg9.jpg",
		bg10: "images/timg10.jpg"
	},function (imgObj){

		function Entrance(){
			//便于计算背景图数量
			this.loadImgKey=[];

			this._saveKey();
			this._difficult();
			this.selectNum();
			this._star();
			this._next();
		}
		Entrance.prototype={
			constructor: Entrance,
			_init: function (){
				// 初始化背景提示图
				oBg.style.background="url("+imgObj["bg"+checkPoint].src+") no-repeat";
				//小屏则充满屏幕
				if(screenWidth<=768){
					oBg.style.backgroundSize=screenWidth+"px "+screenHeight+"px";
				}else{
					oBg.style.backgroundSize="800px 600px";
				}
				
			},
			_saveKey: function (){
				//存储背景图的key
				for(var k in imgObj){
					this.loadImgKey.push(k);
				}
			},
			_difficult: function (){
				//选择难度
				for (var i = 0,len=aI.length; i < len; i++) {
					aI[i].index=i;
					EventUtil.addHandler(aI[i],"click",function (){
						for (var j = 0,len=aI.length; j < len; j++) {
							aI[j].className="";
						}
						this.className="current";
						if(this.index==0){
							difficultX=2;
							difficultY=3;
						}else if(this.index==1){
							difficultX=4;
							difficultY=3;
						}else if(this.index==2){
							difficultX=4;
							difficultY=6;
						}else if(this.index==3){
							difficultX=8;
							difficultY=6;
						}else{
							difficultX=10;
							difficultY=10;
						}
					})
				}
			},
			//选择关卡
			selectNum: function (){
				var self=this;
				oSelSpan.innerHTML=this.loadImgKey.length;
				EventUtil.addHandler(oInp,"blur",function (){
					//先转换为整数字(非数字转为NaN)
					var val=parseInt(this.value);
					this.value=val;
					if(val>self.loadImgKey.length){
						alert("最大关卡为: "+self.loadImgKey.length)
						this.value=self.loadImgKey.length;
					}
					if(val<1){
						alert("最小关卡为: 1")
						this.value=1;
					}
					if(isNaN(val)){
						alert("请输入数字");
						this.value=1;
					}
					checkPoint=val;
				})
			},
			_star: function (){
				var self=this;
				//开始游戏
				EventUtil.addHandler(aBtn[0],"click",function (){
					//重新获取当前难度节点
					oCurrent=document.querySelector(".current")
					oBegin.style.display="none";
					oCurPoint.style.display="block";
					aSpan[0].innerHTML=checkPoint;
					aSpan[1].innerHTML=oCurrent.innerHTML;
					self._init();
					//先判断是否是最后一关
					if(checkPoint==self.loadImgKey.length){
						oH2.innerHTML="哇哦，好腻害，您竟然完成了所有关卡!!!";
						this.value="返回";
					}
					//先设置第一关
					DrawBg(cvs,ctx,oCon,currentBox,willBox,imgObj["bg"+checkPoint],difficultX,difficultY,aOver);
				})
			},
			_next: function (){
				var self=this;
				EventUtil.addHandler(aBtn[1],"click",function (e){
					//关卡数自增
					checkPoint++;
					aSpan[0].innerHTML=checkPoint;
					//判断是否完成所有关卡
					if(checkPoint<=self.loadImgKey.length){
						self._init();
						aOver.style.display="none";
						DrawBg(cvs,ctx,oCon,currentBox,willBox,imgObj["bg"+checkPoint],difficultX,difficultY,aOver);
						//如果当前关卡为最后一关，则修改显示内容
						if(checkPoint==self.loadImgKey.length){
							oH2.innerHTML="哇哦，好腻害，您竟然完成了所有关卡!!!";
							this.value="返回";
						}
					}else{
						//完成所有关卡后返回
						history.go(0);
					}

				})
			}
		}
				
		new Entrance();	
		
	})
	
	
})(window)