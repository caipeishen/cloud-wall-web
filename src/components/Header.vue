<template>
    <div>
      <a-row type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
          <a-row type="flex" align="middle" justify="space-between">
              <a-col class="title" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                网易云热评墙
              </a-col>
              <a-col :offset="6" style="margin-top:10px" >
                  <a-row type="flex" align="middle" justify="center" :gutter="{ xs: 8, sm: 8, md: 16, lg: 16 }">
                    <a-col>
                      <a-icon class="home" type="home" theme="filled"/>
                    </a-col>·
                    <a-col>
                      <a-icon class="wechat" type="wechat" theme="filled" />
                    </a-col>·
                    <a-col>
                      <a-icon class="qq" type="qq" />
                    </a-col>
                  </a-row>
              </a-col>
          </a-row>
          <a-row type="flex" align="middle" justify="start" :gutter="{ xs: 10, sm: 10, md: 16, lg: 16 }">
              <a-col :class="['nav',anaType==0 ? 'active' : '']" @click="getAnaList(0)">首页</a-col>·
              <a-col :class="['nav',anaType==1 ? 'active' : '']" @click="getAnaList(1)">热评</a-col>·
              <a-col :class="['nav',anaType==2 ? 'active' : '']" @click="getAnaList(2)">短句</a-col>·
              <a-col :class="['nav',anaType==3 ? 'active' : '']" @click="getAnaList(3)">知乎</a-col>·
              <a-col :class="['nav',anaType==4 ? 'active' : '']" @click="getAnaList(4)">折腾</a-col>·
              <a-col :class="['nav',anaType==5 ? 'active' : '']" @click="getAnaList(5)">段子</a-col>·
              <a-col :class="['nav',anaType==6 ? 'active' : '']" @click="getAnaList(6)">关于</a-col>
          </a-row>
        </a-col>
      </a-row>
      

      <!-- 顶部导航 -->
      <a-row class="fixNavTop" v-show="isShow" type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
            <a-row type="flex" align="middle" justify="space-between"  >
                <a-col class="fixNavTitle">网易云热评墙</a-col>
                  <a-col v-show="isPc" :offset="6" :class="['fixNav',anaType==0 ? 'active' : '']" @click="getAnaList(0)">首页</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==1 ? 'active' : '']" @click="getAnaList(1)">热评</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==2 ? 'active' : '']" @click="getAnaList(2)">短句</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==3 ? 'active' : '']" @click="getAnaList(3)">知乎</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==4 ? 'active' : '']" @click="getAnaList(4)">折腾</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==5 ? 'active' : '']" @click="getAnaList(5)">段子</a-col>·
                  <a-col v-show="isPc" :class="['fixNav',anaType==6 ? 'active' : '']" @click="getAnaList(6)">关于</a-col>
            </a-row>
        </a-col>
      </a-row>
    </div>
</template>

<script>

export default {
  data(){
    var UA = navigator.userAgent;
    var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
        isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
        isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
        isPC = !(isIphone || isAndroid || ipad);
    return{
      isPc:isPC,
      isShow:false,
      anaType:-1
    }
  },
  mounted(){
    console.log(this.$route.params.name);
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
  },
  methods:{
    getAnaList(typeId,event){
      this.anaType = typeId;
      this.$router.push({name:'AnaList'});
      this.$store.dispatch("getAnaList",typeId);
    },
    handleScroll(e) {
        console.log(window.scrollY);
        if(window.scrollY > 180){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
    }
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
  }
}
</script>

<style scoped>
  .title{
    font-size: 23px;
    margin: 50px 0px 30px 0px;
    font-weight: bold;
    color:rgba(0,0,0,0.8);
  }
  .nav{
    font-size: 15px;
  }
  div .active{
    color:blue;
    cursor: pointer;
  }
  .fixNavTop{
    background: white;
    z-index: 999;
    position: fixed;
    top: 0px;
    width: 100%;
    padding: 8px 0px;
    border-bottom: 1px solid gainsboro;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1)
  }
  .fixNavTitle{
    font-size: 20px;
    font-weight: bold;
    color:rgba(0,0,0,0.8);
  }
  .fixNav{
    color:gray;
    font-size: 15px;
  }
</style>
