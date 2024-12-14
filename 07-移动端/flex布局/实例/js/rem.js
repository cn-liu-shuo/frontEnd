// 核心原理就是根据不同的width给网页中的html根节点设置不同的font-size,然后所有的px都用rem来代替，这样就实现了不同大小的屏幕都去适用相同的样式，其实他就是一个终端设备适配的解决方案，也就是说它可以让你在不同的终端设备上实现页面适配
(function (doc, win) {
            // document.documentElement 返回的是文档对象(document)的根元素html
			var docEl = doc.documentElement,
            // 判断当前窗口有没有orientationchange这个方法 有的话就赋值给变量resizeEvt，如果没有就返回resize方法
            // orientationchange事件是在用户水平或者垂直翻转设备（方向发生改变的时候）时触发的事件
            // resize 调整浏览器窗口大小时 触发resize事件
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
				var clientWidth = docEl.clientWidth;
                // 如果没有获取到宽度 直接返回 下边的代码不执行
				if (!clientWidth) return;
                // 这里的750 取决于设计稿的宽度 大多数750 少数可能640
                // 如果当前的页面宽度超过750px 那么页面中的html的font-size为100px,否则页面中html的font-size就是100*（当前页面宽度/750）
                if (clientWidth >= 640) {
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };
            if (!doc.addEventListener) return;
            // resizeEvt就是上边接收的事件，拿orientationchange举例子，这行代码的意思就是 窗口去监听orientationchange，执行上边的recalc方法，第三个参数默认值是false 在冒泡阶段执行
            win.addEventListener(resizeEvt, recalc, false);
            // DOMContentLoaded 初始化的html文档被完全加载和解析完成触发该事件
            doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
