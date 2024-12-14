// 移动谁dom ，移动到目标位置
// box1  400
function animate(element, position) {
  // 每次进来清除定时器
  clearInterval(element.timer);
  // box1.onclick=function()
  // box1.timer=function()
  element.timer = setInterval(function () {
    // 获取当前元素的起始位置
    var current = element.offsetLeft;
    /* 
			定义速度变量step
			判断当前元素的起始位置是不是大于目标位置
			var step = 0 > 400 ? -10 : 10
			step=10 相当于每次向右移动+10px(到达终点就-10)
			step=-10 相当于每次向左移动-10px(在起点+10)
			如果大于就+10px 将10赋值给step,小于就-10px 将-10赋值给step 
		*/
    // var step = current > position ? -10 : 10

    var step = (position - current) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    /*
			Math.abs取绝对值
			现在的位置-目标位置差值小于每次移动的距离 直接到达目的地
			Math.abs(0 - 400) > 10
			故div的left=初始位置+速度px 每20毫秒执行一次
		*/
    if (Math.abs(current - position) > step) {
      element.style.left = current + step + "px";
    } else {
      // 走到最后一步 就让元素直接到达目的地
      element.style.left = position + "px";
      // 结束定时器
      clearInterval(element.timer);
    }
  }, 20);
}
