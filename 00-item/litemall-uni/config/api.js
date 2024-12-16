// 基准接口地址
const base_url = 'http://admin.bsmall.byesame.com/wx/';

module.export = {
	IndexUrl: base_url + 'home/index' // 首页数据接口
	AboutUrl: base_url + 'home/about' // 介绍信息

	CatalogList: base_url + 'catalog/index', //分类目录全部分类数据接口
	CatalogCurrent: base_url + 'catalog/current', //分类目录当前分类数据接口

	AuthLoginByWeixin: base_url + 'auth/login_by_weixin', //微信登录
	AuthLoginByAccount: base_url + 'auth/login', //账号登录
	AuthLogout: base_url + 'auth/logout', //账号登出
	AuthRegister: base_url + 'auth/register', //账号注册
	AuthReset: base_url + 'auth/reset', //账号密码重置
	AuthRegisterCaptcha: base_url + 'auth/regCaptcha', //验证码
	AuthBindPhone: base_url + 'auth/bindPhone', //绑定微信手机号

	GoodsCount: base_url + 'goods/count', //统计商品总数
	GoodsList: base_url + 'goods/list', //获得商品列表
	GoodsCategory: base_url + 'goods/category', //获得分类数据
	GoodsDetail: base_url + 'goods/detail', //获得商品的详情
	GoodsRelated: base_url + 'goods/related', //商品详情页的关联商品（大家都在看）

	BrandList: base_url + 'brand/list', //品牌列表
	BrandDetail: base_url + 'brand/detail', //品牌详情

	CartList: base_url + 'cart/index', //获取购物车的数据
	CartAdd: base_url + 'cart/add', // 添加商品到购物车
	CartFastAdd: base_url + 'cart/fastadd', // 立即购买商品
	CartUpdate: base_url + 'cart/update', // 更新购物车的商品
	CartDelete: base_url + 'cart/delete', // 删除购物车的商品
	CartChecked: base_url + 'cart/checked', // 选择或取消选择商品
	CartGoodsCount: base_url + 'cart/goodscount', // 获取购物车商品件数
	CartCheckout: base_url + 'cart/checkout', // 下单前信息确认

	CollectList: base_url + 'collect/list', //收藏列表
	CollectAddOrDelete: base_url + 'collect/addordelete', //添加或取消收藏

	CommentList: base_url + 'comment/list', //评论列表
	CommentCount: base_url + 'comment/count', //评论总数
	CommentPost: base_url + 'comment/post', //发表评论

	TopicList: base_url + 'topic/list', //专题列表
	TopicDetail: base_url + 'topic/detail', //专题详情
	TopicRelated: base_url + 'topic/related', //相关专题

	SearchIndex: base_url + 'search/index', //搜索关键字
	SearchResult: base_url + 'search/result', //搜索结果
	SearchHelper: base_url + 'search/helper', //搜索帮助
	SearchClearHistory: base_url + 'search/clearhistory', //搜索历史清楚

	AddressList: base_url + 'address/list', //收货地址列表
	AddressDetail: base_url + 'address/detail', //收货地址详情
	AddressSave: base_url + 'address/save', //保存收货地址
	AddressDelete: base_url + 'address/delete', //保存收货地址

	ExpressQuery: base_url + 'express/query', //物流查询

	RegionList: base_url + 'region/list', //获取区域列表

	OrderSubmit: base_url + 'order/submit', // 提交订单
	OrderPrepay: base_url + 'order/prepay', // 订单的预支付会话
	OrderList: base_url + 'order/list', //订单列表
	OrderDetail: base_url + 'order/detail', //订单详情
	OrderCancel: base_url + 'order/cancel', //取消订单
	OrderRefund: base_url + 'order/refund', //退款取消订单
	OrderDelete: base_url + 'order/delete', //删除订单
	OrderConfirm: base_url + 'order/confirm', //确认收货
	OrderGoods: base_url + 'order/goods', // 代评价商品信息
	OrderComment: base_url + 'order/comment', // 评价订单商品信息

	AftersaleSubmit: base_url + 'aftersale/submit', // 提交售后申请
	AftersaleList: base_url + 'aftersale/list', // 售后列表
	AftersaleDetail: base_url + 'aftersale/detail', // 售后详情

	FeedbackAdd: base_url + 'feedback/submit', //添加反馈
	FootprintList: base_url + 'footprint/list', //足迹列表
	FootprintDelete: base_url + 'footprint/delete', //删除足迹

	GroupOnList: base_url + 'groupon/list', //团购列表
	GroupOnMy: base_url + 'groupon/my', //团购API-我的团购
	GroupOnDetail: base_url + 'groupon/detail', //团购API-详情
	GroupOnJoin: base_url + 'groupon/join', //团购API-详情

	CouponList: base_url + 'coupon/list', //优惠券列表
	CouponMyList: base_url + 'coupon/mylist', //我的优惠券列表
	CouponSelectList: base_url + 'coupon/selectlist', //当前订单可用优惠券列表
	CouponReceive: base_url + 'coupon/receive', //优惠券领取
	CouponExchange: base_url + 'coupon/exchange', //优惠券兑换

	StorageUpload: base_url + 'storage/upload', //图片上传,

	UserIndex: base_url + 'user/index', //个人页面用户相关信息
	IssueList: base_url + 'issue/list', //帮助信息
}