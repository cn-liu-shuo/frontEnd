function pagination(pageIndexDom, left, right, pageNum, success) {
  // 获取相对应的 dom 元素
  var pageIndex = document.querySelector(pageIndexDom);
  var left = document.querySelector(left);
  var right = document.querySelector(right);

  // 定义一个变量 页数
  var pageNum = pageNum;

  // 定义一个变量 存储当前点击的页码
  var index = null;

  // 遍历数组 动态渲染 span
  for (var i = 0; i < pageNum; i++) {
    pageIndex.innerHTML += `<span>${i + 1}</span>`;
  }

  // 获取 pageIndex 里面的所有 span 然后给第一个span加active类名
  var spans = pageIndex.children;
  spans[0].className = "active";

  // 遍历 pageIndex 里面的所有 span 并绑定点击事件
  for (var i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
      // 清除页面上的 active 类名
      document.querySelector(`${pageIndexDom} .active`).className = "";
      // 给当前点击的span加 active 类名
      this.className = "active";
      // 获取当前点击元素的页码
      index = this.innerText;
      success(index);
    };
  }

  // 上一页
  left.onclick = function () {
    // 先获取拥有 active 类名的 span 元素
    var spanActive = document.querySelector(`${pageIndexDom} .active`);
    if (spanActive.previousElementSibling == null) {
      // alert('到头了， 别点了');
    } else {
      // 有上一个元素就模拟点击一下
      spanActive.previousElementSibling.onclick();
    }
  };

  // 下一页
  right.onclick = function () {
    // 先获取拥有 active 类名的 span 元素
    var spanActive = document.querySelector(`${pageIndexDom} .active`);
    if (spanActive.nextElementSibling == null) {
      // alert('到头了， 别点了');
    } else {
      // 有下一个元素就模拟点击一下
      spanActive.nextElementSibling.onclick();
    }
  };
}
