<template>
    <div>
        <a-row class="apper" type="flex" align="middle" justify="center">
            <a-col v-if="anaData!=null" :xs="20" :sm="20" :md="20" :lg="12" :xl="12" >
                <!-- 列表的一条内容 -->
                <a-row v-show="anaData!=null" v-for="(ana,index) in anaData.list" :key="index">
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
                            <span>{{dateDiff(ana.createDate)}}</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.commentNum}} 条评论</span>
                            <span>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                            <span>{{ana.prizeNum}} 人喜欢</span>
                        </a-col>
                    </a-row>
                    <a-row type="flex" align="middle" class="bottom"></a-row>
                </a-row>
                <a-row style="margin:60px 0px 50px" type="flex" align="middle" justify="center" >
                    <template >
                        <a-pagination
                            :pageSizeOptions="anaPageSizeOptions"
                            :total="anaData.total"
                            showSizeChanger
                            :pageSize="anaData.pageSize"
                            v-model="anaData.pageNo"
                            @change = "onChange"
                            @showSizeChange="onShowSizeChange"
                        >
                        <template slot='buildOptionText' slot-scope='props'>
                            <span v-if="props.value!=='anaData.pages'">{{props.value}}条/页</span>
                        </template>
                        </a-pagination>
                    </template>
                </a-row>
            </a-col>
        </a-row>
        <Footer v-if="anaData!=null" />
    </div>
    
</template>

<script>
import { getDateDiff } from '../utils/date'
import { mapState,mapActions } from 'vuex';
import Footer from '@/components/Footer'

export default {
    components:{
        Footer
    },
    data(){ 
        return{
            anaPageSizeOptions: ['10', '20', '30']
        }
    },
    computed:mapState({
        anaTypeId: state => state.anaTypeId,
        anaData: state => state.anaData
    }),
    mounted(){
        this.getAnaList({"anaTypeId":this.anaTypeId});
    },
    methods:{
        ...mapActions(['getAnaList']),
        //这里主要是我们在h5里面直接调方法，默认是调用该vue的，所以在这里声明一个变量，再将我们引用的放到这里面
        dateDiff:getDateDiff,
        toAnaDetail(ana){
            //跳到语录详情页，并将当前的语录传过去
            this.$store.state.ana = ana;
            this.$router.push({name:'AnaDetail',params:{"anaTypeId":this.anaTypeId,"anaId":ana.id}});
        },
        onChange(pageNo, pageSize){
            scroll(0,0)
            this.anaData.pageNo = pageNo;
            this.anaData.pageSize = pageSize;
            this.getAnaList({"anaTypeId":this.anaTypeId,"pageNo":this.anaData.pageNo,"pageSize":this.anaData.pageSize});
        },
        onShowSizeChange(pageNo, pageSize) {
            scroll(0,0)
            this.anaData.pageNo = 1;
            this.anaData.pageSize = pageSize;
            this.getAnaList({"anaTypeId":this.anaTypeId,"pageNo":this.anaData.pageNo,"pageSize":this.anaData.pageSize});
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
