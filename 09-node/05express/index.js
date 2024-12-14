const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, "./public")));

// 引入中间件 解析post请求
// {extended:true} 表示深层解析
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  // res.send("<h1>欢迎登陆</h1>")
  // req.body去获取post请求的参数
  console.log(req.body);

  if (req.body.username === "admin" && req.body.password === "123456") {
    res.send("<h1>登陆成功</h1>");
  } else {
    res.send("<h1>用户名或密码错误</h1>");
  }
});

app.listen(3333, () => {
  console.log(
    "启动！！！\n --> http://localhost:3333/ \n --> http://127.0.0.1:3333/"
  );
});
