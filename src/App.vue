<template>
  <div>
        <Header/>
        <router-view class="apper" :key="$route.fullPath"/>  
        <Footer class="apper"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { mapActions } from 'vuex'
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
  components:{
    Header,Footer
  },
  mounted() {
    this.getAnaTypeList();
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
  },
  methods:{
    ...mapActions(['getAnaTypeList']),
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
