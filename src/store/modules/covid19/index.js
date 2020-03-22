import * as api from '@/api';
import * as types from './types';

const state = {
  statistics: {},
};

const actions = {
  async getGlobalStatisticsByDate({ commit }) { // eslint-disable-line
    try {
      const { data } = await api.Covid19.fetchGlobalStatistics();

      commit('SET_STATISTICS', data);
    } catch (error) {
      console.log('Error Request.'); // eslint-disable-line
    }
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [types.SET_STATISTICS](state, statistics) {
    state.statistics = statistics;
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
