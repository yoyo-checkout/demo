import Vue from 'vue';
import Vuex from 'vuex';

import Covid19 from './modules/covid19';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Covid19,
  },
});
