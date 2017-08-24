# 画布实现拼图原理
* 页面布局:
  * bg: 背景提示图，使用半透明效果，移动图片后显示，层级最低，z-index:-1;
  * cvs: 当前画布，层级默认0；
  * content：覆盖在画布之上  z-index:1 <br>
    * currentCheckpoint: 显示当前关卡数与难度系数   z-index:2 <br>
    * currentBox: 鼠标按下时显示的盒子，模拟拖拽画布效果(按下瞬间清除盒子内画布，显示背景提示图)   z-index:1 <br>
    * willBox: 鼠标移动时显示将要交换的盒子   z-index:0 <br>
  * begin: 开始游戏层   z-index:2
  * over: 完成关卡显示层   z-index:3

* js实现
  * loadImg加载图片资源
  * 自定义封装event事件
  * index.js设置初始化背景提示层，选择难度，开始游戏，和每一关完成后的显示
  * drawBg.js：<br>
    * 大致思路: <br>
      * 初始化两个二维数组，oArr存放初始化的坐标，randomArr存放顺序打乱后的坐标 <br>
      * 把图片按randomArr存储，每次图片交换之后，randomArr数组中的顺序也交换 <br>
      * 当最后两个数组转换的字符串完全相等时，闯关成功 <br>
    * 模拟拖拽画布效果思路:<br>
      * 开始时两个小盒子隐藏，鼠标按下，获取按下的所在位置，转换成数组的index值，通过数组和index值找到currentBox显示位置，同时记录中心点坐标，清除当前区域画布，显示出背景提示图;  <br>
      * 鼠标移动，willBox盒子在距离currentBox中心点最近的区域显示; <br>
      * 鼠标松开，重新绘制两块区域的画布，然后隐藏两个小盒子，交换数组randomArr的顺序； <br>
      * 检查是否完成闯关，若完成闯关则移除当前所有事件 <br>




