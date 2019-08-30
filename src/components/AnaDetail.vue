<template>
    
    <!-- 内容的详情 -->
    <div>
        <a-row class="apper" type="flex" align="middle" justify="center">
            <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
                <a-row type="flex" justify="start" class="content">
                    <a-col>
                        {{ana.anaContent}}
                    </a-col>
                </a-row>
                <a-row><br/></a-row>
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
                <!-- <a-row v-if="commentData.list!=null">
                    <p class="commentTitle">99+条回应：{{ana.anaTitle}}</p>
                    <a-list
                        class="comment-list"
                        itemLayout="horizontal"
                        :dataSource="commentData.list"
                    >
                        <a-list-item slot="renderItem" slot-scope="item, index">
                            <a-comment :author="item.userName" :avatar="item.userName">
                                
                                <p slot="content">{{item.commentContent}}</p>
                                <a-tooltip slot="datetime" :title="item.createDate.format('YYYY-MM-DD HH:mm:ss')">
                                    <span>{{item.createDate.fromNow()}}</span>
                                </a-tooltip>
                            </a-comment>
                        </a-list-item>
                    </a-list>
                </a-row> -->
                <a-row v-if="commentList!=null && commentList.length!=0">
                    <p class="commentTitle">{{commentPage.total}}条回应：『　{{ana.anaTitle}}　』 </p>
                    <a-list
                        class="comment-list"
                        itemLayout="horizontal"
                        :dataSource="commentList"
                    >
                        <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-comment :author="item.userNickName" :avatar="'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'" >
                            <p slot="content" style="margin-top:10px">{{item.commentContent}}</p>
                            <a-tooltip slot="datetime" :title="moment(item.createDate).format('lll')">
                                <span>{{getDateDiff(item.createDate)}}</span>
                            </a-tooltip>
                        </a-comment>
                        </a-list-item>
                    </a-list>
                    <a-row v-show="commentList!=null" type="flex" align="middle" justify="center" style="margin:20px 0px">
                        <a-pagination
                            simple
                            size="small"
                            width="100%"
                            @change="onChange"
                            v-model="commentPage.current"
                            :pageSize="commentPage.pageSize"
                            :total="commentPage.total"
                        />
                    </a-row>
                </a-row>
                <a-row style="margin:30px 0px 50px">
                    <p style="font-size:21px;font-weight:bold;">发表评论</p>
                    <p style="font-size:15px">评论</p>
                    <p><textarea v-model="commentContent" style="width:100%;height:120px;border:1px solid gainsboro"/></p>
                    <p><input @click="commentHandle()" class="comment" value="发表评论" readonly /></p>
                </a-row>
            </a-col>
        </a-row>
        <Footer v-if="ana!=null"/>
    </div>

</template>

<script>

import moment from 'moment'
import { getDateDiff } from '@/utils/date'
import { mapState } from 'vuex'

import Footer from '@/components/Footer'

import ana from '@/api/ana'
import comment from '@/api/comment'

 
export default {
    components:{
        Footer
    },
    data(){
        return{
            moment,
            anaId:this.$route.params.anaId,
            anaTypeId:this.$route.params.anaTypeId,
            anaUp:null,
            anaDown:null,

            commentContent:null,
            commentList:null,
            commentPage:{current: 1,pageSize: 10,total:0},
        }
    },
    computed:mapState({
        ana:state => state.ana,
        user:state => state.user,
        prizeList:state => state.prizeList
    }),
    mounted(){
        scroll(0,0);//回到顶部
        let _this = this;
        if(this.ana.anaTitle=='网易云热评墙'){
            console.log('加载数据');
            ana.getAnaInfo({"userId":this.user==null?0:this.user.id,"anaId":this.anaId,"anaTypeId":this.anaTypeId}).then(res=>{
                _this.$store.state.ana = res.data;
            })
        }
        // 上条记录
        ana.getAnaUp({"userId":this.user==null?0:this.user.id,"anaId":this.anaId,"anaTypeId":this.anaTypeId}).then(res=>{
            _this.anaUp = res.data;
        })
        // 下条记录
        ana.getAnaDown({"userId":this.user==null?0:this.user.id,"anaId":this.anaId,"anaTypeId":this.anaTypeId}).then(res=>{
            _this.anaDown = res.data;
        })
        // 评论列表
        this.getCommentList();
        // 初始化是否点过赞
        console.log(this.anaId);
        console.log(this.prizeList);
        this.prizeList.find(id => {
            if(id == this.anaId){
                this.$store.state.ana.isPrize = 1;
            }
        });
    },
    methods:{
        getDateDiff,
        toAnaDetail(ana){
            this.$store.state.ana = ana;
            this.$router.push({name:"AnaDetail",params:{"anaTypeId":this.anaTypeId,"anaId":this.ana.id}});
        },
        getCommentList(){
            // 评论列表
            let _this = this;
            comment.getCommentList({"anaId":this.anaId,"current":this.commentPage.current,"pageSize":this.commentPage.pageSize}).then(res =>{
                _this.commentList = res.data.list;
                _this.commentPage.total = res.data.total;
            })
        },
        onChange(current,pageSize){
            this.commentPage.current = current;
            this.commentPage.pageSize = pageSize;
            this.getCommentList();
        },
        commentHandle(){
            let _this = this;
            this.$notification.destroy();
            if(!this.commentContent){
                this.$notification.open({
                    message: '消息',
                    description: '请输入评论内容',
                    icon: <a-icon type="frown" style="color: #FAAD14" />,
                });
            }else if(this.user==null){
                this.$notification.open({
                    message: '消息',
                    description: '请先登录，再进行评论!',
                    icon: <a-icon type="frown" style="color: #FAAD14" />,
                });
            }else{
                comment.anaComment({"anaId":this.ana.id,"userId":this.user.id,"commentContent":this.commentContent}).then(res =>{
                    console.log(res);
                    if(res.code==200){
                        _this.commentContent = '';
                        _this.getCommentList();
                        _this.$notification.open({
                            message: '消息',
                            description: '评论成功',
                            icon: <a-icon type="smile" style="color: #108ee9" />,
                        });
                    }else{
                        _this.$notification.open({
                            message: '消息',
                            description: '评论失败',
                            icon: <a-icon type="smile" style="color: #F5222D" />,
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
    line-height: 32px;
    margin: 30px 0px;
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
.commentTitle{
    font-size: 22px;
    font-weight: bold;
    margin-top:50px;
}
</style>
