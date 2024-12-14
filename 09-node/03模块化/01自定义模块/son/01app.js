/* 
    node 09
    es6 15,16

    在早期的网页中  没有实质的模块化规范

    在nodejs中， 默认支持的模块化规范是CommonJS

    CommonJS中，一个js文件就是一个模块

        -引入模块
            -使用require("./son/a.js") 引入模块
            -引入自定义的模块必须以 ./或者../开头
            -文件后缀名可以省略
                优先找js文件，js文件没有就找json文件

        -引入核心模块
            -直接写模块名即可


*/

let b = require("./son/b");
console.log(b); //{name: '孙悟空'}

let a = require("./son/a");
console.log(a);
console.log(a.name, a.age);

let path = require("path"); //node自带的模块
console.log(path);
