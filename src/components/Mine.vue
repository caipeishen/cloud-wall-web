<template>
    <div>
      <a-modal
        title="Hi ~_~" 
        :visible="visible"
        footer="false"
        width="30%"
        @cancel="handleCancel"
      >
        <a-row type="flex" algin="middle" justify="center">
          

          未完待续 · · · 
          <br/>





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
            return {
             
            }
        },
        methods: {
            handleCancel(e) {
              this.$emit('update:visible',false);//调用父组件去修改数据
            }
        },
    }

</script>

<style scoped>
  
</style>