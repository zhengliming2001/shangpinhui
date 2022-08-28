import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
import router from './router';
// 引入typenav组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 注册全局组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 引入vuex
import store from './store';

// 引入mockSever.js
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入所有api
import * as API from '@/api'
// 引入element-ui
import { MessageBox } from 'element-ui';
// 注册element-ui组件
// Vue.component(MessageBox.name,MessageBox)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入懒加载插件
import VueLazyload from 'vue-lazyload';
// 引入使用的图片
import logo from '@/assets/logo.png'
// 使用懒加载插件
Vue.use(VueLazyload, {
  // 插件的配置对象
  loading:logo
})
// 引入校验插件
import '@/plugin/vee-validate';
new Vue({
  render: h => h(App),
  // 配置router
  router,
  // 配置store
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this
    // 安装API(不使用vuex的情况下，将请求直接绑在vue的原型对象上这样全都能使用)
    Vue.prototype.$API=API
  }
}).$mount('#app')