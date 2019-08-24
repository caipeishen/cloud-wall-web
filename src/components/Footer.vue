<template>
    <div class="apper">
        <!-- 底部横线 -->
        <a-row style="border-top:1px solid gainsboro;"></a-row>
        <a-row class="footer" type="flex" align="middle" justify="center" >
            <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
                <a-row class="footerTop" type="flex" align="middle" justify="center" :gutter="{ xs: 8, sm: 8, md: 16, lg: 16 }">
                    <a-col v-if="$store.state.user!=null" class="loginOut" @click="loginOut">注销</a-col>
                    <a-col v-else class="login" @click="loginVisible=true">登录</a-col>·
                    <a-col class="register" @click="registerVisble=true">注册</a-col>·
                    <a-col class="youLian">友链</a-col>·
                    <a-col class="guiDang">归档</a-col>·
                    <a-col class="touGao">投稿</a-col>·
                    <a-col class="about">关于</a-col>
                </a-row>
                <a-row class="footerBottom" type="flex" align="middle" justify="space-between">
                    <a-col>© 2019 网易云热评墙</a-col>
                    <a-col>Theme by 年少有为</a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row>
            <Login :visible.sync="loginVisible"/>
        </a-row>
        <a-row>
            <Register :visible.sync="registerVisble"/>
        </a-row>
    </div>

</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
export default {
    components:{
        Login,Register
    },
    data(){
        return{
            loginVisible:false,
            registerVisble:false
        }
    },
    methods:{
        loginOut(){
            this.$store.state.user = null;
            sessionStorage.removeItem("userSession");
            this.$notification.open({
                message: '消息',
                description: '注销成功',
                icon: <a-icon type="smile" style="color: #108ee9" />,
            });
        }
    }
}
</script>

<style scoped>
    *{
        font-size: 14px;
    }
    .footer{
        width: 100%;
        height: 100px;
    }
    .footerTop{
        /* width: 740px; */
        height: 50px;
        border-bottom: 1px solid rgb(233, 230, 230);
        margin:0px auto;
        line-height: 50px;
    }
    .footerBottom{
        height: 50px;
    }
    .loginOut,.login,.register,.youLian,.guiDang,.touGao,.about{
        cursor: pointer;
    }
</style>
