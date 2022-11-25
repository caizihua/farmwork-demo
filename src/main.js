import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import vuex from './store.js'
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,
  vuex,
  vuetify,
  render: h => h(App)
}).$mount('#app')
