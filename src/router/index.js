import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const AnaList = () => import('@/components/AnaList.vue');
const AnaDetail = () => import('@/components/AnaDetail.vue');
const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      redirect:'AnaList/0'
    },
    {
      path: '/AnaList/:anaTypeId',
      name: 'AnaList',
      component: AnaList
    },{
      path: '/AnaDetail/:anaTypeId/:anaId',
      name: 'AnaDetail',
      component: AnaDetail
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
