<template>
    <div>
      <a-modal
        title="~_~"
        :visible="visible"
        footer="false"
        @cancel="handleCancel"
      >
        <a-row type="flex" algin="middle" justify="center">
          <a-form :form="form" style="width:60%" layout="vertical" hideRequiredMark>
            <a-row type="flex" algin="middle" justify="center">
              <a-col :span="24">
                <a-form-item has-feedback :validate-status="userNameState">
                  <a-input 
                    @blur="validateUserNameBlur"
                    v-decorator="['userName']"
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
                    type="password"
                    @blur="validateUserPasswordBlur"
                    v-decorator="['userPassword']"
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
                    v-decorator="['userMobile']"
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
                <a-button @keyup.enter="handleSubmit" @click="handleSubmit" type="primary" html-type="submit">注册</a-button>
            </a-row>
          </a-form>
        </a-row>
      </a-modal>
  </div>
</template>

<script>

    import user from '@/api/user'
    export default {
        props:{
          visible:Boolean
        },
        data() {
            return {
                form: this.$form.createForm(this),
                userNameState:"",
                userPasswordState:"",
                userMobileState:"",
            }
        },
        methods: {
            handleSubmit(e) {
              let _this = this;
              let flag = true;
              this.$notification.destroy();
              for(let key in this.form.getFieldsValue()){
                let value = this.form.getFieldsValue()[key];
                if(value=='' || value==undefined){
                  flag = false;
                  this.$notification.open({
                      message: '消息',
                      description: '请填写完整信息!',
                      icon: <a-icon type="frown" style="color: #FAAD14" />,
                  });
                  return;
                }
              }
              for(let key in this.form.getFieldsError()){
                let value = this.form.getFieldsError()[key];
                //console.log(key+" : "+value);
                if(value!='' && value!=undefined){
                  flag = false;
                  return;
                }
              }
              if(flag){
                this.form.validateFields(function(errors,values){
                  user.userRegister(values).then((res)=>{
                    if(res.code==200){
                        _this.handleCancel();
                        _this.$notification.open({
                            message: '消息',
                            description: '注册成功',
                            icon: <a-icon type="smile" style="color: #108ee9" />,
                        });
                    }else{
                        _this.$notification.open({
                            message: '消息',
                            description: '注册失败',
                            icon: <a-icon type="smile" style="color: #F5222D" />,
                        });
                    }
                  })
                })
              }
            },
            handleCancel(e) {
              this.userNameState = "";
              this.userPasswordState = "";
              this.userMobileState = "";
              this.form.resetFields();
              this.$emit("update:visible",false);
            },
            validateUserNameBlur(e){
                const validateUserNameReg = /^[0-9a-zA-Z\W^]{3,15}$/
                if (!validateUserNameReg.test(e.target.value)) {
                  const arr = [{
                    message: '长度为3-15位的字符!',
                    field: 'userName',
                  }]
                  this.userNameState = "error";
                  this.form.setFields({ userName: { value: e.target.value, errors: arr } })
                }else{
                  // 验证账号是否被注册
                  user.userNameCheckIsRegister({userName:e.target.value}).then((res=>{
                      if(res.code==200){
                        this.userNameState = "success";
                        this.form.setFields({ userName: { value: e.target.value } })
                      }else{
                        const arr = [{
                          message: res.message,
                          field: 'userName',
                        }]
                        this.userNameState = "error";
                        this.form.setFields({ userName: { value: e.target.value , errors:arr } })
                      }
                  }))
                }
            },
            validateUserPasswordBlur(e) {
              const validateUserPasswordReg = /^[0-9a-zA-Z\W^]{6,18}$/;
              //强 ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
              //中 ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$
              //弱 ^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$
              if (!validateUserPasswordReg.test(e.target.value)) {
                const arr = [{
                  message: '长度为6-18位的字符!',
                  field: 'userPassword',
                }]
                this.userPasswordState = "error";
                this.form.setFields({ userPassword: { value: e.target.value, errors: arr } })
              }else{
                this.userPasswordState = "success";
                this.form.setFields({ userPassword: { value: e.target.value } })
              }
            },
            validateUserMobileBlur(e){
              const validateUserMobileReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
              if (!validateUserMobileReg.test(e.target.value)) {
                const arr = [{
                  message: '您输入的手机格式不正确!',
                  field: 'userMobile',
                }]
                this.userMobileState = "error";
                this.form.setFields({ userMobile: { value: e.target.value, errors: arr } })
              }else{
                this.userMobileState = "success";
                this.form.setFields({ userMobile: { value: e.target.value } })
              }
            }
        },
    }

</script>

<style scoped>
  
</style>
