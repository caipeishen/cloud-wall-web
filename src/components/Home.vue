<template>
  <div>
    <div>
      <a-row type="flex" align="middle" justify="start">
          <a-col class="title">网易云热评墙</a-col>
      </a-row>
      <a-row type="flex" align="middle" justify="start" :gutter="{ xs: 12, sm: 12, md: 24, lg: 24 }">
          <a-col :class="['nav',anaType==0 ? 'active' : '']" @click="getViewBy(0)">首页</a-col>·
          <a-col :class="['nav',anaType==1 ? 'active' : '']" @click="getViewBy(1)">热评</a-col>·
          <a-col :class="['nav',anaType==2 ? 'active' : '']" @click="getViewBy(2)">短句</a-col>·
          <a-col :class="['nav',anaType==3 ? 'active' : '']" @click="getViewBy(3)">知乎</a-col>·
          <a-col :class="['nav',anaType==4 ? 'active' : '']" @click="getViewBy(4)">折腾</a-col>·
          <a-col :class="['nav',anaType==5 ? 'active' : '']" @click="getViewBy(5)">音乐</a-col>·
          <a-col :class="['nav',anaType==6 ? 'active' : '']" @click="getViewBy(6)">段子</a-col>·
          <a-col :class="['nav',anaType==6 ? 'active' : '']" @click="getViewBy(6)">关于</a-col>
      </a-row>
      <a-row type="flex" align="middle" justify="start">
          <a-col class="title">网易云热评墙</a-col>
      </a-row>
    </div>
    <a-row class="advert" type="flex" align="middle" justify="center">
          可以点一下文章评论区的广告支持我一下~
    </a-row>

    <div class="fixnavbox" style="display:none;">
      <a-row type="flex" align="middle" class="fixnav">
          <a-col :span="5" class="home">
              <p>网易云热评墙</p>
          </a-col>
          <a-col :span="2" :offset="9" class="navTitle navTitleFirst navTitleNow">
              <p @click="getViewBy(0)">首页</p>
          </a-col>
          <a-col :span="2" class="navTitle navTitleBefore">
              <p @click="getViewBy(1)">热评</p>
          </a-col>
          <a-col :span="2" class="navTitle navTitleBefore">
              <p @click="getViewBy(2)">短句</p>
          </a-col>
          <a-col :span="2" class="navTitle navTitleBefore">
              <p @click="getViewBy(3)">段子</p>
          </a-col>
          <a-col :span="2" class="navTitle navTitleBefore">
              <p @click="getViewBy(4)">关于</p>
          </a-col>
      </a-row>
    </div>
    <item-list v-for="(ana,index) in anaData" :ana="ana" :key="index" class="apper"/>

  </div>
</template>

<script>
import ItemList from './ItemList.vue';

export default {
  components:{
    ItemList
  },
  data(){
    return{
      anaType:-1,
      anaData:[
        {id:'1',userId:'1',typeId:'1',anaType:'热评',anaTitle:'人生总有那么一段大片大片空白的时光',anaContent:'人生总有那么一段大片大片空白的时光。你在等待，你在坚忍，你在静默。你在等一场春华秋实，你在等新一轮的春暖花开，你在等从未有过的雷霆万钧。这静默的日子有些长，有些闷，但是我也会等下去。我相信人的青春不止有一次，有时候，时光会给你额外的惊喜',anaFrom:'--来自网易云音乐《爱的故事.上集》',commentNum:20,prizeNum:120,createDate:'2018-03-24'},
        {id:'2',userId:'1',typeId:'2',anaType:'短句',anaTitle:'心动的开始',anaContent:'心动的开始 都是因为 一些非常小的细节 而结束 往往也是',anaFrom:'——匿名',commentNum:66,prizeNum:388,createDate:'2019-06-18'}
      ]
    }
  },
  mounted(){
    console.log(this.$route.params.name);
  },
  methods:{
    getViewBy(number,event){
      this.anaType = number;
      console.log(event);
    }
  }
}
</script>

// 不加 scoped 代表是公共的（每个模块都可以引用）
<style>
  .apper{
    animation: apper 0.75s;
    margin: 100px ;/* 这个到时候需要去掉，添加这个主要未为了展示效果 */
  }
  @keyframes apper{
    0%   {opacity: 0;transform:translateY(10px);}
    100% {opacity: 1;transform:translateY(0px);}
  }

</style>

// 私有的css
<style scoped>
.title{
  cursor: pointer;
  font-size: 25px;
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
  width: 100%;
  margin: 1rem 0rem 1rem -0.4rem;
  padding: 0.3rem 0;
  color: gray;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
</style>
