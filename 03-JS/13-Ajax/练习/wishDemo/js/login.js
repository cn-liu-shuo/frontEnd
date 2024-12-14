// 获取切换按钮
var toLoginBtn = document.querySelector("#toLogin");
var toRegisterBtn = document.querySelector("#toRegister");
var container = document.querySelector(".container");
// 获取 登录和注册表单
var loginFormIpt = document.querySelectorAll("#form2 input");
var registerFormIpt = document.querySelectorAll("#form1 input");

toLoginBtn.onclick = function () {
  container.classList.remove("panel-active");
  // 清空注册输入框
  registerFormIpt.forEach(function (val) {
    val.value = "";
  });
};
toRegisterBtn.onclick = function () {
  container.classList.add("panel-active");
  // 清空登录输入框
  loginFormIpt.forEach(function (val) {
    val.value = "";
  });
};
// ****************************************************
// 获取 登录和注册 按钮
var login = document.querySelector("#login");
var register = document.querySelector("#register");

// 登录
login.onclick = function () {
  // 判断输入框里面的值是否为空
  if (loginFormIpt[0].value == "" || loginFormIpt[1].value == "") {
    alert("不是哥们？Your eyes用不着就捐了吧！");
  } else {
    $ajax({
      method: "post",
      url: "http://wish.byesame.com/login",
      data: {
        userName: loginFormIpt[0].value,
        passWord: loginFormIpt[1].value,
      },
      asyn: true,
      contentType: "application/x-www-form-urlencoded",
      token: "",
      success: function (val) {
        var loginData = JSON.parse(val);
        console.log(loginData);
        // 存储 token
        localStorage.setItem("token", loginData.data.token);
        alert("登录成功！");
        location.href = "index.html";
      },
    });
  }
};
