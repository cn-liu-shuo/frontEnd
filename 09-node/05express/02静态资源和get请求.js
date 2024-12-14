const express = require("express");
const path = require("path");
const app = express();

// 服务器的代码默认对外都是不可见的，所有html页面，浏览器无法直接访问
// 如果希望浏览器访问，需要将页面所在的目录设置成静态资源目录
// 设置express.static中间件，浏览器访问时，会自动获取public目录中是否有匹配的静态资源
app.use(express.static(path.resolve(__dirname, "./public")));

// 处理/login
app.get("/login", (req, res) => {
  console.log(req.query);
  if (req.query.username === "admin" && req.query.password === "123456") {
    res.send("<h1>欢迎登陆</h1>");
  } else {
    res.send("<h1>用户名或密码错误</h1>");
  }
});

// app.get("/", (req, res) => {
//   res.send("欢迎")
// })

app.listen(3333, () => {
  console.log(
    "启动！！！\n --> http://localhost:3333/ \n --> http://127.0.0.1:3333/"
  );
});
