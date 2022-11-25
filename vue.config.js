const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: true,
  devServer: {
    hot: true,
    https: false,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
})
