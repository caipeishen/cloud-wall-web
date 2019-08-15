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
      
      <!-- 广告提示 -->
      <a-row class="advert" type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
            可以点一下文章评论区的广告支持我一下~
        </a-col>
      </a-row>

      <!-- 顶部导航 -->
      <a-row v-show="isShow" type="flex" align="middle" justify="center" style="background:red">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
          <a-affix >
            <a-row type="flex" align="middle" justify="start"  >
                <a-col  class="fixNavTitle">网易云热评墙</a-col>
                <a-col  :class="['nav',anaType==0 ? 'active' : '']" @click="getAnaList(0)">首页</a-col>·
                <a-col :class="['nav',anaType==1 ? 'active' : '']" @click="getAnaList(1)">热评</a-col>·
                <a-col :class="['nav',anaType==2 ? 'active' : '']" @click="getAnaList(2)">短句</a-col>·
                <a-col :class="['nav',anaType==3 ? 'active' : '']" @click="getAnaList(3)">知乎</a-col>·
                <a-col :class="['nav',anaType==4 ? 'active' : '']" @click="getAnaList(4)">折腾</a-col>·
                <a-col :class="['nav',anaType==5 ? 'active' : '']" @click="getAnaList(5)">段子</a-col>·
                <a-col :class="['nav',anaType==6 ? 'active' : '']" @click="getAnaList(6)">关于</a-col>
            </a-row>
          </a-affix>
        </a-col>
      </a-row>

    </div>
</template>

<script>

export default {
  data(){
    return{
      isShow:true,
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
      this.$store.dispatch("getAnaList",typeId);
    },
    handleScroll(e) {
        console.log(window.scrollY);
        if(window.scrollY > 200){
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
  .active{
    color:blue;
    cursor: pointer;
  }
  .advert{
    font-size: 14px;
    margin: 50px 0 20px 0px;
    padding: 10px 0;
    color: gray;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
  }
  .fixNav{
    background: red;
  }
  .fixNavTitle{
    font-size: 21px;
    font-weight: bold;
    color:rgba(0,0,0,0.8);
  }

</style>
