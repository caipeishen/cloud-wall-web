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
                  :src="apiUrl + userHeadImg"
                  @click="upLoadHeadImg"/>
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
            <a-icon v-else @click="updateUserInfo" type="setting" style="font-size:17px" theme="twoTone" />
          </a-col>
        </a-row>

        <a-row style="display:none;">
          <a-upload 
            :multiple="true"
            :fileList="fileList"
            :remove="handleRemove"
            :beforeUpload="beforeUpload">
              <a-button ref="upLoad" ><a-icon type="upload" /> 更换头像</a-button>
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
                <a-button :style="{marginRight: '8px'}" type="primary" @click="handleCancel" >确定</a-button>
        </a-row>
      </a-modal>

  </div>
</template>

<script>

    import user from '@/api/user'
    import reqwest from 'reqwest'
    import cfg from "@/config/config";
    import myStorage from '@/utils/myStorage'

    export default {
        props:{
          visible:Boolean
        },
         data() {
            return {
              apiUrl:cfg.apiUrl,
              saveState:false,
              userHeadImg:'',
              userNickName:'',
              userSignature:'',
              userMobile:'',
              userNickNameModify:'',
              userSignatureModify:'',
              userMobileModify:'',
              fileList:[],
            }
        },
        mounted(){
            let user = this.$store.state.user;
            this.userNickName = user == null ? '' : user.userNickName;
            this.userSignature = user == null ? '' : user.userSignature;
            this.userMobile = user == null ? '' : user.userMobile;
            this.userHeadImg = user == null ? '' : user.userHeadImg;
            this.userNickNameModify = this.userNickName;
            this.userSignatureModify = this.userSignature;
            this.userMobileModify = this.userMobile;
        },  
        methods: {
            // 点击更换头像
            upLoadHeadImg(){
              this.$refs.upLoad.$el.click();
            },
            // 移除上传文件
            handleRemove(file) {
              const index = this.fileList.indexOf(file);
              const newFileList = this.fileList.slice();
              newFileList.splice(index, 1);
              this.fileList = newFileList
            },
            // 更新用户信息
            updateUserInfo(){
              this.saveState = !this.saveState;
            },
            // 上传之后
            beforeUpload(file){
              this.$notification.destroy();
              let fileName = file.name;
              let fileSuffix = fileName.substring(fileName.lastIndexOf('.'));
              if(fileSuffix.toUpperCase() != '.JPG' && fileSuffix.toUpperCase() != '.JPEG' && fileSuffix.toUpperCase() != '.PNG' && fileSuffix.toUpperCase() != '.BMP'){
                this.fileList = [];
                this.$message.warning('请选择图片!');
              }else{
                if(this.fileList.length==1){
                  this.fileList.splice(0,1);
                }
                this.fileList = [...this.fileList, file]
              }
              let _this = this;
              const { fileList } = this;
              const formData = new FormData();
              if(fileList.length==0){
                this.$message.warning('请选择文件!');
              }else{
                fileList.forEach((file) => {
                  formData.append('file', file);
                  formData.append('userId', this.$store.state.user.id);
                });
                //console.log("fileList:"+fileList[0]);
                reqwest({
                  url: cfg.apiUrl+'user/upLoadHeadImg',
                  method: 'post',
                  processData: false,
                  data: formData,
                  success: (result) => {
                    if(result.code=='200'){
                      this.fileList = []
                      this.uploading = false;
                      this.userHeadImg = result.message;
                      let user = myStorage.getUserSession();
                      user.userHeadImg = this.userHeadImg;
                      myStorage.setUserSession(user);
                      this.$store.state.user = user;
                      this.$notification.open({
                          message: '消息',
                          description: '更换头像成功!',
                          icon: <a-icon type="smile" style="color: #108ee9" />,
                      });
                    }else{
                      this.$notification.open({
                          message: '消息',
                          description: result.message,
                          icon: <a-icon type="smile" style="color: #108ee9" />,
                      });
                    }
                  },
                  error: () => {
                    _this.$notification.open({
                        message: '消息',
                        description: '出现异常!',
                        icon: <a-icon type="smile" style="color: #F5222D" />,
                    });
                  },
                });
              }
            },
            // 点击返回
            handleCancel(e) {
              this.$emit('update:visible',false);//调用父组件去修改数据
            },
        }
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