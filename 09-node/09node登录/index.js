const express = require("express");

const app = express();

app.use(express.json());
// 跨域
const cors = require("cors");
app.use(cors());
// 路由
const userRouter = require("./router/index");

app.use("/", userRouter);

app.listen(4300, () => {
  console.log("-> http://localhost:4300");
  console.log("-> http://127.0.0.1:4300");
});
