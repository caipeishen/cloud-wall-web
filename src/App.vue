<template>
  <div>
        <!-- 头部、主题内容、尾部 -->
        <router-view :key="$route.fullPath"/>  
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import user from '@/api/user'

export default {
  data(){
    var UA = navigator.userAgent;
    var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
        isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
        isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
        isPC = !(isIphone || isAndroid || ipad);
    return {
      isPC: isPC,
    }
  },
  mounted() {
    // 请求分类信息
    this.$store.dispatch("getAnaTypeList");
    let visit = JSON.parse(sessionStorage.getItem("visit"));
    if(!visit){
      setTimeout(function(){
        user.visit().then(res=>{
          if(res.code==200){
            console.log('访问成功!');
            sessionStorage.setItem("visit",true);
          }
        });
      },5000);
    }
    // 解决IE加 '#'号不跳链接
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      window.addEventListener(
        "hashchange",
        () => {
          let currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }

  }
 
};
</script>

<style>
  .apper{
    animation: apper 0.75s;
  }
  @keyframes apper{
    0%   {opacity: 0;transform:translateY(30px);}
    100% {opacity: 1;transform:translateY(0px);}
  }
</style>
