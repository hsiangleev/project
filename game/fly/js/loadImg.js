
/**
* 图片加载函数
* imgUrl: 对象，存放图片地址
* fn: 回调函数，图片加载完成后执行
**/
function loadImg(imgUrl,fn) {
	//定义新对象存放已加载完成的图片
	var imgObj={};

	var loadImg1=0;
	var totalImg=0;
	for(var item in imgUrl){
		//创建图片节点
		var img=new Image();
		totalImg++;
		//图片加载完成之后执行回调函数
		img.onload=function () {
			 loadImg1++;
			 if(loadImg1>=totalImg){
			 	fn(imgObj);
			 }
		}
		img.src=imgUrl[item];
		imgObj[item]=img;
	}
}