const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");

module.exports = {
  publicPath: "./",
  assetsDir: "static",
  css: {
    extract: true,
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
    },
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/skeleton.js")
          }
        },
        minimize: true,
        quiet: true,
        router: {
          mode: "hash",
          routes: [
            {
              path: "/",
              skeletonId: "SkeletonIndex"
            }
          ]
        }
      })
    ]
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
