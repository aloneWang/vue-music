// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/reset.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
import 'swiper/dist/css/swiper.css'
import './common/css/iconfont.css'
import VueLazyload from 'vue-lazyload'
import * as filters from 'common/js/filter.js'
Object.keys(filters).forEach(key=>{
	 Vue.filter(key, filters[key])
})
Vue.use(VueLazyload,{
	loading:require('common/images/loading.gif')
})
/* eslint-disable no-new */
var vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
