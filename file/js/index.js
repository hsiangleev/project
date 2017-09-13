
/**
* 作品展示块
*
*/
var temWorks={
	template: "#works",
	data: function (){
		return {
			liArr: [
				{
					text: "游戏",
					hasCurrent: true
				},
				{
					text: "组件",
					hasCurrent: false
				},
				{
					text: "boot",
					hasCurrent: false
				},
				{
					text: "小项目",
					hasCurrent: false
				},
			],
			oldIndex: 0,
			imgArr: {
				isShow: [true,false,false,false],
				gameArr: [
					{
						text: "飞翔的小鸟",
						url: "http://hsianglee.top/game/fly/",
						imgUrl: "file/images/1-fly.png"
					},
					{
						text: "矩形躲避",
						url: "http://hsianglee.top/game/line/",
						imgUrl: "file/images/1-line.png"
					},
					{
						text: "简易贪吃蛇",
						url: "http://hsianglee.top/game/snake/",
						imgUrl: "file/images/1-snake.png"
					},
					{
						text: "js图片拼图",
						url: "http://hsianglee.top/game/puzzle/",
						imgUrl: "file/images/1-puzzle.png"
					},
					{
						text: "vue小拼图",
						url: "http://hsianglee.top/vue/puzzleVue.html",
						imgUrl: "file/images/1-puzzleVue.png"
					},
				],
				compArr: [
					{
						text: "弹出层",
						url: "http://hsianglee.top/component/alert.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "加载动画",
						url: "http://hsianglee.top/component/load.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "导航条",
						url: "http://hsianglee.top/component/nav.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "滚动条",
						url: "http://hsianglee.top/component/scroll.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "轮播图",
						url: "http://hsianglee.top/component/carousel.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "验证码",
						url: "http://hsianglee.top/component/randomCode.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "验证码",
						url: "http://hsianglee.top/component/randomCode.html",
						imgUrl: "file/images/none.png"
					},
				],
				bootArr: [
					{
						text: "WordPress",
						url: "http://hsianglee.top/bootstrap/wp/",
						imgUrl: "file/images/none.png"
					},
					{
						text: "ghost",
						url: "http://hsianglee.top/bootstrap/ghost/",
						imgUrl: "file/images/none.png"
					},
					{
						text: "xfc",
						url: "http://hsianglee.top/bootstrap/xfc/",
						imgUrl: "file/images/none.png"
					},
				],
				projArr: [
					{
						text: "嘿嘿嘿嘿"
					},
					{
						text: "嘿嘿嘿嘿"
					},
					{
						text: "嘿嘿嘿嘿"
					},
					{
						text: "嘿嘿嘿嘿"
					},
				],
			},
			imgStyle: {
				top: "0rem"
			},
			btn1Style: true,
			btn2Style: false,
		}
			
	},
	methods: {
		//切换作品展示内的显示
		toggleCurrent: function (index){
			if(this.oldIndex!=index){
				//切换class
				this.liArr[index].hasCurrent=true;
				this.liArr[this.oldIndex].hasCurrent=false;

				//切换显示
				this.imgArr.isShow[index]=true;
				this.imgArr.isShow[this.oldIndex]=false;

				//保存当前index值
				this.oldIndex=index;

				//top清零
				this.imgStyle.top="0rem";
				//按钮样式重置
				this.btn1Style=true;
				this.btn2Style=false;
			}	
		},
		slideUp: function (){
			var oTop=parseFloat(this.imgStyle.top);
			if(oTop>=-0.95){
				this.btn1Style=true;
			}
			if(oTop>=0){
				return;
			}
			this.imgStyle.top=oTop+0.95+"rem";
			this.btn2Style=false;
		},
		slideDown: function (){
			var oTop=parseFloat(this.imgStyle.top);

			var maxHeight=this.$el.querySelector(".imgBox").clientHeight/100;
			if(oTop<=-maxHeight+0.95+0.95){
				this.btn2Style=true;
			}
			if(oTop<=-maxHeight+0.95){
				return;
			}
			this.imgStyle.top=oTop-0.95+"rem";
			this.btn1Style=false;
		}
	}
}
// 路由设置
var router=new VueRouter({
	routes: [
		{
			path: "/home",
			name: "home",
			alias: "/",
			component: {
				template: "#home"
			}
		},
		{
			path: "/works",
			name: "works",
			component: temWorks
		},
		{
			path: "/info",
			name: "info",
			component: {
				template: "#info"
			}
		}
	]
})
var vm=new Vue({
	el: "#box",
	router,
	data: {
		navArr: [
			{
				url: {
					name: "home"
				},
				text: "首页",
				hasCurrent: true
			},
			{
				url: {
					name: "works"
				},
				text: "作品展示",
				hasCurrent: false
			},
			{
				url: {
					name: "info"
				},
				text: "简历信息",
				hasCurrent: false
			},
		],
		oldIndex: 0,
		bg1: {},
		bg2: {},
		bg3: {},
		nav: {},
		oBox: {}
	},
	methods: {
		changeClass: function (index){
			//若点击的与原来的那个不相等则执行
			if(this.oldIndex!=index){
				//添加新的，去掉旧的
				this.navArr[index].hasCurrent=true;
				this.navArr[this.oldIndex].hasCurrent=false;
				this.oldIndex=index;
			}
		},
		loadImg: function (){
			this.bg1={
				background: "url('file/images/bg1.png') no-repeat top 0px left 0px",
				backgroundSize: "100% 2.5rem",
				animation: "bg1 2s 1 linear forwards"
			};
			this.bg2={
				background: "url('file/images/bg2.png') no-repeat top 0px left 0px",
				backgroundSize: "100% 2.5rem",
				animation: "bg1 1.5s 1 linear forwards"
			};
			this.bg3={
				background: "url('file/images/bg3.png') no-repeat top 1.1rem left 0px",
				backgroundSize: "100% 2.5rem",
				animation: "bg1 1s 1 linear forwards"
			};
			this.nav={
				animation: " bg 2s 1 linear forwards"
			};
			this.oBox={
				background: "url('file/images/bg.jpg') no-repeat",
				backgroundSize: "100% 100%"
			}
		},
		//取消手机下拉默认事件
		cancelDefault: function (e){
			e.preventDefault();
		}
	},
	//背景图片预加载
	mounted: function (){
		var arr=[];
		var k=0;
		var img1=new Image();
		img1.src="file/images/bg3.png";

		var img2=new Image();
		img2.src="file/images/bg2.png";

		var img3=new Image();
		img3.src="file/images/bg1.png";

		var img4=new Image();
		img4.src="file/images/bg.jpg";
		arr=[img1,img2,img3,img4];
		var self=this;
		for (var i = 0,len=arr.length; i < len; i++) {
			arr[i].onload=function (){
				k++;
				if(k>=arr.length){
					self.loadImg();
				}
			}
		}
	}
})