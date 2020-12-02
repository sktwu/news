import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

//自动设置REM基准值
import 'amfe-flexible'
import 'vant/lib/index.css'
import './assets/style/base.less'

Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
