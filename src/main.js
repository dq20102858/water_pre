import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.scss' // global css
import App from './App'
import router from './router/index'
import store from './store'
import './permission' // permission control
import * as filters from './filters' // global filters

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import Print from 'vue-print-nb'//调用浏览器打印插件
Vue.use(Print);
// import Video
import Video from 'video.js'//浏览器视频插件
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video
// import layer;
 import layer from 'vue-layer'
 import 'vue-layer/lib/vue-layer.css';
Vue.prototype.$layer = layer(Vue);
// 
Vue.use(Element, {
  size: 'medium'
})
//
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'GsTerPPU46fUXlt09K8840K0HxTvKIIa'
})
//
import eventBus from './utils/eventBus'
Vue.use(eventBus)
// Vue.use(VueQuillEditor)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
