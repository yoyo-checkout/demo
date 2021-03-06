import * as api from '@/api';
import * as types from './types';

const state = {
  windowSize: null,
  globalStatistic: {},
  statistics: {},
  dateRange: [],
  selectedDate: '',
  tooltip: {
    isVisible: false,
    country: '',
    confirmed: null,
    deaths: null,
    recovered: null,
  },
};

const actions = {
  async getCountryDailyStatistics({ commit }) {
    try {
      const { data } = await api.Covid19.fetchCountryDailyStatistics();

      commit('SET_COUNTRY_STATISTICS', data);
      commit('SET_DATE_RANGE', data);
    } catch (error) {
      console.log('Error Request.'); // eslint-disable-line
    }
  },
  async getGlobalStatistics({ commit }) {
    try {
      const { data } = await api.Covid19.fetchGlobalStatistics();

      commit('SET_GLOBAL_STATISTIC', data);
    } catch (error) {
      console.log('Error Request.'); // eslint-disable-line
    }
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [types.SET_COUNTRY_STATISTICS](state, statistics) {
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
  [types.SET_WINDOW_SIZE](state, val) {
    state.windowSize = val;
  },
  [types.SET_GLOBAL_STATISTIC](state, statistic) {
    state.globalStatistic = statistic;
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
