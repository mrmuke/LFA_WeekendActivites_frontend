import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

export const eventBus = new Vue();

import "@/assets/index.css"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')