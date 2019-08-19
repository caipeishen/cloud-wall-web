<template>
    <div>
      <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
      <a-modal
        title="登陆"
        :visible="visible"
        footer="false"
        :confirmLoading="confirmLoading"
      >
    
        <a-form :form="form"  @submit="handleSubmit" layout="vertical" hideRequiredMark>
          <a-row>
            <a-col :span="24">
              <a-form-item has-feedback :validate-status="userNameState">
                <a-input @blur="userNameBlur"
                  v-decorator="['userName', {
                    rules: [
                      { required: true, message: '请输入账号' }, 
                      { validator: compareToUserName, }]
                  }]"
                  placeholder=" 请输入账号"
                >
                  <a-icon
                      slot="prefix"
                      type="user"
                      style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item has-feedback :validate-status="userPasswordState">
                <a-input
                  v-decorator="['userPassword', {
                    rules: [
                      { required: true, message: '请输入密码' }, 
                      { validator: compareToUserPassword, }]
                  }]"
                  placeholder=" 请输入密码"
                >
                  <a-icon
                      slot="prefix"
                      type="lock"
                      style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item has-feedback :validate-status="userMobileState">
                <a-input
                  v-decorator="['userMobile', {
                    rules: [
                      { required: true, message: '请输入手机号' }, 
                      { validator: compareToUserMobile, }]
                  }]"
                  placeholder=" 请输入手机号"
                >
                  <a-icon
                      slot="prefix"
                      type="mobile"
                      style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <div
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
              <a-button type="primary" html-type="submit">注册</a-button>
          </div>
        </a-form>
        
      </a-modal>
  </div>
</template>

<script>
    export default {
         data() {
            return {
                form: this.$form.createForm(this),
                visible: false,
                confirmLoading: false,
                userNameState:"",
                userPasswordState:"",
                userMobileState:"",
            }
        },
        methods: {
            showModal() {
              this.visible = true
            },
            handleSubmit(e) {
              this.ModalText = 'The modal will be closed after two seconds';
              this.confirmLoading = true;
              setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
              }, 2000);
            },
            handleCancel(e) {
              console.log('Clicked cancel button');
              this.visible = false
            },
            compareToUserName(rule, value, callback) {
                this.userNameState='validating'
                callback('SDGDF');
                console.log('compareToUserName');
            },
            compareToUserPassword(){
                this.userPasswordState='validating'
                console.log('compareToUserPassword');
            },
            compareToUserMobile(){
                this.userNameState='validating'
                console.log('compareToUserMobile');
            },
            userNameBlur(){
                this.userNameState='error';
                console.log('--------------------');
                console.log(this.form.getFieldDecorator('userName',));
                console.log('--------------------');
                
                //console.log(this.form.setFieldsValue('asdas'));
            }
        },
    }
</script>

<style scoped>

</style>