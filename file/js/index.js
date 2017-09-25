
new Vue({
	el: "#box",
	router: Vue.router,
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