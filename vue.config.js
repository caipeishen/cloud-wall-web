module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  assetsDir: 'static',
  devServer: {
		host: "0.0.0.0",
		port: 8000, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器  http://XXX.XXX.X.XX:7071/rest/XXX/ 
		hotOnly: true, // 热更新
  }
}
