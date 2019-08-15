import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const AnaList = () => import('@/components/AnaList.vue');
const AnaDetail = () => import('@/components/AnaDetail.vue');

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'AnaList',
      component: AnaList
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
