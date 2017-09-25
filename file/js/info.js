//个人简历组件
(function (vue){
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
			this.c_scroll();
		}
	}
	vue.info=info;
})(Vue)