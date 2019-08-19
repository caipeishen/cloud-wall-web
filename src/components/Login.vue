<template>
    <div>
    <a-button type="primary" @click="showDrawer">
      <a-icon type="plus" /> New account
    </a-button>
    <a-drawer
      title="登陆"
      :width="300"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100%)',overflow: 'auto'}"
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
            <a-button :style="{marginRight: '8px'}" @click="onClose" >返回</a-button>
            <a-button type="primary" html-type="submit">注册</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
    export default {
         data() {
            return {
                form: this.$form.createForm(this),
                visible: false,
                userNameState:"",
                userPasswordState:"",
                userMobileState:"",
            }
        },
        methods: {
            showDrawer() {
                this.visible = true
            },
            onClose() {
                this.visible = false
            },
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
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