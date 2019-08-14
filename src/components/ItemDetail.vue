<template>
    
    <!-- 内容的详情 -->
    <div style="max-width:720px;" class="apper">
        <a-row type="flex" justify="start" class="content">
            <a-col :span="24">
                {{ana.anaContent}}
            </a-col>
        </a-row>
        <a-row type="flex" justify="start" class="form">
            <a-col :span="24">
                <span>{{ana.anaFrom}}</span>
            </a-col>
        </a-row>
        <a-row type="flex" justify="start">
            <a-col :span="24">
                <a-row type="flex" justify="space-between" align="middle" class="other">
                    <span class="otherSpan">« 物是人非</span>
                    <span class="otherSpan">深渊 »</span>
                </a-row>
            </a-col>
        </a-row>
    </div>

</template>

<script>
export default {
    data(){
        return{
            ana:{}
        }
    },
    mounted(){
        //将传过来的语录对象赋值给 ana属性
        let ana = this.$route.params;
        if(ana == null || ana == ''){
            this.$router.push({name:'home'});
        }else{
            this.ana = this.$route.params;
        }
    },
    methods:{

    }
}
</script>

<style scoped>

.content{
    margin-bottom: 50px;
    line-height: 32px;
    margin: 50px 0px;
    font-size: 16px;
    color: #676F7A;
}
.form{
    margin-bottom: 50px;
    font-size: 16px;
    color: #676F7A;
}
.other{
    height: 50px;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
}
.otherSpan:hover{
    cursor: pointer;
    color: cornflowerblue
}
</style>
