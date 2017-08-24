
/**
* 图片加载函数
* imgUrl: 对象，存放图片地址
* fn: 回调函数，图片加载完成后执行
**/
(function (w){
	function loadImg(imgUrl,Fn){
		var obj={};
		var imgL=0;
		var imgNum=0;
		for(var k in imgUrl){
			imgNum++;
			var img=new Image();
			img.onload=function (){
				imgL++;
				if(imgL>=imgNum){
					Fn(obj);
				}
			}
			img.src=imgUrl[k];
			obj[k]=img;
		}
	}
	w.loadImg=loadImg;
})(window)