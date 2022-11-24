const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    hot: true,
    hotOnly: true,
    inline: true
  },
  proxy: {
    '/api': {
      target: 'http://121.37.187.47:32081',
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  }
})
