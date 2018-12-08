<template>
  <div>
    <h1>用户登录</h1>
    <div>
      <p>
        <!-- v-model="username"  绑定username -->
        <input type="text" placeholder="请输入用户名" v-model="username">
      </p>
      <p>
        <input type="text" placeholder="请输入密码" v-model="password">
      </p>
      <input type="button" value="提交" @click="doLogin">
    </div>
  </div>
</template>
<script>
  export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    doLogin() {
      // this.username 得到上面的username:"" 里的信息
      this.username;
      this.password;
      var that = this  //这个this是全局中的store的this
      //   发送ajax请求
      this.$axios
        .request({
          //   发送的地址
          url: "http://127.0.0.1:8000/api/v1/auth/",
          //   发送的方式
          method: "POST",
          //data里发送的数据
          data: {
            user: this.username,
            pwd: this.password
          },
          //发送的请求头
          headers: {
            "Content-Type": "application/json"
          }
          //then后面是返回的结果
        })
        .then(function(arg) {
           console.log(arg);
          // 如果成功
          if (arg.data.code === 1000){
              //that.$store.state = arg.data.token;that.$store.state.username = that.username
              that.$store.commit("saveToken", {token:arg.data.token, username:that.username})  //只能传commit两个参数,所以将参数打包成一个字典
              var url = that.$route.query.backUrl
              if (url){
                that.$router.push({path:url})
              }else{
                that.$router.push({path:'/index'})
              }

          }else{
            alert(arg.data.error);
          }
          //捕获到的错误信息
        })
        .catch(function(arg) {
          console.log("发生的错误");
        });
      alert(this.username, this.password);
    }
  }
};
</script>
<style scoped>
</style>
