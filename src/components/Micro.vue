<template>
  <div>
    <h1>LuffyX学位:{{title}}</h1>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        title:null
      }
    },
    mounted(){
      this.initMicro()
    },
    methods:{
      initMicro(){
        var that = this
        this.$axios.request({
          url:'http://127.0.0.1:8000/api/v1/micro/',
          method:'GET',
          params:{
            token:this.$store.state.token
          }
        }).then(function(arg){ // arg服务端返回的值
          console.log(arg)
          if (arg.data.code === 1000){
            that.title = arg.data.title
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
