<template>
  <a-row class="main" type="flex" align="middle" justify="start">
    <a-col  :span="{ xs: 2, sm: 2, md: 4, lg: 4 }" style="background:red">
asdas
    </a-col>

    <a-col  :span="{ xs: 18, sm: 18, md: 16, lg: 16 }" >
      <Home/>
    </a-col>

    <a-col  :span="{ xs: 2, sm: 2, md: 4, lg: 4 }" style="background:red">
asdsa
    </a-col>
  </a-row>
</template>

<script>
import Home from '@/components/Home'

export default {
  components:{
    Home
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

<style>
  
</style>
