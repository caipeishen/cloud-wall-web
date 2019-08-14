<template>
    
    <!-- 列表的一条内容 -->
    <div class="footer">
        <a-row class="footerTop" type="flex" align="center">
            <a-col :span="2" class="footerTopFirst">登录</a-col>
            <a-col :span="2" class="footerTopBefore">注册</a-col>
            <a-col :span="2" class="footerTopBefore">友链</a-col>
            <a-col :span="2" class="footerTopBefore">归档</a-col>
            <a-col :span="2" class="footerTopBefore">投稿</a-col>
            <a-col :span="2" class="footerTopBefore">关于</a-col>
        </a-row>
        <a-row type="flex" class="footerBottom" justify="space-between">
            <a-col>© 2019 网易云热评墙</a-col>
            <a-col>The me by Adams</a-col>
        </a-row>
    </div>

</template>

<script>
import { getDateDiff } from '../utils/date'
export default {
    methods:{
        //这里主要是我们在h5里面直接调方法，默认是调用该vue的，所以在这里声明一个变量，再将我们引用的放到这里面
        dateDiff:getDateDiff,
        toItemDetail(){
            //跳到语录详情页，并将当前的语录传过去
            this.$router.push({name:'itemDetail',params:this.ana});
        }
    }
}
</script>

<style scoped>
    .footer{
        width: 100%;
        height: 100px;
        margin-top: 80px;
        border-top: 1px solid rgb(233, 230, 230);
    }
    .footerTop{
        /* width: 740px; */
        height: 50px;
        border-bottom: 1px solid rgb(233, 230, 230);
        margin:0px auto;
        line-height: 50px;
    }
    .footerTopBefore::before{
        content: '';
        width: 2px;
        height: 2px;
        display: block;
        float: left;
        background-color: #666;
        margin-right: 15px;
        margin-top: 25px;
    }
    .footerTopFirst::before{
        content: '';
        width: 2px;
        height: 2px;
        display: block;
        float: left;
        margin-right: 15px;
        margin-top: 25px;
    }
    .footerBottom{
        /* width: 740px; */
        margin:0px auto;
        line-height: 45px;
    }
</style>
