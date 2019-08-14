// 引入@babel/polyfill处理兼容 
import '@babel/polyfill'

//兼容性字体
import 'lib-flexible'
import Vue from "vue";
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import App from "./App";
import store from './store'
import router from './router'


Vue.use(Antd);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");

