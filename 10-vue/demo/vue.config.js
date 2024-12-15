const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭严格模式
  lintOnSave: false,
  devServer: {
    // 自动启动浏览器
    open: true
  }
})
