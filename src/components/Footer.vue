<template>
    <div class="apper">
        <!-- 底部横线 -->
        <a-row style="border-top:1px solid gainsboro;"></a-row>
        <a-row class="footer" type="flex" align="middle" justify="center" >
            <a-col :xs="20" :sm="20" :md="20" :lg="9" :xl="9" >
                <a-row class="footerTop" type="flex" align="middle" justify="center" :gutter="{ xs: 8, sm: 8, md: 16, lg: 16 }">
                    <a-col >登录</a-col>·
                    <a-col >注册</a-col>·
                    <a-col >友链</a-col>·
                    <a-col >归档</a-col>·
                    <a-col >投稿</a-col>·
                    <a-col >关于</a-col>
                </a-row>
                <a-row class="footerBottom" type="flex" align="middle" justify="space-between">
                    <a-col>© 2019 网易云热评墙</a-col>
                    <a-col>Theme by 年少有为</a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>

</template>

<script>
export default {

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
</style>
