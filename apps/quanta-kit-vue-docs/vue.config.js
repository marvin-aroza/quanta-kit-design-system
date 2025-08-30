const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // Only use publicPath in production/build
  publicPath: process.env.NODE_ENV === 'production' ? "/docs/vue/" : "/"
})
