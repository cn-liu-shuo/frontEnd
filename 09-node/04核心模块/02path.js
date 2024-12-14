/* 
  path:
      -表示路径
      -方法 path.resolve() 直接调用返回当前目录
      // D:\develop\javascript-byesame\2407
      // D:\develop\javascript-byesame\2407\09-node\04核心模块
      // 注意：不同方式执行代码 工作目录可能会发生变化

      -如果将相对路径作为参数传入，会转换成绝对路径

      -一般情况下，会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数，这样就会计算出最终路径
*/

const path = require("node:path");

// const res = path.resolve("D:\\develop\\javascript-byesame\\2407\\09-node\\04核心模块","./liu.txt")
// __dirname 获取当前模块的路径
const res = path.resolve(__dirname, "./liu.txt");
console.log(res);
