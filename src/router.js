import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
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
    },
    {
      path: '/book',
      name: 'book',
      component: () => import(/* webpackChunkName: "book" */ './views/book.vue')
    },
    {
      path: '/read',
      name: 'read',
      component: () => import(/* webpackChunkName: "read" */ './views/read.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import(/* webpackChunkName: "ranking" */ './views/ranking.vue')
    }
  ]
})
