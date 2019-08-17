<template>
    
    <!-- 内容的详情 -->
    <div>
        <a-row class="apper" type="flex" align="middle" justify="center">
            <a-col :xs="20" :sm="20" :md="20" :lg="9" :xl="9" >
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
                            <a-col v-if="anaUp!=null">
                                <span v-if="anaUp.anaTitle.length<10" class="otherSpan" @click="toAnaDetail(anaUp)">{{'« '+ anaUp.anaTitle}}</span>
                                <span v-else class="otherSpan" @click="toAnaDetail(anaUp)">{{'« '+ anaUp.anaTitle.substring(0,10)}}</span>
                            </a-col>
                            <a-col v-else>
                                <span class="otherSpan"></span>
                            </a-col>
                            <a-col v-if="anaDown!=null">
                                <span v-if="anaDown.anaTitle.length<10" class="otherSpan" @click="toAnaDetail(anaDown)">{{anaDown.anaTitle+' »'}}</span>
                                <span v-else class="otherSpan" @click="toAnaDetail(anaDown)">{{anaDown.anaTitle.substring(0,10)+' »'}}</span>
                            </a-col>
                            <a-col v-else>
                                <span class="otherSpan"></span>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row style="margin:50px 0px">
                    <p style="font-size:21px;font-weight:bold;">发表评论</p>
                    <p style="font-size:15px">评论</p>
                    <p><textarea v-model="commentContent" style="width:100%;height:120px;border:1px solid gainsboro"/></p>
                    <p><input @click="commentHandle()" class="comment" value="发表评论" readonly /></p>
                </a-row>
            </a-col>
        </a-row>
        <Footer />
    </div>

</template>

<script>

import { mapState } from 'vuex'
import Footer from '@/components/Footer'

import { getAnaUp,getAnaDown} from '@/api/ana'
import { getCommentList,addComment} from '@/api/comment'
 
export default {
    components:{
        Footer
    },
    data(){
        return{
            anaTypeId:this.$route.params.anaTypeId,
            anaUp:null,
            anaDown:null,
            commentContent:'',
            commentData:null
        }
    },
    computed:mapState({
        ana:state => state.ana
    }),
    created(){
        let _this = this;
        getAnaUp({"anaId":_this.ana.id}).then(res=>{
            _this.anaUp = res.data;
        })
        getAnaDown({"anaId":_this.ana.id}).then(res=>{
            _this.anaDown = res.data;
        })
        getCommentList().then(res =>{
            _this.commentData = res.data;
        })
    },
    methods:{
        toAnaDetail(ana){
            this.$store.state.ana = ana;
            this.$router.push({name:"AnaDetail",params:{"anaTypeId":this.anaTypeId,"anaId":ana.id}});
        },
        commentHandle(){
            let _this = this;
            if(!this.commentContent ){
                this.$notification.open({
                    message: '消息',
                    description: '请输入评论内容',
                    icon: <a-icon type="frown" style="color: #FAAD14" />,
                });
            }else if(this.$store.state.user==null){
                this.$notification.open({
                    message: '消息',
                    description: '请先登录，再进行评论!',
                    icon: <a-icon type="frown" style="color: #FAAD14" />,
                });
            }else{
                addComment({"anaId":this.$store.state.ana.id,"userId":this.$store.state.user.id,"commentContent":this.commentContent}).then(res =>{
                    console.log(res);
                    if(res.code==200){
                        _this.$notification.open({
                            message: '消息',
                            description: '评论成功',
                            icon: <a-icon type="smile" style="color: #108ee9" />,
                        });
                    }
                })
            }
        },
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
.comment{
    width: 100%;
    cursor: pointer;
    text-align:center;
    padding:8px;
    color:black;
    border:1px solid gainsboro;
}
</style>
