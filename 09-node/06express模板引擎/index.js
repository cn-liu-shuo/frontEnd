const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const app = express();

let MONSTER_ARR = require("./data/monster.json");

// 配置静态资源
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
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

app.get("/west", (req, res) => {
  // res.send("欢迎")
  // render 用来渲染模板引擎  并将其返回给浏览器
  res.render("west", {
    mons: MONSTER_ARR,
  });
});

app.post("/add-mons", (req, res) => {
  console.log(req.body);
  // 新信息
  const num = MONSTER_ARR.length;
  const id = num > 0 ? MONSTER_ARR[num - 1].id + 1 : 1;
  const newMons = {
    id,
    ...req.body,
    // name: req.body.name
  };
  // 将新数组添加到数组中
  MONSTER_ARR.push(newMons);
  fs.writeFile(
    path.resolve(__dirname, "./data/monster.json"),
    JSON.stringify(MONSTER_ARR)
  ).then(() => {
    // 重定向 告诉浏览器 向另一个地址或者路由 再发起一次请求
    res.redirect("/west");
  });
  console.log(newMons);
});

// 删除
app.get("/delete", (req, res) => {
  console.log(req.query);
  // 找出对应id的数据
  MONSTER_ARR = MONSTER_ARR.filter((item) => item.id != req.query.id);
  fs.writeFile(
    path.resolve(__dirname, "./data/monster.json"),
    JSON.stringify(MONSTER_ARR)
  ).then(() => {
    // 重定向 告诉浏览器 向另一个地址或者路由 再发起一次请求
    res.redirect("/west");
  });
});

// 修改
app.get("/update", (req, res) => {
  let id = req.query.id;
  let mons = MONSTER_ARR.find((item) => item.id == id);
  console.log(mons);
  res.render("update", {
    user: mons,
  });
});

// 提交修改
app.post("/update-mons", (req, res) => {
  console.log(req.body);
  const { id, name, age, sex, address } = req.body;
  const mons = MONSTER_ARR.find((item) => item.id == id);
  mons.name = name;
  mons.age = age;
  mons.sex = sex;
  mons.address = address;
  fs.writeFile(
    path.resolve(__dirname, "./data/monster.json"),
    JSON.stringify(MONSTER_ARR)
  ).then(() => {
    // 重定向 告诉浏览器 向另一个地址或者路由 再发起一次请求
    res.redirect("/west");
  });
});

app.listen(3333, () => {
  console.log(
    "启动！！！\n --> http://localhost:3333/ \n --> http://127.0.0.1:3333/"
  );
});
