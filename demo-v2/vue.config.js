const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host:'localhost',
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
    proxy: {
      // '/api'会拦截axios请求中带有/api的请求
      "/api":{                                 
        target: 'http://ihrm.itheima.net/prod-api/',      // 后端接口的根目录
        // secure: true,                       // 如果是 https ,需要开启这个选项
        changeOrigin: true,                    // 是否跨域
        pathRewrite: {                         // 重写路径
            '^/api': ''
        }
      }
    },
  }
})
