// 路由设置
(function (vue){
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
				component: Vue.temWorks
			},
			{
				path: "/info",
				name: "info",
				component: Vue.info
			}
		]
	})
	vue.router=router;
})(Vue)