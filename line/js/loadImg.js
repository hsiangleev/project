
function loadImg(imgUrl,fn) {
	var imgObj={};
	var imglen=0;
	var loadI=0;
	for(var item in imgUrl){
		var img=new Image();
		imglen++;
		img.onload=function () {
			loadI++;
			if(loadI>=imglen){
				fn(imgObj);
			}
		}

		img.src=imgUrl[item];
		imgObj[item]=img;
	}
}