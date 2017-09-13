
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
						url: "http://hsianglee.top/fly/",
						imgUrl: "file/images/1-fly.PNG"
					},
					{
						text: "矩形躲避",
						url: "http://hsianglee.top/line/",
						imgUrl: "file/images/1-line.PNG"
					},
					{
						text: "简易贪吃蛇",
						url: "http://hsianglee.top/snake/",
						imgUrl: "file/images/1-snake.PNG"
					},
					{
						text: "js图片拼图",
						url: "http://hsianglee.top/puzzle/",
						imgUrl: "file/images/1-puzzle.PNG"
					},
					{
						text: "vue小拼图",
						url: "http://hsianglee.top/vue/puzzleVue.html",
						imgUrl: "file/images/1-puzzleVue.PNG"
					},
				],
				compArr: [
					{
						text: "弹出层",
						url: "http://hsianglee.top/component/alert.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "加载动画",
						url: "http://hsianglee.top/component/load.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "导航条",
						url: "http://hsianglee.top/component/nav.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "滚动条",
						url: "http://hsianglee.top/component/scroll.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "轮播图",
						url: "http://hsianglee.top/component/carousel.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "验证码",
						url: "http://hsianglee.top/component/randomCode.html",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "验证码",
						url: "http://hsianglee.top/component/randomCode.html",
						imgUrl: "file/images/none.PNG"
					},
				],
				bootArr: [
					{
						text: "WordPress",
						url: "http://hsianglee.top/bootstrap/wp/",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "ghost",
						url: "http://hsianglee.top/bootstrap/ghost/",
						imgUrl: "file/images/none.PNG"
					},
					{
						text: "xfc",
						url: "http://hsianglee.top/bootstrap/xfc/",
						imgUrl: "file/images/none.PNG"
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
			if(oTop>=0){
				this.btn1Style=true;
				return;
			}
			this.imgStyle.top=oTop+0.95+"rem";
			this.btn2Style=false;
		},
		slideDown: function (){
			var oTop=parseFloat(this.imgStyle.top);

			var maxHeight=this.$el.querySelector(".imgBox").clientHeight/100;
			if(oTop<=-maxHeight+0.95){
				this.btn2Style=true;
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
				
			
		}
	}
})