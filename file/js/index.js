
//作品展示块组件
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
			//.current样式初始所在li的index
			oldIndex: 0,
			imgArr: {
				isShow: [true,false,false,false],
				gameArr: [
					{
						text: "飞翔的小鸟",
						url: "https://hsiangleev.github.io/game-flyBird/index.html",
						imgUrl: "file/images/1-fly.png"
					},
					{
						text: "矩形躲避",
						url: "https://hsiangleev.github.io/game-line/index.html",
						imgUrl: "file/images/1-line.png"
					},
					{
						text: "简易贪吃蛇",
						url: "https://hsiangleev.github.io/game-snake/index.html",
						imgUrl: "file/images/1-snake.png"
					},
					{
						text: "js图片拼图",
						url: "https://hsiangleev.github.io/game-puzzle/index.html",
						imgUrl: "file/images/1-puzzle.png"
					},
					{
						text: "vue小拼图",
						url: "https://hsiangleev.github.io/vue-puzzle/index.html",
						imgUrl: "file/images/1-puzzleVue.png"
					},
				],
				compArr: [
					{
						text: "弹出层",
						url: "https://hsiangleev.github.io/component-alert/alert.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "加载动画",
						url: "https://hsiangleev.github.io/component-load/load.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "导航条",
						url: "https://hsiangleev.github.io/component-nav/nav.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "滚动条",
						url: "https://hsiangleev.github.io/component-scroll/scroll.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "轮播图",
						url: "https://hsiangleev.github.io/component-carousel/carousel.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "验证码",
						url: "https://hsiangleev.github.io/component-randomCode/randomCode.html",
						imgUrl: "file/images/none.png"
					},
					{
						text: "验证码",
						url: "https://hsiangleev.github.io/component-randomCode/randomCode.html",
						imgUrl: "file/images/none.png"
					},
				],
				bootArr: [
					{
						text: "WordPress",
						url: "https://hsiangleev.github.io/mybootstrap/wp/",
						imgUrl: "file/images/none.png"
					},
					{
						text: "ghost",
						url: "https://hsiangleev.github.io/mybootstrap/ghost/",
						imgUrl: "file/images/none.png"
					},
					{
						text: "xfc",
						url: "https://hsiangleev.github.io/mybootstrap/xfc/",
						imgUrl: "file/images/none.png"
					},
				],
				projArr: [
					{
						text: "js综合",
						url: "https://hsiangleev.github.io/smallProject-fgm/",
						imgUrl: "file/images/none.png"
					},
				],
			},
			//下一页初始高度
			imgStyle: {
				top: "0rem"
			},
			//按钮样式
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

//个人简历组件
var info={
	template: "#info",
	data: function (){
		return {
			photo: "file/images/photo.jpg",
			skillBox: [
				{
					header: "技能特长",
					content: "html5, css3, javascript, jQuery, ajax, vuejs"
				},
				{
					header: "兴趣爱好",
					content: "看史书，打乒乓球，玩玩游戏"
				},
			],
			myinfo: ["年龄：23岁","所在地：安徽省池州市","工作经验：无"],

			rightBox: [
				{
					title: "求职意向",
					content: [
						{
							title: "意向岗位: ",
							text: "前端开发"
						},
						{
							title: "职业类型: ",
							text: ""
						},
						{
							title: "意向城市: ",
							text: "上海"
						},
						{
							title: "薪资要求: ",
							text: ""
						},
					]
				},
				{
					title: "教育背景",
					content: [
						{
							title: "时间: ",
							text: "2014.9--2018.6"
						},
						{
							title: "学校: ",
							text: "池州学院"
						},
						{
							title: "专业: ",
							text: "计算机科学与技术"
						},
					]
				},

				{
					title: "自我评价",
					content: [
						{
							title: "",
							text: "性格有点内向、乐观上进、有爱心并善于施教并行；自学前端10个月左右熟练使用html5, css3, 并能用原生javascript编写一般性的网站需求, 熟练使用jQuery，了解vuejs, ajax, json等，会用简单性的mysql语句,简单了解php"
						},
					]
				},
			]
		}
	},
	mounted: function (){
		c_scroll();
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
			component: info
		}
	]
})
var vm=new Vue({
	el: "#box",
	router: router,
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
		oBox: {},
		isLoading: false,
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
			//加载完成显示动画
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
			//加载完成显示组件
			this.isLoading=true;
		}
	},
	//背景图片预加载
	mounted: function (){
		var arr=[];
		var k=0;
		//输出图片实例数组
		function oImg(urlArr){
			var oarr=[];
			for (var i = 0,len=urlArr.length; i < len; i++) {
				var img=new Image();
				img.src=urlArr[i];
				oarr.push(img);
			}
			return oarr;
		}
		arr=oImg(["file/images/bg3.png","file/images/bg2.png","file/images/bg1.png","file/images/bg.jpg"]);
		
		var self=this;
		for (var i = 0,len=arr.length; i < len; i++) {
			arr[i].onload=function (){
				k++;
				if(k>=arr.length){
					self.loadImg();
				}
			}
		}
		//刷新回到首页
		this.$router.push('/');
	}
})