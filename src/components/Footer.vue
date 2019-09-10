<template>
    <div class="apper">
        <!-- 底部横线 -->
        <a-row style="border-top:1px solid gainsboro;"></a-row>
        <a-row class="footer" type="flex" align="middle" justify="center" >
            <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
                <a-row class="footerTop" type="flex" align="middle" justify="center" :gutter="{ xs: 12, sm: 12, md: 16, lg: 16 }">
                    <a-col v-if="user!=null" class="loginOut" @click="loginOut">退出</a-col>
                    <a-col v-else class="login" @click="loginVisible=true">登录</a-col>·
                    <a-col class="register" @click="registerVisible=true">注册</a-col>·
                    <a-col class="mine" @click="mineHandle"> 我 </a-col>·
                    <a-col class="publish" @click="publishHandle">发布</a-col>·
                    <a-col class="youLian" @click="homeHandle">友链</a-col>
                </a-row>
                <a-row class="footerBottom" type="flex" align="middle" justify="space-between">
                    <a-col>© 2019 网易云热评墙</a-col>
                    <a-col>Theme by 年少终有为</a-col>
                </a-row>
            </a-col>
        </a-row>
        <!-- 这里加 v-if 是位了让 封装的附件不先加载，等点击再加载 -->
        <a-row v-if="loginVisible">
            <Login :visible.sync="loginVisible"/>
        </a-row>
        <a-row v-if="registerVisible">
            <Register :visible.sync="registerVisible"/>
        </a-row>
        <a-row v-if="mineVisible">
            <Mine :visible.sync="mineVisible"/>
        </a-row>
        <a-row v-if="publishVisible">
            <Publish :visible.sync="publishVisible"/>
        </a-row>
    </div>

</template>

<script>
import Login from '@/components/Login'
import Register from '@/components/Register'
import Mine from '@/components/Mine'
import Publish from '@/components/Publish'

import { mapState } from 'vuex'
import myStorage from '@/utils/myStorage'

export default {
    components:{
        Login,Register,Mine,Publish
    },
    data(){
        return{
            loginVisible:false,
            registerVisible:false,
            mineVisible:true,
            publishVisible:false,
        }
    },
    computed:mapState({
        user : state => state.user
    }),
    methods:{
        mineHandle(){
            if(this.user==null){
                this.$notification.destroy();
                this.$notification.open({
                    message: '消息',
                    description: '请先登陆',
                    icon: <a-icon type="smile" style="color: #FAAD14" />,
                });
            }else{
                this.mineVisible=true
            }
        },
        publishHandle(){
            if(this.user==null){
                this.$notification.destroy();
                this.$notification.open({
                    message: '消息',
                    description: '请先登陆',
                    icon: <a-icon type="smile" style="color: #FAAD14" />,
                });
            }else{
                this.publishVisible=true
            }
        },
        out(){
            this.$store.state.user = null;
            myStorage.removeUserSession();
            this.$notification.open({
                message: '消息',
                description: '退出登录',
                icon: <a-icon type="smile" style="color: #108ee9" />,
            });
        },
        loginOut(){
            let _this = this;
            this.$confirm({
                width:500,
                okText:'确定',
                cancelText:'取消',
                title: '操作提示信息?',
                content: h => <div><p>确定退出登录吗?</p></div>,
                onOk() {
                    _this.out();
                },
                onCancel() {
                    //console.log('Cancel');
                },
                class: 'test',
            });
        },
        homeHandle(){
            this.$confirm({
                width:500,
                okText:'确定',
                cancelText:'取消',
                title: '操作提示信息?',
                content: h => <div><p>确定跳转到主页吗?</p></div>,
                onOk() {
                    location.href="http://www.nianshaoyouwei.club";
                },
                onCancel() {
                    //console.log('Cancel');
                },
                class: 'test',
            });
        },
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
    .loginOut,.login,.register,.publish,.youLian,.mine{
        cursor: pointer;
    }
</style>
