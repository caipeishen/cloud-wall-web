<template>
    <div>
      <a-row type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="9" :xl="9" >
          <a-row type="flex" align="middle" justify="space-between">
              <a-col class="title">
                {{$store.state.ana.anaTitle}}
              </a-col>
              <a-col class="nav" style="margin-top:10px;font-size:14px;" >
                  <a-row type="flex" align="middle" justify="space-between" :gutter="{ xs: 10, sm: 10, md: 20, lg: 20 }">
                    <a-col class="home" @click="homeHandle()">
                      <a-icon type="home" theme="filled"/>
                    </a-col>·
                    <a-col class="weChat" @click="isShowWeChat=!isShowWeChat,isShowQQ=false">
                      <span><a-icon type="wechat" theme="filled" /></span>
                      <span v-if="isShowWeChat" class="relationImg">
                        <span><img style="width:130px;margin-bottom:5px;" src="@/assets/微信二维码.jpg"/></span>
                      </span>
                    </a-col>·
                    <a-col class="qq" @click="isShowQQ=!isShowQQ,isShowWeChat=false">
                      <span><a-icon type="qq" /></span>
                      <span v-if="isShowQQ" class="relationImg">
                        <span><img style="width:130px;margin-bottom:5px;" src="@/assets/QQ二维码.jpg"/></span>
                      </span>
                    </a-col>
                  </a-row>
              </a-col>
          </a-row>
          <a-row type="flex" align="middle" :gutter="{ xs: 10, sm: 10, md: 16, lg: 16 }">
            <a-col 
              v-for="(anaType,index) in anaTypeList" 
              :key="index" 
              :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']" 
              @click="anaTypeHandle(anaType.id)"
            >
              <!-- {{anaType.anaTypeName}} -->
                {{anaType.anaTypeName}}&nbsp;&nbsp;&nbsp;{{anaTypeList.length-1==index?"":"·"}}
            </a-col>
             <!--<a-col :class="['fixNav',anaTypeId==0 ? 'active' : '']" @click="anaTypeHandle(0)">首页</a-col>·
              <a-col :class="['fixNav',anaTypeId==1 ? 'active' : '']" @click="anaTypeHandle(1)">热评</a-col>·
              <a-col :class="['fixNav',anaTypeId==2 ? 'active' : '']" @click="anaTypeHandle(2)">短句</a-col>·
              <a-col :class="['fixNav',anaTypeId==3 ? 'active' : '']" @click="anaTypeHandle(3)">知乎</a-col>·
              <a-col :class="['fixNav',anaTypeId==4 ? 'active' : '']" @click="anaTypeHandle(4)">折腾</a-col>·
              <a-col :class="['fixNav',anaTypeId==5 ? 'active' : '']" @click="anaTypeHandle(5)">段子</a-col>·
              <a-col :class="['fixNav',anaTypeId==6 ? 'active' : '']" @click="anaTypeHandle(6)">关于</a-col> -->
          </a-row>
        </a-col>
      </a-row>

      <!-- 顶部导航 -->
      <a-row class="fixNavTop" v-show="isShowNav" type="flex" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="9" :xl="9" >
            <a-row type="flex" align="middle" justify="space-between"  >
                <a-col class="fixNavTitle">网易云热评墙</a-col>
                <a-col v-show="isPc" :xs="20" :sm="10" :md="5" :lg="5"></a-col>
                <a-col 
                  v-show="isPc" 
                  v-for="(anaType,index) in anaTypeList" 
                  :key="index" :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']" 
                  @click="anaTypeHandle(anaType.id)"
                >
                    {{anaType.anaTypeName}}&nbsp;&nbsp;&nbsp;&nbsp;{{anaTypeList.length-1==index?"":"·"}}
                </a-col>
                <!-- <a-col v-show="isPc" :offset="6" :class="['fixNav',anaTypeId==0 ? 'active' : '']" @click="anaTypeHandle(0)">首页</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==1 ? 'active' : '']" @click="anaTypeHandle(1)">热评</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==2 ? 'active' : '']" @click="anaTypeHandle(2)">短句</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==3 ? 'active' : '']" @click="anaTypeHandle(3)">知乎</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==4 ? 'active' : '']" @click="anaTypeHandle(4)">折腾</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==5 ? 'active' : '']" @click="anaTypeHandle(5)">段子</a-col>·
                <a-col v-show="isPc" :class="['fixNav',anaTypeId==6 ? 'active' : '']" @click="anaTypeHandle(6)">关于</a-col> -->
            </a-row>
        </a-col>
      </a-row>

      <!-- 广告提示 -->
      <a-row class="advert" type="flex" align="middle" justify="center">
          <a-col :xs="20" :sm="20" :md="20" :lg="9" :xl="9" >
            <a-row v-if="$store.state.ana.createDate==null">
              可以点一下文章评论区的广告支持我一下~
            </a-row>
            <a-row v-else type="flex" align="middle" justify="space-between">
              <a-row type="flex" align="middle" justify="space-between" :gutter="10">
                <a-col><a-icon type="clock-circle"/>&nbsp;{{dateDiff($store.state.ana.createDate)}}</a-col>
                <a-col>/</a-col>
                <a-col><a-icon type="align-left"/>&nbsp;{{$store.state.ana.commentNum}}评</a-col>
                <a-col>/</a-col>
                <a-col>
                  <a-col v-if="$store.state.ana.isPrize==0"><a-icon type="like"/>&nbsp;{{$store.state.ana.prizeNum}}赞</a-col>
                  <a-col v-else style="color:coral"><a-icon type="like" theme="filled"/>&nbsp;{{$store.state.ana.prizeNum}}赞</a-col>
                </a-col>
              </a-row>
              <a-row class="ma" type="flex" align="middle" justify="space-between" :gutter="10">
                <a-col @click="isShowMobile=!isShowMobile,isShowPayment=false">
                  <span v-if="!isShowMobile" style="color:green"><a-icon type="scan"/>&nbsp;码</span>
                  <span v-else>
                    <span style="color:green"><a-icon type="qrcode"/>&nbsp;码</span>
                    <span class="maImg">
                      <span><img style="width:130px;margin-bottom:5px;" src="@/assets/网易云热评墙二维码.png"/></span>
                      <span style="color:#65CD91;font-size:11px;">移动设备上继续阅读</span>
                    </span>
                  </span>
                </a-col>
                <a-col @click="isShowPayment=!isShowPayment,isShowMobile=false">
                  <span v-if="!isShowPayment" style="color:coral;"><a-icon type="pay-circle"/>&nbsp;赏</span>
                  <span v-else>
                    <span style="color:coral;"><a-icon type="pay-circle" theme="filled"/>&nbsp;赏</span>
                    <span class="maImg">
                      <span><img style="width:130px;margin-bottom:5px;" src="@/assets/支付宝收款二维码.jpg"/></span>
                    </span>
                  </span>
                </a-col>
              </a-row>
            </a-row>
          </a-col>
      </a-row>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDateDiff } from '@/utils/date'

export default {
  data(){
    var UA = navigator.userAgent;
    var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/)),
        isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/)),
        isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/)),
        isPC = !(isIphone || isAndroid || ipad);
    return{
      isPc:isPC,
      isShowWeChat:false,
      isShowQQ:false,
      isShowNav:false,
      anaTypeId:0,
      isShowMobile:false,
      isShowPayment:false,
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
  },
  computed:mapState({
    anaTypeList: state => state.anaTypeList
  }),
  methods:{
    dateDiff:getDateDiff,
    homeHandle(){
      location.href="http://www.nianshaoyouwei.club";
    },
    weChatHandle(){

    },
    qqHandle(){

    },
    anaTypeHandle(anaTypeId,event){
      this.anaTypeId = anaTypeId;
      this.$store.state.anaData = null;
      this.$store.state.ana = {anaTitle:'网易云热评墙'}
      // 这里一定要添加query 不然相同组件,相同路径不会跳转
      this.$router.push({name:'AnaList',"params":{"anaTypeId":anaTypeId}});
    },
    handleScroll(e) {
        //console.log(window.scrollY);
        if(window.scrollY > 180){
          this.isShowNav = true;
        }else{
          this.isShowNav = false;
        }
    },
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
    position: relative;
  }
  .home,.weChat,.qq{
    cursor: pointer;
  }
  .relationImg{
    z-index:999;
    position:absolute;
    background: white;
    top: 150%;
    left: -80%;
    padding: 15px;
    border: 1px solid gainsboro;
    box-shadow: 0px 0px 3px gainsboro;
    animation: ma 0.5s;
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
  .prize{
    cursor: pointer;
  }
  .ma{
    cursor: pointer;
    position: relative;
  }
  .maImg{
    z-index:999;
    position:absolute;
    background: white;
    top: 155%;
    left: -62%;
    padding: 15px;
    border: 1px solid gainsboro;
    box-shadow: 0px 0px 3px gainsboro;
    animation: ma 0.5s;
  }
  @keyframes ma{
    0%   {opacity: 0;transform:translateY(-20px);}
    100% {opacity: 1;transform:translateY(0px);}
  }
</style>
