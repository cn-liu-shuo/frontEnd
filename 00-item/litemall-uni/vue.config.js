/* 
	使用 npm 安装的组件，默认情况下 babel-loader 会忽略所有 node_modules 中的文件 ，导致条件编译失效，需要通过配置 vue.config.js 解决
 */
module.exports = {
   transpileDependencies: ['@dcloudio/uni-ui']
}