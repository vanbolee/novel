import Vue from "vue";
import axios from "./plugins/axios";
import "./cube-ui";
import App from "./App.vue";
import "./assets/font/iconfont.css";
import router from "./router";
import store from "./store";
import FastClick from "fastclick";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

FastClick.attach(document.body);

Vue.use(VueLazyload);

Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = binding.value;
  }
});

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
