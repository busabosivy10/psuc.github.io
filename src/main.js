require('dotenv').config()

import Vue from 'vue'
import App from './App.vue'
import DatatableFactory from 'vuejs-datatable'
import VueFirestore from 'vue-firestore'
import VeeValidate from 'vee-validate'

import router from './router'
import 'nprogress/nprogress.css'
import './assets/app.less'
import 'font-awesome/css/font-awesome.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.use(VueFirestore)
Vue.use(require('vue-moment'))
Vue.use(DatatableFactory)
Vue.use(VeeValidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
