import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueNumber from 'vue-number-animation';
import { Slider } from 'element-ui';
import locales from './i18n';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueNumber);
Vue.use(Slider);

const i18n = new VueI18n({
  locale: 'zh-TW',
  messages: locales,
});

const vueInstance = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

window.vueInstance = vueInstance;
