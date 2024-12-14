/*
    封装函数:
        该函数是否多次调用
        会出现哪些不确定的值 将不确定的值当参数传进去
    

    请求方法 method
    请求地址 url
    传递的参数 data
    同步异步 asyn
    请求头信息 contentType
    成功的函数 success


    使用 $ajax({
        method: '';
        url: '';
        data: {
            a: 参数1,
            b: 参数2
        }
        asyn: '',
        contentType: '',
        success: function(参数) {

        }
    })
*/

// 以对象的形式接收传进来的参数
function $ajax({ method, url, data, asyn, contentType, success }) {
  // 创建 ajax 异步对象
  var xhr = new XMLHttpRequest();
  // 将传入的 data 进行处理
  data = queryString(data);
  // 如果是 get 请求没有参数 不需要拼接?
  // 如果是 get 请求有参数 需要拼接? 和 参数
  if (method == "get" && data.length) {
    url += "?" + data;
  }

  // 创建 http 请求
  xhr.open(method, url, asyn);
  // 如果有请求头就设置
  if (contentType) {
    xhr.setRequestHeader("Content-Type", contentType);
  }
  // 发送请求 判断是 get 还是 post
  if (method == "get") {
    xhr.send();
  } else {
    xhr.send(data);
  }

  // 设置监听变化函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // var obj = JSON.parse(xhr.responseText);
      if (success) {
        success(xhr.responseText);
      }
    }
  };
}

// 处理传参格式
function queryString(obj) {
  var str = "";
  for (var i in obj) {
    // userName=张三&passWord=123456
    str += `${i}=${obj[i]}&`;
  }
  return str.substring(0, str.length - 1);
}
