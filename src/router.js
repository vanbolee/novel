import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ './views/test.vue')
    },
    {
      path: '/',
      name: 'shelf',
      component: () => import(/* webpackChunkName: "shelf" */ './views/shelf.vue')
    },
    {
      path: '/classify',
      name: 'classify',
      component: () => import(/* webpackChunkName: "classify" */ './views/classify.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/search.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import(/* webpackChunkName: "category" */ './views/category.vue')
    }
  ]
})
