import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
export const bus = new Vue();
// import router from './router'


Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  // router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
