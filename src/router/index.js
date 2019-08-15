import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Home = () => import('@/components/Home.vue');
const Header = () => import('@/components/Header.vue');
const AnaList = () => import('@/components/AnaList.vue');
const AnaDetail = () => import('@/components/AnaDetail.vue');

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },{
      path: '/Header',
      name: 'Header',
      component: Header
    },{
      path: '/AnaList',
      name: 'AnaList',
      component: AnaList
    },{
      path: '/AnaDetail',
      name: 'AnaDetail',
      component: AnaDetail
    }
  ]
})
