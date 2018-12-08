// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'  // 引用store

// 在vue的全局变量中设置了 $axios=axios
// 以后每个组件使用时：this.$axios
Vue.prototype.$axios = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 实例化放入全局之中
  components: { App },
  template: '<App/>'
})

/*拦截器*/
router.beforeEach(function(to, from, next){
  if(to.meta.requireAuth){
    //要去的url只有登录成功过才能访问
    if(store.state.token){
      next()
    }else{
      next({path:'/login', query:{backUrl:to.fullPath}})  // 没有登入跳转到登入页面
    }
  }
  else{
    next()
  }
})
