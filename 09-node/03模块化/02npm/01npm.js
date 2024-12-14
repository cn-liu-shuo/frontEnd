/* 
    npm  NodeJs Package Manger  node包管理器

*/
// 配置npm镜像
//淘宝镜像 npm config set registry https://registry.npmmirror.com
// 官方镜像 npm config set registry https://registry.npmjs.org
// 查看当前镜像 npm config get registry

let loa = require("lodash");
console.log(loa);

// npm init 初始化包信息
// npm install 包名  ===》 简写  npm i
// npm i 回自动安装package的依赖的所有包
// npm i lodash@版本号  下载指定版本的包
// npm uninstall 包名  卸载包

// npm i 包名 -g 全局安装 安装到电脑上 不在node_mouldle里， package的依赖也没有
// npm i 包名 -D 安装在开发环境 devDependencies
// npm i 包名 -s 安装在生产环境中

// npm install的时候发生了什么
/* 
    1.将包下载到了node_modules目录下
    2.会在package.json文件的dependencies中添加了一个新属性
    "lodash": "^4.17.21"   ^表示匹配最新的版本4.X.X
    3.会自动添加 package-lock.json文件
        会帮助加速npm下载

*/

console.log("hello world");

/* 
    package.json -描述包信息的文件
    -每个node项目必须有
    name: 项目的名字
    version: 项目的版本， 
    第一个数字大版本更新，2版本可能不兼容1版本。
    第二个数字在当前版本做的一些小更新。
    最后一个数字是对当前版本的修复
    description：项目的描述
    main：入口文件
    scripts：调试命令 运行命令
    author： 作者
    license：证书
    keywords：关键字


*/
/* 
    上传npm包
    一定要切换官方镜像源
    1.npm init          初始化包
    2.npm login          登录
    3.npm publish          发布包

    删除包
    1.npm --force unpublish 包名@版本号

*/
const demo = require("qjw-0119");
console.log(demo.formJJ());
