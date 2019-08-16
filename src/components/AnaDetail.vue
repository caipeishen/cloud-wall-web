<template>
    
    <!-- 内容的详情 -->
    <div>
        <a-row class="apper" type="flex" align="middle" justify="center">
            <a-col :xs="20" :sm="20" :md="20" :lg="11" :xl="11" >
                <a-row type="flex" justify="start" class="content">
                    <a-col>
                        {{ana.anaContent}}
                    </a-col>
                </a-row>
                <a-row type="flex" justify="end" class="form" v-show="ana.anaFrom">
                    <a-col>
                        <span>---&nbsp;&nbsp;{{ana.anaFrom}}</span>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="start">
                    <a-col :span="24">
                        <a-row type="flex" justify="space-between" align="middle" class="other">
                            <span class="otherSpan">{{anaUp!=null?'« '+ anaUp.anaTitle:''}}</span>
                            <span class="otherSpan">{{anaDown!=null?anaDown.anaTitle+' »':''}}</span>
                        </a-row>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>

</template>

<script>

import { mapState } from 'vuex'
import { getAnaUp,getAnaDown} from '@/api/ana'
 
export default {
    data(){
        return{
            anaUp:null,
            anaDown:null,
        }
    },
    computed:mapState({
        ana:state => state.ana
    }),
    mounted(){
        let _this = this;
        console.log();
        getAnaUp({"anaId":_this.ana.id}).then(res=>{
            console.log(res.data);
            _this.anaUp = res.data;
        })
        getAnaDown({"anaId":_this.ana.id}).then(res=>{
            console.log(res.data);
            _this.anaDown = res.data;
        })
    },
    methods:{
        
    }
}
</script>

<style scoped>

.content{
    margin-bottom: 40px;
    line-height: 32px;
    margin: 50px 0px 30px;
    font-size: 16px;
    color: #676F7A;
}
.form{
    margin-bottom: 40px;
    font-size: 17px;
    font-weight: bold;
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
