import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store.js'
import router from './router.js'

import './css/el-table.css'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
