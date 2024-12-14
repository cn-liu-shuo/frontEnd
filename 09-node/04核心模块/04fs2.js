const fs = require("node:fs/promises");
const path = require("node:path");

// 创建文件
// fs.appendFile(path.resolve(__dirname, "./wukong1.txt"), "悟空偷桃")
// .then(res => {
//     console.log("添加成功")
// })

// 复制
// fs.readFile(path.resolve(__dirname, "./1.webp"))
// .then(buff => {

//     return fs.appendFile(path.resolve(__dirname, "./wuk.jpg"), buff)
// })
// .then(res => {
//     console.log("添加成功");
// })

// 创建目录
// recursive 设置为true 会自动创建不存在的上一级
fs.mkdir(path.resolve(__dirname, "./hi/hello"), { recursive: true }).then(
  (res) => {
    console.log("成功！！");
  }
);

// 删除目录
// fs.rmdir(path.resolve(__dirname, "./hi/hello"), {recursive: true})
// .then(res => {
//     console.log("删除！！！");
// })
