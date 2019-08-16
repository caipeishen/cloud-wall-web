<template>
    <div>
      <a-row type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
          <a-row type="flex" align="middle" justify="space-between">
              <a-col class="title" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                {{$store.state.ana.anaTitle}}
              </a-col>
              <a-col :offset="6" style="margin-top:10px;font-size:14px;" >
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
          <a-row type="flex" align="middle" :gutter="{ xs: 10, sm: 10, md: 16, lg: 16 }">
            <a-col 
              v-for="(anaType,index) in anaTypeList" 
              :key="index" 
              :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']" 
              @click="anaTypeClick(anaType.id)"
            >
              {{anaType.anaTypeName}}
                <!-- {{anaType.anaTypeName}}&nbsp;&nbsp;&nbsp;{{anaTypeList.length-1==index?"":"·"}} -->
            </a-col>
             <!--<a-col :class="['nav',anaTypeId==0 ? 'active' : '']" @click="anaTypeClick(0)">首页</a-col>·
              <a-col :class="['nav',anaTypeId==1 ? 'active' : '']" @click="anaTypeClick(1)">热评</a-col>·
              <a-col :class="['nav',anaTypeId==2 ? 'active' : '']" @click="anaTypeClick(2)">短句</a-col>·
              <a-col :class="['nav',anaTypeId==3 ? 'active' : '']" @click="anaTypeClick(3)">知乎</a-col>·
              <a-col :class="['nav',anaTypeId==4 ? 'active' : '']" @click="anaTypeClick(4)">折腾</a-col>·
              <a-col :class="['nav',anaTypeId==5 ? 'active' : '']" @click="anaTypeClick(5)">段子</a-col>·
              <a-col :class="['nav',anaTypeId==6 ? 'active' : '']" @click="anaTypeClick(6)">关于</a-col> -->
          </a-row>
        </a-col>
      </a-row>

      <!-- 顶部导航 -->
      <a-row class="fixNavTop" v-show="isShow" type="flex" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
            <a-row type="flex" align="middle" justify="space-between"  >
                <a-col class="fixNavTitle">网易云热评墙</a-col>
                <a-col v-show="isPc" :offset="7"></a-col>
                <a-col 
                  v-show="isPc" 
                  v-for="(anaType,index) in anaTypeList" 
                  :key="index" :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']" 
                  @click="anaTypeClick(anaType.id)"
                >
                    {{anaType.anaTypeName}}&nbsp;&nbsp;&nbsp;{{anaTypeList.length-1==index?"":"·"}}
                </a-col>
                <!-- <a-col v-show="isPc" :offset="6" :class="['fixNav',anaTypeId==0 ? 'active' : '']" @click="anaTypeClick(0)">首页</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==1 ? 'active' : '']" @click="anaTypeClick(1)">热评</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==2 ? 'active' : '']" @click="anaTypeClick(2)">短句</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==3 ? 'active' : '']" @click="anaTypeClick(3)">知乎</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==4 ? 'active' : '']" @click="anaTypeClick(4)">折腾</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==5 ? 'active' : '']" @click="anaTypeClick(5)">段子</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==6 ? 'active' : '']" @click="anaTypeClick(6)">关于</a-col> -->
            </a-row>
        </a-col>
      </a-row>

      <!-- 广告提示 -->
      <a-row class="advert" type="flex" align="middle" justify="center">
          <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
              可以点一下文章评论区的广告支持我一下~
          </a-col>
      </a-row>

    </div>
</template>

<script>
import { mapState } from 'vuex'

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
      anaTypeId:0
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
  },
  computed:mapState({
    anaTypeList: state => state.anaTypeList
  }),
  methods:{
    anaTypeClick(anaTypeId,event){
      this.anaTypeId = anaTypeId;
      this.$store.state.ana = {anaTitle:'网易云热评墙'}
      // 这里一定要添加query 不然相同组件,相同路径不会跳转
      this.$router.push({name:'AnaList',"query":{"anaTypeId":anaTypeId}});
    },
    handleScroll(e) {
        //console.log(window.scrollY);
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
    cursor: pointer;
    font-size: 15px;
  }
  div .active{
    color:blue;
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
    cursor: pointer;
  }
  .advert{
      font-size: 14px;
      margin: 50px 0 20px 0px;
      padding: 12px 0;
      color: grey;
      border-top: 1px solid gainsboro;
      border-bottom: 1px solid gainsboro;
  }
</style>
