<template>
    <div>
      <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
      <a-modal
        title="Hi ~_~"
        :visible="visible"
        footer="false"
        @cancel="handleCancel"
        :confirmLoading="confirmLoading"
      >
        <a-row type="flex" algin="middle" justify="center">
          <a-form :form="form" style="width:70%" @submit="handleSubmit" layout="vertical" hideRequiredMark>
            <a-row type="flex" algin="middle" justify="center">
              <a-col :span="24">
                <a-form-item has-feedback :validate-status="userNameState">
                  <a-input 
                    @blur="validateUserNameBlur"
                    v-decorator="['userName', {
                      rules: [{ required: true, message: '请输入账号' } ]
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
              <a-col :span="24">
                <a-form-item has-feedback :validate-status="userPasswordState">
                  <a-input
                    @blur="validateUserPasswordBlur"
                    v-decorator="['userPassword', {
                      rules: [
                        { required: true, message: '请输入密码' }]
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
              <a-col :span="24">
                <a-form-item has-feedback :validate-status="userMobileState">
                  <a-input
                    @blur="validateUserMobileBlur"
                    v-decorator="['userMobile', {
                      rules: [
                        { required: true, message: '请输入手机号' }]
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
        </a-row>
      </a-modal>
  </div>
</template>

<script>

    import { userRegister } from '@/api/user'
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
              console.log(this.form);
              this.ModalText = 'The modal will be closed after two seconds';
              this.confirmLoading = true;
              setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
              }, 2000);
            },
            handleCancel(e) {
              this.visible = false;
              this.userNameState = "";
              this.userPasswordState = "";
              this.userMobileState = "";
              this.form.resetFields();
            },
            validateUserNameBlur(e){
                const validateUserNameReg = /^\w{3,15}$/
                if (e.target.value && !validateUserNameReg.test(e.target.value)) {
                  const arr = [{
                    message: '只能包含字母、数字和下划线!',
                    field: 'userName',
                  }]
                  this.form.setFields({ userName: { value: e.target.value, errors: arr } })
                  this.userNameState = "error";
                }else{
                  this.userNameState = "success";
                }
            },
            validateUserPasswordBlur(e) {
              const validateUserPasswordReg = /^[0-9a-zA-Z\W^]{6,18}$/;
              //强 ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
              //中 ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
              //弱 ^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$
              if (e.target.value && !validateUserPasswordReg.test(e.target.value)) {
                const arr = [{
                  message: '长度为6-18位的字符!',
                  field: 'userPassword',
                }]
                this.form.setFields({ userPassword: { value: e.target.value, errors: arr } })
                this.userPasswordState = "error";
              }else{
                  this.userPasswordState = "success";
              }
            },
            validateUserMobileBlur(e){
              const validateUserMobileReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
              if (e.target.value && !validateUserMobileReg.test(e.target.value)) {
                const arr = [{
                  message: '您输入的手机格式不正确!',
                  field: 'userMobile',
                }]
                this.form.setFields({ userMobile: { value: e.target.value, errors: arr } })
                this.userMobileState = "error";
              }else{
                  this.userMobileState = "success";
              }
            }
        },
    }

</script>

<style scoped>

</style>