import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Home = () => import('@/components/Home.vue');
const ItemList = () => import('@/components/ItemList.vue');
const ItemDetail = () => import('@/components/ItemDetail.vue');

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      redirect:'Home'
    },{
      path: '/Home',
      name: 'Home',
      component: Home
    },{
      path: '/ItemList',
      name: 'ItemList',
      component: ItemList
    },{
      path: '/ItemDetail',
      name: 'ItemDetail',
      component: ItemDetail
    }
  ]
})
