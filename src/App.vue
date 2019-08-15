<template>
  <div>

    <!-- 头部 -->
    <!-- <a-row type="flex" align="middle" justify="center">
      <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" > -->
        <Header/>
      <!-- </a-col>
    </a-row> -->
    


    
    <!-- 内容显示 -->
    <!-- <a-row class="apper" type="flex" align="middle" justify="center">
      <a-col  :xs="20" :sm="20" :md="20" :lg="13" :xl="13" > -->
        <router-view class="apper"/>  
      <!-- </a-col>
    </a-row> -->

     <!-- 底部横线 -->
    <!-- <a-row class="apper" style="border-top:1px solid gainsboro;"></a-row> -->

    <!-- 底部 -->
    <!-- <a-row class="apper" type="flex" align="middle" justify="center">
      <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" > -->
        <Footer class="apper"/>
      <!-- </a-col>
    </a-row> -->

  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  data(){
    var UA = navigator.userAgent;
    var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
        isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
        isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
        isPC = !(isIphone || isAndroid || ipad);
    return {
      isPC: isPC
    }
  },
  components:{
    Header,Footer
  },
  mounted() {
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

<style scoped>
  .apper{
    animation: apper 0.75s;
  }
  @keyframes apper{
    0%   {opacity: 0;transform:translateY(30px);}
    100% {opacity: 1;transform:translateY(0px);}
  }
</style>
