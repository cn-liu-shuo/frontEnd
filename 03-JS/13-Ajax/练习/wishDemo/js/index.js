// 获取相关的 dom 元素
var wishList = document.querySelector(".wishListCon ul");
// 获取留言列表
function getWishList(pages) {
  $ajax({
    method: "get",
    url: "http://wish.byesame.com/wish",
    data: {
      page: pages,
      rows: 10,
    },
    asyn: true,
    contentType: "application/x-www-form-urlencoded",
    token: localStorage.getItem("token"),
    success: function (val) {
      var wishData = JSON.parse(val).data;
      localStorage.setItem("pageNum", Math.ceil(wishData.count / 10));
      // 每一个调用都还原成第一行
      wishList.innerHTML = `
            		<li class="clearfix">
						<span>序号</span>
						<span>用户名</span>
						<span>内容</span>
						<span>操作</span>
					</li>	
            	`;
      // 添加点击页数的数据
      for (var i in wishData.list) {
        wishList.innerHTML += `
	            		<li class="clearfix">
							<span>${Number(i) + 1 + (pages - 1) * 10}</span>
							<span>${wishData.list[i].name}</span>
							<span>${wishData.list[i].content}</span>
							<span>
								<a href="javascript:;">删除</a>
							</span>
						</li>	
	            	`;
      }
    },
  });
}
// 页面刷新先调用第一页
getWishList(1);
// 分页
pagination(
  ".pageIndex",
  ".left",
  ".right",
  localStorage.getItem("pageNum"),
  function (val) {
    // 点击那一页 val 就是几
    getWishList(val);
  }
);
