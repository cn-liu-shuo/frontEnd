/* 
  fs：
    -用来帮助node独处磁盘里的文件
    -使用 先导入
*/

// 当我们通过fs读取磁盘的文件的时候，数据会以buff对象的形式返回
// buffer 临时用来存储数据的缓存

const { log } = require("node:console");
const fs = require("node:fs/promises");
const path = require("node:path");
// readFileSync 同步读取文件的方法 会阻塞后面代码的执行
// const buff = fs.readFileSync(path.resolve(__dirname,"./liu.txt"))

// console.log(buff.toString())

// readFile() 异步读取文件的方法 有回调函数 有回调地狱的可能
// fs.readFile(path.resolve(__dirname, "./liu.txt"), (err, buffer) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(buffer.toString())
//   }
// })

// promise版本
// fs.readFile(path.resolve(__dirname, "./liu.txt"))
//   .then((buff) => {
//     console.log(buff.toString())
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// async await
(async () => {
  try {
    const buff = await fs.readFile(path.resolve(__dirname, "./liu.txt"));
    console.log(buff.toString());
  } catch (e) {
    console.log("出错了");
  }
})();
