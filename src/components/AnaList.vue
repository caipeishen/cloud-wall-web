<template>
    <div>
        <!-- 广告提示 -->
        <a-row class="advert" type="flex" align="middle" justify="center">
            <a-col :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
                可以点一下文章评论区的广告支持我一下~
            </a-col>
        </a-row>
        <a-row class="apper" type="flex" align="middle" justify="center">
            <a-col  :xs="20" :sm="20" :md="20" :lg="13" :xl="13" >
                <!-- 列表的一条内容 -->
                <a-row v-for="(ana,index) in anaList" :key="index">
                    <a-row type="flex" justify="start" class="title">
                        <a-col :span="24" @click="toAnaDetail(ana)">
                            {{ana.anaTitle}}
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="start" class="content">
                        <a-col :span="24" v-if="ana.anaContent.length < 100">
                            {{ana.anaContent}}
                        </a-col>
                        <a-col :span="24" v-else>
                            {{ana.anaContent.substring(0,100)}}...
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="start" class="footer">
                        <a-col :span="24">
                            <span>{{dateDiff(ana.createDate)}}</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.commentNum}} 条评论</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.prizeNum}} 人喜欢</span>
                        </a-col>
                    </a-row>
                    <a-row type="flex" justify="start" class="bottom"></a-row>
                </a-row>
                <a-row style="margin:60px 0px 50px" type="flex" algin="center" justify="center" >
                    <template >
                        <a-pagination
                            :pageSizeOptions="pageSizeOptions"
                            :total="page.total"
                            showSizeChanger
                            :pageSize="page.pageSize"
                            v-model="page.current"
                            @showSizeChange="onShowSizeChange"
                        >
                        <template slot='buildOptionText' slot-scope='props'>
                            <span v-if="props.value!=='50'">{{props.value}}条/页</span>
                            <span v-if="props.value==='50'">全部</span>
                        </template>
                        </a-pagination>
                    </template>
                </a-row>
            </a-col>
        </a-row>
    </div>
    
</template>

<script>
import { getDateDiff } from '../utils/date'
export default {
    data(){ 
        return{
            anaList:this.$store.state.anaList || [],
            page:{current:1,pageSize:10,total:500},
            pageSizeOptions: ['10', '20', '30', '40', '50']
        }
    },
    mounted(){
        this.$store.dispatch("getAnaList",0);
    },
    methods:{
        //这里主要是我们在h5里面直接调方法，默认是调用该vue的，所以在这里声明一个变量，再将我们引用的放到这里面
        dateDiff:getDateDiff,
        toAnaDetail(ana){
            //跳到语录详情页，并将当前的语录传过去
            this.$router.push({name:'AnaDetail',params:ana});
        },
        onShowSizeChange(current, pageSize) {
            this.page.current = current;
            this.page.pageSize = pageSize;
            console.log(current+" "+pageSize);
        },
    }
}
</script>

<style scoped>
.advert{
    font-size: 14px;
    margin: 50px 0 20px 0px;
    padding: 10px 0;
    color: gray;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
}
.title{
    margin-top: 55px;
    font-size: 23px;
    font-weight: 700;
}
.title:hover{
    cursor: pointer;
    color: cornflowerblue
}
.content{
    margin: 30px 0px;
    line-height: 32px;
    color: #676F7A;
    font-size: 16px;
} 
.footer{
    margin: 50px 0px 0px;
}
.footer span{
    color: #BEC4CC;
}
.bottom{
    width: 100px;
    height: 1px;
    margin: 55px 0px 0px;
    border: 1px solid #454C56;
    transform: translateX(-50px);
}
</style>
