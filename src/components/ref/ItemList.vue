<template>
    
    <!-- 列表的一条内容 -->
    <div >
        <div type="flex" justify="center" align="middle">
            <div class="anaList myItemListMove" v-for="(ana,index) in $store.state.anaList.slice(0,10)" :key="index">
            <a-row class="anaTitle">
                <a-col v-if="index>0">
                   <span @click="getAnaDetail(ana.id,{id:$store.state.anaList[index-1].id,anaTitle:$store.state.anaList[index-1].anaTitle},{id:$store.state.anaList[index+1].id,anaTitle:$store.state.anaList[index+1].anaTitle})">{{ana.anaTitle}}</span>
                </a-col>
                <a-col v-else>
                    <span @click="getAnaDetail(ana.id,{id:-1,anaTitle:''},{id:$store.state.anaList[1].id,anaTitle:$store.state.anaList[1].anaTitle})">{{ana.anaTitle}}</span>
                </a-col>
            </a-row>
            <a-row class="anaContent">
                <a-col :span="24" v-if="ana.anaContent.length < 100">
                    {{ana.anaContent}}
                </a-col>
                <a-col :span="24" v-else>
                    {{ana.anaContent.substring(0,100)}}...
                </a-col>
            </a-row>
            <a-row class="anaOther anaOtherBefore" type="flex" :gutter="25" v-if="index < 9">
                <a-col>{{ana.createDate}} 发布</a-col>
                <a-col class="before">{{ana.commentNum}}条评论</a-col>
                <a-col class="before">{{ana.prizeNum}}人喜欢</a-col>
            </a-row>
            <a-row class="anaOther" type="flex" :gutter="25" v-else>
                <a-col>{{ana.createDate}} 发布</a-col>
                <a-col class="before">{{ana.commentNum}}条评论</a-col>
                <a-col class="before">{{ana.prizeNum}}人喜欢</a-col>
            </a-row>
        </div>
        
        <a-row class="page" type="flex" justify="space-around">
            <a-col>
                <a-pagination showQuickJumper :defaultCurrent="2" :total="500" @change="onChange" />
            </a-col>
        </a-row>
        </div>
        
    </div>

</template>

<script>
import { getDateDiff } from '../utils/date'
import $ from 'jquery'
export default {
    mounted(){
        //初始化热评列表
        this.$store.dispatch('getAnaList',{condition:this.$route.params.condition,pageIndex:1})
    },
    methods:{
        getAnaDetail(id,lastAna,nextAna){
            this.$store.dispatch('getAnaDetail',{id,lastAna,nextAna})
            this.$router.push({name:'itemDetail'})
        }
    },
    watch: {
        // 对路由变化作出响应...
        '$route' (to, from) {
            if($('.anaList')[0].className.split(' ')[1] == 'myItemListMove'){
                $('.anaList').removeClass('myItemListMove')
                $('.anaList').addClass('myItemListMove1')
            }else{
                $('.anaList').removeClass('myItemListMove1')
                $('.anaList').addClass('myItemListMove')
            }
            this.$store.dispatch('getAnaList',{condition:this.$route.params.condition,pageIndex:1})
        }
    }
}
window.onscroll= function(){
    var t = document.documentElement.scrollTop||document.body.scrollTop;
    if(t>=200){
        $('.fixnavbox').css('display','block');
    }else{
        $('.fixnavbox').css('display','none');
    }
    
}
</script>

<style scoped>

    /* ---------------------------------热评列表 */
    .myItemListMove{
        animation: itemList 0.5s ease-out;
    }
    .myItemListMove1{
        animation: itemList1 0.5s ease-out;
    }
    .anaList{
        /* width: 740px; */
        margin: 0px auto;
        margin-top: 50px;
    }
    @keyframes itemList{
        0% {
            opacity: 0;
            margin-top: 90px;
        }
        100%{
            opacity: 1;
            margin-top: 50px;
        }
    }
    @keyframes itemList1{
        0% {
            opacity: 0;
            margin-top: 90px;
        }
        100%{
            opacity: 1;
            margin-top: 50px;
        }
    }
    .anaTitle{
        font-size: 22px;
        font-family: 'STHeiti';
        font-weight: bolder;
        letter-spacing: 1px;
        color: black;
        opacity: 0.7;
        margin-bottom: 35px;
    }
    .anaTitle span:hover{
        cursor: pointer;
        color: rgb(2, 38, 158);
    }
    .anaContent{
        font-size: 16px;
        opacity: 0.8;
        line-height: 35px;
    }
    .anaOther{
        margin-top: 35px;
        opacity: 0.55;
        font-size: 14px;
    }
    .anaOtherBefore::after{
        content: '';
        width: 80px;
        height: 2px;
        background-color: black;
        margin-top: 80px;
        margin-left: -360px;
    }
    .before::before{
        content: '';
        width: 2px;
        height: 2px;
        display: block;
        float: left;
        background-color: #666;
        margin-right: 20px;
        margin-top: 12px;
    }

    /* ---------------------------------分页 */
    .page{
        /* width: 740px; */
        width:80%;
        margin:0px auto;
        margin-top: 90px;
    }
</style>
