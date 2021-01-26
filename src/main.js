import dayjs from 'dayjs'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
// import { List } from 'vant'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.filter('dateformat', (val, formatter = 'YYYY/MM/DD HH:mm:ss') => {
  if (!val) {
    return ''
  }
  return dayjs(val).format(formatter)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
