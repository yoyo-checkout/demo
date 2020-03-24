import * as api from '@/api';
import * as types from './types';

const state = {
  statistics: {},
  dateRange: [],
  selectedDate: '2020-3-21',
  tooltip: {
    isVisible: false,
    country: '',
    confirmed: null,
    deaths: null,
    recovered: null,
  },
};

const actions = {
  async getGlobalStatistics({ commit }) { // eslint-disable-line
    try {
      const { data } = await api.Covid19.fetchGlobalStatistics();

      commit('SET_STATISTICS', data);
      commit('SET_DATE_RANGE', data);
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
  [types.SET_DATE_RANGE](state, statistics) {
    state.dateRange = statistics.Afghanistan.map((item) => item.date);
  },
  [types.SET_SELECTED_DATE](state, date) {
    state.selectedDate = date;
  },
  [types.SET_TOOLTIP_DATA](state, { key, value }) {
    state.tooltip[key] = value;
  },
  [types.RESET_TOOLTIP_DATA](state) {
    state.tooltip = {
      isVisible: false,
      country: '',
      confirmed: 0,
      deaths: 0,
      recovered: 0,
    };
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
