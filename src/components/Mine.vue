<template>
    <div>
      <a-modal
        title="~_~" 
        :visible="visible"
        footer="false"
        width="30%"
        destroyOnClose
        @cancel="handleCancel"
      >
      
        <a-row type="flex" align="top" justif="space-between">
          <a-col :span="23">
            <a-row type="flex" align="top" justif="start">
              <a-col :xs="4" :sm="4" :md="4" :lg="3" :xl="3" >
                <a-avatar 
                  title="点击上传头像" 
                  style="cursor: pointer;" 
                  size="large" icon="user" 
                  :src="require('../assets/userHead/userHead2.jpg')"/>
              </a-col>
              <a-col :xs="20" :sm="20" :md="21" :lg="21" :xl="21" >
                <p v-if="!saveState">
                  <span class="nickName">{{userNickName}}</span>
                  <span class="signature">{{userSignatureModify}}</span>
                  <span class="mobile">手机号：{{userMobileModify}}</span>
                </p>
                <p v-else>
                 <span class="userNickNameModify">昵称：<input v-model="userNickNameModify" /><br/></span>
                 <span class="userSignatureModify">签名：<input v-model="userSignatureModify" /></span>
                 <span class="userMobileModify">手机号：<input v-model="userMobileModify" /></span>
                </p>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="1">
            <a-icon v-if="!saveState" @click="saveState=!saveState" type="setting" style="font-size:17px" />
            <a-icon v-else @click="saveState=!saveState" type="setting" style="font-size:17px" theme="twoTone" />
          </a-col>
        </a-row>

        <a-row>
          <a-upload 
            name="file" 
            :multiple="true"
            :headers="headers" @change="handleChange"
            action="http://192.168.2.2:9090/file/upLoadImg" >
              <a-button>
                <a-icon type="upload" /> 更换头像
              </a-button>
          </a-upload>
        </a-row>

        <a-row
              :style="{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 20px ',
              background: '#fff',
              textAlign: 'right',
              }"
          >
                <a-button :style="{marginRight: '8px'}" @click="handleCancel" >返回</a-button>
                <a-button @keyup.enter="handleSubmit" @click="handleSubmit" type="primary" html-type="submit" >保存</a-button>
        </a-row>
      </a-modal>

  </div>
</template>

<script>

    import user from '@/api/user'
    import myStorage from '@/utils/myStorage'

    export default {
        props:{
          visible:Boolean
        },
         data() {
           let _this = this;
            return {
              __this : _this,
              saveState:false,
              userNickName:'',
              userSignature:'',
              userMobile:'',
              userNickNameModify:'',
              userSignatureModify:'',
              userMobileModify:'',
              // 上传头像
              headers: {
                authorization: 'authorization-text',
              }
            }
        },
        mounted(){
            let user = this.$store.state.user;
            this.userNickName = user == null ? '' : user.userNickName;
            this.userSignature = user == null ? '' : user.userSignature;
            this.userMobile = user == null ? '' : user.userMobile;
            this.userNickNameModify = this.userNickName;
            this.userSignatureModify = this.userSignature;
            this.userMobileModify = this.userMobile;
        },  
        methods: {
            // 点击保存
            // 请求更新数据
            handleSubmit(){
              this.handleCancel();//调用父组件去修改数据
              // user.userModify({}).then(res=>{
              //   if(res.code==200){
              //     this.handleCancel();//调用父组件去修改数据
              //   }
              // });
            },
            // 点击返回
            handleCancel(e) {
              this.$emit('update:visible',false);//调用父组件去修改数据
            },
            // 点击上传
            handleChange(info) {
              info.fileList = [];
              console.log(info);
              // if (info.file.status !== 'uploading') {
              //   console.log(info.file, info.fileList);
              // }
              // if (info.file.status === 'done') {
              //   this.$message.success(`${info.file.name} file uploaded successfully`);
              // } else if (info.file.status === 'error') {
              //   this.$message.error(`${info.file.name} file upload failed.`);
              // }
            },
        },
    }

</script>

<style scoped>
  input{
    border:none;
  }
  .nickName,.signature,.mobile{
    display: block;
    margin-bottom:6px;
  }
  .nickName{
    font-size: 17px;
    font-weight: bold;
  }
  .userNickNameModify,.userSignatureModify,.userMobileModify{
    display: block;
    margin-bottom:6px;
  }
</style>