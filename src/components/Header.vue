<template>
    <div @click="isShowWeChat=false,isShowQQ=false,isShowMobile=false,isShowPayment=false">
      <a-row type="flex" align="middle" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
          <a-row type="flex" align="middle" justify="space-between">
              <a-col class="title">
                {{ana.anaTitle}}
              </a-col>
              <a-col class="nav" style="margin-top:10px;font-size:14px;" >
                  <a-row type="flex" align="middle" justify="space-between" :gutter="{ xs: 10, sm: 10, md: 20, lg: 20 }">
                    <a-col class="home" @click="homeHandle()">
                      <a-icon type="home" theme="filled"/>
                    </a-col>·
                    <a-col class="weChat" @click.stop="isShowWeChat=!isShowWeChat,isShowQQ=false,isShowMobile=false,isShowPayment=false">
                      <span><a-icon type="wechat" theme="filled" /></span>
                      <span v-if="isShowWeChat" class="relationImg">
                        <span><img style="width:130px;margin-bottom:5px;" src="@/assets/weChat.jpg"/></span>
                      </span>
                    </a-col>·
                    <a-col class="qq" @click.stop="isShowQQ=!isShowQQ,isShowWeChat=false,isShowMobile=false,isShowPayment=false">
                      <span><a-icon type="qq" /></span>
                      <span v-if="isShowQQ" class="relationImg">
                        <span><img style="width:130px;margin-bottom:5px;" src="@/assets/qq.jpg"/></span>
                      </span>
                    </a-col>
                  </a-row>
              </a-col>
          </a-row>
          <a-row type="flex" align="middle" :gutter="{ xs: 10, sm: 10, md: 13, lg: 13 }">
            <a-col 
              v-for="(anaType,index) in anaTypeList" 
              :key="index" 
              @click="anaTypeHandle(anaType.id)"
            >
              <a-row type="flex" align="middle" justify="space-between" :gutter="{ xs: 8, sm: 8, md: 13, lg: 13 }">
                <a-col :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']">{{anaType.anaTypeName}}</a-col>
                <a-col>{{anaTypeList.length-1==index?"":"·"}}</a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!-- 顶部导航 -->
      <a-row v-show="isShowNav" class="fixNavTop" type="flex" justify="center">
        <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
            <a-row type="flex" align="middle" justify="space-between"  >
                <a-col class="fixNavTitle">网易云热评墙</a-col>
                <a-col :xs="1" :sm="1" :md="9" :lg="9"></a-col>
                <a-col 
                  v-show="isPc" 
                  v-for="(anaType,index) in anaTypeList" 
                  :key="index" 
                  @click="anaTypeHandle(anaType.id)"
                >
                  <a-row type="flex" align="middle" justify="space-between" :gutter="{ xs: 8, sm: 8, md: 10, lg: 10 }">
                    <a-col :class="['fixNav',anaTypeId==anaType.id ? 'active' : '']" >{{anaType.anaTypeName}}</a-col>
                    <a-col>{{anaTypeList.length-1==index?"":"·"}}</a-col>
                  </a-row>
                </a-col>
            </a-row>
        </a-col>
      </a-row>

      <!-- 广告提示 -->
      <a-row class="advert" type="flex" align="middle" justify="center">
          <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
            <a-row v-if="ana.anaTitle=='网易云热评墙'">
              可以点一下文章评论区的广告支持我一下~
            </a-row>
            <a-row v-else type="flex" align="middle" justify="space-between">
              <a-row type="flex" align="middle" justify="space-between" :gutter="10">
                <a-col><a-icon type="clock-circle"/>&nbsp;{{getDateDiff(ana.createDate)}}</a-col>
                <a-col>/</a-col>
                <a-col><a-icon type="align-left"/>&nbsp;{{ana.commentNum}} 评</a-col>
                <a-col>/</a-col>
                <a-col @click="prizeHandle()" style="cursor: pointer;">
                  <a-col v-if="ana.isPrize==0"><a-icon type="like"/>&nbsp;{{ana.prizeNum}} 赞</a-col>
                  <a-col v-else style="color:coral"><a-icon type="like" theme="filled"/>&nbsp;{{ana.prizeNum}} 赞</a-col>
                </a-col>
              </a-row>
              <a-row class="ma" type="flex" align="middle" justify="space-between" :gutter="10">
                <a-col @click.stop="isShowMobile=!isShowMobile,isShowPayment=false,isShowWeChat=false,isShowQQ=false">
                  <span v-if="!isShowMobile" style="color:green"><a-icon type="scan"/>&nbsp;码</span>
                  <span v-else>
                    <span style="color:green"><a-icon type="qrcode"/>&nbsp;码</span>
                    <span class="maImg">
                      <span><img style="width:130px;margin-bottom:5px;" src="@/assets/cloud-wall.png"/></span>
                      <span style="color:#65CD91;font-size:11px;">移动设备上继续阅读</span>
                    </span>
                  </span>
                </a-col>
                <a-col @click.stop="isShowPayment=!isShowPayment,isShowMobile=false,isShowWeChat=false,isShowQQ=false">
                  <span v-if="!isShowPayment" style="color:coral;"><a-icon type="pay-circle"/>&nbsp;赏</span>
                  <span v-else>
                    <span style="color:coral;"><a-icon type="pay-circle" theme="filled"/>&nbsp;赏</span>
                    <span class="maImg">
                      <span><img style="width:130px;margin-bottom:5px;" src="@/assets/Payment.jpg"/></span>
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
      isShowMobile:false,
      isShowPayment:false,
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    // 点击其他地方隐藏二维码，但有一个弊端，就是点击头部的时候，不会隐藏，
    //又采用了另一种 .stop 事件
    //给最外层的div加个点击事件 @click="userClick=false"
　　//给点击的元素上面加上 @click.stop="userClick=!userClick"
    window.addEventListener('click',e=>{ 
      if(!this.$el.contains(e.target)) {
        this.isShowWeChat = false;
        this.isShowQQ = false;
        this.isShowMobile = false;
        this.isShowPayment = false;
      }
    });
  },
  computed:mapState({
    ana: state => state.ana,
    user: state => state.user,
    anaTypeId: state => state.anaTypeId,
    anaTypeList: state => state.anaTypeList,
    prizeList: state => state.prizeList
  }),
  methods:{
    getDateDiff,
    homeHandle(){
      location.href="http://www.nianshaoyouwei.club";
    },
    anaTypeHandle(anaTypeId,event){
      this.$store.state.anaData = null;
      this.$store.state.anaTypeId = anaTypeId;
      this.$store.state.ana = {anaTitle:'网易云热评墙'}
      // 这里一定要添加params 不然相同组件,相同路径不会跳转
      this.$router.push({name:'AnaList',"params":{"anaTypeId":anaTypeId}});
    },
    prizeHandle(){
      let _this = this;
      // 用户未登录
      if(this.user==null){
        if(this.ana.isPrize==0){
          this.ana.isPrize++;
          this.prizeList.push(this.ana.id);
          localStorage.setItem("prizeList",JSON.stringify(this.prizeList));
        }else{
          this.$notification.destroy();
          this.$notification.open({
            message: '消息',
            description: '点多了伤身体~',
            icon: <a-icon type="frown" style="color: #FAAD14" />,
          });
        }
      // 用户登陆  
      }else{
        if(this.ana.isPrize == 0){
          this.ana.isPrize++;
          /** 发送数据库请求点赞 */
        }else{
          this.$notification.destroy();
          this.$notification.open({
              message: '消息',
              description: '点多了伤身体~',
              icon: <a-icon type="frown" style="color: #FAAD14" />,
          });
        }
      }
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
    font-size: 24px;
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

  /* 固定导航栏 */
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
  /* 广告 */
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
    z-index:998;
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
