<template>
    <div>
      <a-modal
        title="~_~" 
        :visible="visible"
        footer="false"
        width="30%"
        @cancel="handleCancel"
      >
        <a-row type="flex" algin="middle" justify="center">
          <a-form :form="form" style="width:80%" layout="vertical" hideRequiredMark>
            <a-row type="flex" algin="middle" justify="center">
              <a-col :span="24">
                <a-form-item
                  label="标题"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-input has-feedback :validate-status="anaTitleState"
                    placeholder="请输入标题"
                    v-decorator="[
                      'anaTitle',
                      {rules: [{ required: true, message: '请输入标题!' }]}
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="类型"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                >
                  <a-select has-feedback :validate-status="anaTypeIdState"
                    placeholder="请选择类型"
                    v-decorator="[
                      'anaTypeId',
                      {rules: [{ required: true, message: '请选择类型!' }]}
                    ]"
                    @change="handleChange"
                  >
                    <a-select-option value="2">
                      热评
                    </a-select-option>
                    <a-select-option value="3">
                      短句
                    </a-select-option>
                    <a-select-option value="4">
                      段子
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item 
                  label="内容"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 12 }"
                  has-feedback :validate-status="anaContentState"
                >
                  <a-textarea
                    placeholder="请输入内容"
                    v-decorator="[
                      'anaContent',
                      {rules: [{ required: true, message: '请输入语录内容!' }]}
                    ]"
                  />
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
                <a-button @keyup.enter="handleSubmit" @click="handleSubmit" type="primary" html-type="submit" >发布</a-button>
            </a-row>
          </a-form>
        </a-row>
      </a-modal>
  </div>
</template>

<script>

    import ana from '@/api/ana'
    import myStorage from '@/utils/myStorage'
    export default {
        props:{
          visible:Boolean
        },
         data() {
            return {
                form: this.$form.createForm(this),
                anaTitleState:"",
                anaTypeIdState:"",
                anaContentState:"",
            }
        },
        methods: {
          handleChange(){
            
          },
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
                  let user = myStorage.getUserSession();
                  values.userId = user.id;
                  values.anaFrom = user.userNickName;
                  ana.anaPublic(values).then((res)=>{
                    if(res.code==200){
                        _this.handleCancel();
                        //把本地的点赞数据放到
                        _this.$notification.open({
                            message: '消息',
                            description: '发布成功',
                            icon: <a-icon type="smile" style="color: #108ee9" />,
                        });
                    }else{
                        _this.$notification.open({
                            message: '消息',
                            description: '发布失败',
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
              this.anaTitleState = "";
              this.anaTypeIdState = "";
              this.anaContentState = "";
              this.form.resetFields();
            }
        },
    }

</script>

<style scoped>
  
</style>