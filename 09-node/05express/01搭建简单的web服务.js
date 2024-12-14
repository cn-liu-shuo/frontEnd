/* 
    express 是node中的服务器软件
        通过express可以快速的搭建一个web服务器

*/
/* 
    nodemon： 自动监视代码的修改  自动重启服务
    1.下载 npm i nodemon -g
    2. 启动 nodemon //默认运行 index.js
        nodemon XXXX//运行指定js

*/

// 1.下载express  npm i express

// 2.引入express
const express = require("express");

// 3.获取服务器实例
const app = express();

/* 
    中间件:
        app.use()
*/
// '/' 所有的请求都会找 可以省略不写
// app.use('/', (req, res) => {
//     res.send("<h1>请你去高老庄坐了一会</h1>")
// })

//   /hi 匹配所有以hi开头的请求
// app.use('/hi', (req, res) => {
//     res.send("<h1>请你去高老庄坐了一会</h1>")
// })

// next 放行 不能等send完之后再调用
app.use((req, res, next) => {
  // res.send("<h1>111</h1>")
  next();
});
app.use((req, res, next) => {
  // res.send("<h1>222</h1>")
  next();
});
app.use((req, res, next) => {
  // res.send("<h1>333</h1>")
  next();
});

/* 
    如果希望服务器可以正常访问，需要为服务器设置路由
    路由可以根据不同的请求方式和请求地址来处理用户的请求

    app.get post...
*/
app.get("/", (req, res) => {
  console.log("有人来敲门~~");
  // 路由的两个参数
  // 1.读取用户的请求  request
  // 2.根据用户的请求发送响应  response
  console.log(req.url);

  // res.sendStatus(404)  向客户端发送状态码
  res.status(200); //设置状态码  但是不发送
  res.send("<h1>孙悟空在家睡觉</h1>"); //设置并发送响应体
});

app.get("/hi", (req, res) => {
  res.send("<h1>霍骅在吃饭</h1>");
});

app.get("/hello", (req, res) => {
  res.send("<h1>霍骅在吃饭</h1>");
});

// 可以在所有路由后面配置错误路由
app.use((req, res) => {
  res.send("<h1>你访问的页面去取经了</h1>");
});

// 4.启动服务器
// http://localhost:3333/
// http://127.0.0.1:3333/
app.listen(3333, () => {
  console.log(
    "启动！！！\n --> http://localhost:3333/ \n --> http://127.0.0.1:3333/"
  );
});
