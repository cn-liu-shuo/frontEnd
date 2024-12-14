const express = require("express");
const path = require("path");
const app = express();

// 引入跨域插件 npm i cors
const cors = require("cors");
app.use(cors());

// 配置静态资源
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));

// 导入路由
const MonsRouter = require("./router/index");
/* 
    模板引擎
    1、下载  npm i ejs
    2.配置模板引擎是ejs  app.set("view engine", "ejs")
    3.配置模板路径  app.set("views", path.resolve(__dirname,"views"))

    语法：
        <%=变量%> 以文本的方式输出，不解析html标签
        <%-变量%> 可以解析标签
        <% %> 可以直接写js代码
        <%for(var i = 0; i < 5; i++){%>
            <h1><%=i%></h1>
        <%}%>
*/
// 配置模板引擎
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// "/mons"  ===> /mons/west  /mons/delete
app.use("/", MonsRouter);

app.listen(4399, () => {
  console.log(
    "启动！！！\n --> http://localhost:4399/ \n --> http://127.0.0.1:4399/"
  );
});
