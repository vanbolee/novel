module.exports = {
  publicPath: "./",
  assetsDir: "static",
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex"
    }
  },
  pwa: {
    themeColor: "#26A2FF",
    msTileColor: "#FFFFFF",
    appleMobileWebAppCapable: "yes"
  },
  devServer: {
    proxy: {
      //如需跨域请求多个域名，在此对象进行扩展即可
      "/api/chapter": {
        target: "http://chapter2.zhuishushenqi.com/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/api": {
        target: "http://api.zhuishushenqi.com/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
