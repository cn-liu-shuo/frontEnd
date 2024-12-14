setTimeout(() => {
  console.log(1);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(2);

/* 
    js是单线程 运行时遵循事件循环机制

    -调用栈 全局作用域的代码要放到栈里执行， 立即执行

    -任务队列
        任务队列 是将要执行的代码 调用栈的代码执行完毕之后，队列里的代码才会进入到栈中执行
    
        -js的两种任务队列
            微任务队列： Promise的回调函数  then catch  finally
            宏任务队列： 大部分的代码都去宏任务队列

    执行顺序： 调用栈 》 微任务队列 》 宏任务队列

    // nodejs和js的区别
    ECMA（nodejs js都有
    dom bom（js特有


*/

/* alt + shfit + A */
