import Vue from 'vue'
import App from './App'
import store from  './store'
import router from './router'
import "normalize.css"

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
