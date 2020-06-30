import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载模式
export default new Router({
  routes: [ 
    {
      path: '/',
      redirect:'AnaList/0'
    },
    {
      path: '/AnaList/:anaTypeId',
      name: 'AnaList',
      component: () => import('@/components/AnaList.vue')
    },{
      path: '/AnaDetail/:anaTypeId/:anaId',
      name: 'AnaDetail',
      component: () => import('@/components/AnaDetail.vue')
    },{
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/Login.vue')
    },{
      path: '/Register',
      name: 'Register',
      component: () => import('@/components/Register.vue')
    }
  ]
})
