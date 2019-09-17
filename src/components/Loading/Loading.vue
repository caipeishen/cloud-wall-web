<template>
<div id="zstax-bg" v-if="stop">
    <div class="loader" ref="loader" id="zstax-Loading" v-if="stop">
        <div class="loader-inner ball-spin-fade-loader"  ref="zstaxLoading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    
</div>
</template>
<script> 
  export default { 
      props:{ //接收从父组件
        stop:{ //数据格式
            type:Boolean,
            required:true,
            default:true,
        }, 
    },
    data() {
      return { 
      }
    },  
    methods: { 
        
    },


    mounted() {
      //var windowHeight = document.documentElement.clientHeight || document.body.clientHeight; 
      //this.$refs.loader.$el.style.margin = `${(windowHeight-80)/2}px auto`; //'1000px'; 
    },
    created() { 
        
    }
  }

</script>

<style scoped>
    #zstax-bg{ 
        position: fixed;
        top:0;
        left: 0;
        width:100%;    
        height:100%;    
        background: rgba(4, 4, 4, 0.7);
        z-index:99999;

    }
    .loader{
        width:80px;
        height: 80px;
        margin:200px auto;
    }
    @keyframes ball-spin-fade-loader {
        50% {
            opacity: 0.3;
            -webkit-transform: scale(0.4);
            transform: scale(0.4); 
        }

        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1); 
        } 
    }

    .ball-spin-fade-loader {
        position: relative; 
    }
    .ball-spin-fade-loader > div:nth-child(1) {
        top: 25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
        animation: ball-spin-fade-loader 1s 0s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(2) {
        top: 17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
        animation: ball-spin-fade-loader 1s 0.12s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(3) {
        top: 0;
        left: 25px;
        -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
        animation: ball-spin-fade-loader 1s 0.24s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(4) {
        top: -17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
        animation: ball-spin-fade-loader 1s 0.36s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(5) {
        top: -25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
        animation: ball-spin-fade-loader 1s 0.48s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(6) {
        top: -17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
        animation: ball-spin-fade-loader 1s 0.6s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(7) {
        top: 0;
        left: -25px;
        -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
        animation: ball-spin-fade-loader 1s 0.72s infinite linear; 
    }
    .ball-spin-fade-loader > div:nth-child(8) {
        top: 17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
        animation: ball-spin-fade-loader 1s 0.84s infinite linear; 
    }
    .ball-spin-fade-loader > div {
        background-color: rgba(255,255,255,0.5);
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute; 
    }
</style> 
