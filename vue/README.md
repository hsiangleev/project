###弹射小球
> 1. 定义每个弹射的小球组件( ocicle )
2. 组件message自定义属性存放小球初始信息(可修改)
	{
	　　　top: "0px",        //小球距离上方坐标
	　　　left: "0px",        //小球距离左边坐标
	　　　speedX: 12,      //小球每次水平移动距离
	　　　speedY: 6         //小球每次垂直移动距离
	}    
3. 思路
	* 定时器设置小球每一帧移动
	*  初始方向：isXtrue为true则小球为横坐标正方向；
　　　　　　　　　isYtrue为true则小球为纵坐标正方向
	* 每次移动之前获取小球当前坐标(oleft,otop)，当前坐标加上移动距离为下一帧坐标
	* 边界判断：横轴坐标范围超过最大值则加号变减号
4. vue知识点
	* 父子组件传递信息使用props
	* 模板编译之前获取el宽高 
		beforeMount: function (){
		    this.elWidth=this.$el.clientWidth;
		    this.elHeight=this.$el.clientHeight;
		}
	* 子组件获取el宽高 ( this.$root.elWidth,this.$root.elHeight )
	* 模板编译完成后更新子组件信息
			mounted: function (){
			    //根据父组件信息更新小球数据
			    this.addStyle.top=this.message.top;
			    this.addStyle.left=this.message.left;
			    this.speedX=this.message.speedX;
			    this.speedY=this.message.speedY;
			    //小球初始坐标
			    this.oleft=parseInt(this.addStyle.left);
			    this.otop=parseInt(this.addStyle.top);
			    this.move();
			> }
5. [链接地址]( http://hsianglee.top/vue/moveBall.html )

###vue拼图
>1. 定义组件box
2. 使用slot在父组件插入button，调用子组件this.$children[0].randomNum()重新生成随机数组达到重新开始游戏的目的
3.  子组件中使用v-for生成li，再添加样式时使用 (!val) 给空值添加样式
4.  代码思路：
	1. 定义两个数组，一个为完成后的，一个为打乱的
	打乱数组代码: 
		this.randomArr.sort(function (a,b){
				return Math.random()-0.5;
	})
	2. 每次移动前获取点击的 value 值，和其上下左右的 value 值
	3. 判断若四周有value值为空，则交换数组顺序
	交换数组顺序代码: 
		this.randomArr.splice(index,1,lNum);
	this.randomArr.splice(index-1,1,cNum);
	4. 每次移动后判断两个数组是否相等
	代码: 
		if(this.numArr.join(" ")==this.randomArr.join(" ")){
				return true;
		}else{
				return false;
	}
5. [链接地址]( http://hsianglee.top/vue/puzzleVue.html )