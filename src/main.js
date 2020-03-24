import Vue from 'vue';
import { Slider } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Slider);

const vueInstance = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

window.vueInstance = vueInstance;
