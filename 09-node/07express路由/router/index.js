const express = require("express");
const fs = require("fs/promises");
const path = require("path");
let MONSTER_ARR = require("../data/monster.json");

// 创建路由对象
const router = express.Router();

router.get("/west", (req, res) => {
  // res.send("欢迎")
  // render 用来渲染模板引擎  并将其返回给浏览器
  res.render("west", {
    mons: MONSTER_ARR,
  });
});

router.post("/add-mons", (req, res, next) => {
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

  next();
});

// 删除
router.get("/delete", (req, res, next) => {
  console.log(req.query);
  // 找出对应id的数据
  MONSTER_ARR = MONSTER_ARR.filter((item) => item.id != req.query.id);

  next();
});

// 修改
router.get("/update", (req, res) => {
  let id = req.query.id;
  let mons = MONSTER_ARR.find((item) => item.id == id);
  console.log(mons);
  res.render("update", {
    user: mons,
  });
});

// 提交修改
router.post("/update-mons", (req, res, next) => {
  console.log(req.body);
  const { id, name, age, sex, address } = req.body;
  const mons = MONSTER_ARR.find((item) => item.id == id);
  mons.name = name;
  mons.age = age;
  mons.sex = sex;
  mons.address = address;

  next();
});

router.use((req, res) => {
  fs.writeFile(
    path.resolve(__dirname, "../data/monster.json"),
    JSON.stringify(MONSTER_ARR)
  ).then(() => {
    // 重定向 告诉浏览器 向另一个地址或者路由 再发起一次请求
    res.redirect("/west");
  });
});
// 将router暴露
module.exports = router;
