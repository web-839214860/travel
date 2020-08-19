module.exports = {
    devServer: {
      host:"localhost",//要设置当前访问的ip 否则失效
      open: true, //浏览器自动打开页面
      proxy: {
          '/api': {
          target: 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
        }
      }
    },
    //配置网页title
    chainWebpack: (config) => {
      config
        .plugin('html')
        .tap((args) => {
          args[0].title = '后台管理系统';
          return args;
        });
    }
}