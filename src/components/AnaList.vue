<template>
    <div>
        <a-row type="flex" align="middle" justify="center">
            <a-col :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
                <!-- 列表的一条内容 -->
                <a-row v-for="(ana,index) in anaList" :key="index">
                    <a-row type="flex">
                        <a-col @click="toAnaDetail(ana)" class="title">
                            {{ana.anaTitle}}
                        </a-col>
                    </a-row>
                    <a-row type="flex">
                        <a-col class="content" @click="toAnaDetail(ana)" v-if="ana.anaContent.length < 100" >
                            {{ana.anaContent}}
                        </a-col>
                        <a-col class="content" @click="toAnaDetail(ana)" v-else>
                            {{ana.anaContent.substring(0,100)}}...
                        </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" >
                        <a-col class="footer">
                            <span>{{getDateDiff(ana.createDate)}}</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.commentNum}} 条评论</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.prizeNum}} 人喜欢</span>
                        </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" class="bottom"></a-row>
                </a-row>
                <a-row v-if="anaList.length!=0" style="margin:60px 0px 50px" type="flex" align="middle" justify="center" >
                    <a-col :span="24" type="flex" align="middle" justify="center" >
                        <a-pagination
                            :pageSizeOptions="anaPageSizeOptions"
                            :total="anaPage.total"
                            showSizeChanger
                            :pageSize="anaPage.pageSize"
                            v-model="anaPage.current"
                            @change = "onChange"
                            @showSizeChange="onShowSizeChange"
                        >
                        <template slot='buildOptionText' slot-scope='props'>
                            <span v-if="props.value!=='anaPage.pages'">{{props.value}}条/页</span>
                        </template>
                        </a-pagination>
                    </a-col>
                </a-row>
                <!-- <a-row v-else style="margin:30px 0px 50px" type="flex" align="middle" justify="center" >
                    <a-col :span="24" type="flex" align="middle" justify="center" >
                        暂无内容
                    </a-col>
                </a-row> -->
            </a-col>
        </a-row>
        <a-row v-show="anaList.length!=0">
            <Footer />
        </a-row>
    </div>
    
</template>

<script>
import { getDateDiff } from '../utils/date'
import { mapState,mapActions } from 'vuex';
import Footer from '@/components/Footer'
import ana from '@/api/ana'

export default {
    components:{
        Footer
    },
    data(){ 
        return{
            anaTypeId:this.$route.params.anaTypeId || 1,
            anaList:[],
            anaPage:{current: 1,pageSize: 10,total:0},
            anaPageSizeOptions: ['10', '20', '30']
        }
    },
    mounted(){
        scroll(0,0)
        this.getAnaList();
    },
    methods:{
        getDateDiff,
        getAnaList(){
            let _this = this;
            ana.getAnaList({"userId":this.$store.state.user==null?0:this.$store.state.user.id,"anaTypeId":this.anaTypeId,"current":this.anaPage.current,"pageSize":this.anaPage.pageSize}).then(res=>{
                if(res.code==200){
                    _this.anaList = res.data.list;
                    _this.anaPage.total = res.data.total;
                }else{
                    _this.$notification.open({
                        message: '消息',
                        description: '获取数据失败，请刷新页面!',
                        icon: <a-icon type="smile" style="color: #F5222D" />,
                    });
                }
            });
        },
        toAnaDetail(ana){
            //跳到语录详情页，并将当前的语录传过去
            this.$store.state.ana = ana;
            this.$router.push({name:'AnaDetail',params:{"anaTypeId":this.anaTypeId,"anaId":ana.id}});
        },
        onChange(current, pageSize){
            scroll(0,0)
            let _this = this;
            this.anaPage.current = current;
            this.anaPage.pageSize = pageSize;
            this.getAnaList();
        },
        onShowSizeChange(current, pageSize) {
            scroll(0,0)
            this.anaPage.current = 1;
            this.anaPage.pageSize = pageSize;
            this.getAnaList();
        },
    }
}
</script>

<style scoped>
.title{
    margin-top: 45px;
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
    cursor: pointer;
    text-align: justify;
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
