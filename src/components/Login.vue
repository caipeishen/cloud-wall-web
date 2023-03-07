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
                <a-button @keyup.enter="handleSubmit" @click="handleSubmit" type="primary" html-type="submit" >登陆</a-button>
            </a-row>
          </a-form>
        </a-row>
      </a-modal>
  </div>
</template>

<script>

    import user from '@/api/user'
    import prize from '@/api/prize'
    import myStorage from '@/utils/myStorage'

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
                if(value!='' && value!=undefined){
                  flag = false;
                  return;
                }
              }
              if(flag){
                this.form.validateFields(function(errors,values){
                  user.userLogin(values).then((res)=>{
                    if(res.code==200){
                        //把本地的点赞数据放到
                        _this.$notification.open({
                            message: '消息',
                            description: '登陆成功',
                            icon: <a-icon type="smile" style="color: #108ee9" />,
                        });
                        _this.$store.state.user = res.data;
                        myStorage.setUserSession(res.data);
                        prize.userLoginSyncPrizeList({"userId":res.data.id,"prizeList":myStorage.getPrizeList()}).then(res=>{
                          if(res.code==200){
                            myStorage.removePrizeList();
                          }
                        });
                        _this.handleCancel();
                    }else{
                        _this.$notification.open({
                            message: '消息',
                            description: '登陆失败',
                            icon: <a-icon type="smile" style="color: #F5222D" />,
                        });
                    }
                  })
                })
              }
            },
            handleCancel(e) {
              this.$emit('update:visible',false);//调用父组件去修改数据
              //this.visible = false;
              this.userNameState = "";
              this.userPasswordState = "";
              this.form.resetFields();
            }
        },
    }

</script>

<style scoped>
  
</style>
