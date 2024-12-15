# vue搭建流程

## 一、安装 vs code 并安装扩展

1、Vue - Official

2、Vue 2 Snippets

## 二、node

1、**安装 node**：检验自己的电脑是否安装 node，搜索 cmd 右键选择管理员模式，`node -v` 按下回车，如果安装过会返回版本号，没有安装过去官方下载安装即可。node 自带 npm 所以直接 `npm -v` 查看 npm 版本号。如果 npm 返回不了则执行下列操作：

**安装 npm 淘宝镜像**：搜索 cmd 右键选择管理员模式，为了避免 npm 安装依赖时间过长或资源不好，使用 cnpm 下载安装国内资源，安装 cnpm 操作：

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

或者安装中国 NPM 镜像：

`npm install -g cnpm --registry=https://registry.npmjs.org`

>cnpm 可以替换 npm，安装环境比 npm 要快。

## 三、vue-cli

1、**安装 Vue CLI**：Vue官网-生态系统-Vue CLI，搜索cmd右键选择管理员模式运行，脚手架指令 `npm install -g @vue/cli`，执行查看是否安装成功：`vue -V`。

>若出错执行如图所示操作。Win + X，选中 windows PowerShell（管理员）打开以下窗口。执行代码：`set-ExecutionPolicy RemoteSigned`。执行策略可帮助你防止执行不信任的脚本。
![](/10-vue/assets/00000001.png)

## 四、使用脚手架创建 vue2、vue3 项目

1、搜索 cmd 右键选择管理员模式，输入指令 `vue ui` 可视化或者输入指令 `vue create 项目名字`，回车配置选项，选中第三个手动自定义创建。
![](/10-vue/assets/00000002.png)

2、上下键移动，空格选择要用到的属性，按回车确认
![](/10-vue/assets/00000003.png)

3、选择 vue2.0 或者 vue3.0，按回车确认
![](/10-vue/assets/00000004.png)

4、是否使用历史路由，输入 y 回车确认
![](/10-vue/assets/00000005.png)

5、选择样式预处理器，选中第一个后回车确认
![](/10-vue/assets/00000006.png)

6、语法标准选择第一个，出现问题报错，按回车确认
![](/10-vue/assets/00000007.png)

7、什么时候检验代码，第一个保存的时候，第二个时刻检验，按回车确认
![](/10-vue/assets/00000008.png)

8、配置文件放在哪里，第一个放在文件里，第二个放在 json 文件里面，按回车确认
![](/10-vue/assets/00000009.png)

9、是否保存设置，保存下载再次创建不用重新配置
![](/10-vue/assets/00000010.png)

10、搭建成功之后 `cd 项目名` 进入项目目录，`npm run serve` 运行项目指令。在 **package.json** 文件中 **serve** 后面加上 ` --open`
![](/10-vue/assets/00000011.png)

>安装失败解决办法
卸载之后重新安装，如果还是失败，可能是 npm 有缓存，清理一下 npm 缓存，指令 `npm cache clean -f`。如果还是失败，可能是 vscode 默认不允许执行安装的插件，重新设置即可，设置执行： `set-ExecutionPolicy RemoteSigned`。

![](/10-vue/assets/00000012.png)

目录介绍：

【node_modules】项目依赖，项目一般在 git 上面，clone 之后一定先安装依赖，否则运行不了。执行命令 `npm install`

【src】操作部分

【assets】静态资源图片

【components】组件

【store】存放vuex

【router】路由配置

【views】主要页面

【App.vue】根组件

【main.js】入口文件

【package-lock.json】详细的配置参数

【package.json】项目配置文件

【.gitignore】忽略文件

【README.md】操作说明

## 五、安装 Vite 创建 vue3 项目

1、安装 Vite

`npm install -g create-vite-app`

2、使用 vite 创建

- vite 是一个由原型 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发。
- 它做到了**本地快速开发启动**在生产环境下基于 Rollup 打包。
    - 快速的冷启动，不需要等待打包操作；
    - 及时的热模块更新，替换性能和模块数据的解耦让更新飞起；
    - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

`npm init vite-app 项目名`

`cd 项目名称`

`npm install`

`npm run dev`