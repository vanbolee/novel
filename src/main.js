import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
