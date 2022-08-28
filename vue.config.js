const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭代码检查
  lintOnSave: false,
  // 打包时不产生map文件
  productionSourceMap:false,
  // 配置代理服务器
  devServer: {
    proxy: {
      // '/api'为请求前缀
      '/api': {
        // target为请求路径
        target: 'http://gmall-h5-api.atguigu.cn',
        // changeOrigin控制访问的host值,默认值为true
        changeOrigin: true
      }
    }
  }
})
