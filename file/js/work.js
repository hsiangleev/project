//作品展示块组件
(function (vue){
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
						{
							text: "眼镜在线试戴",
							url: "https://hsiangleev.github.io/proj-eyeglass/",
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
	vue.temWorks=temWorks;
})(Vue)