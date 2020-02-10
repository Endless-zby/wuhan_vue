import Vue from 'vue'
import FastClick from 'fastclick'
import 'normalize.css'
import App from './App.vue'
import './assets/responsive'
import './assets/global.css'
import zby_ajax from './vue.extend'
import appApi from './libs/appApi';

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.use(zby_ajax);
Vue.mixin(appApi);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

