import * as _ from 'lodash';
import * as api from '@/api';
import * as types from './types';

const state = {
  statistics: {},
};

const actions = {
  async getGlobalStatisticsByDate({ commit }) {
    try {
      const { data } = await api.Covid19.fetchGlobalStatisticsByDate();

      if (!data.error) {
        commit('SET_STATISTICS', data.data.covid19Stats);
      }
    } catch (error) {
      console.log('Error Request.'); // eslint-disable-line
    }
  },
};

/* eslint-disable no-shadow */
const mutations = {
  [types.SET_STATISTICS](state, unprocessedData) {
    const processedData = {};

    unprocessedData.forEach((item) => {
      const countryInProcessedData = _.pickBy(processedData, (value, key) => key === item.country);

      if (_.size(countryInProcessedData)) {
        const currentCountry = processedData[item.country];

        processedData[item.country] = {
          confirmed: item.confirmed + currentCountry.confirmed,
          deaths: item.deaths + currentCountry.deaths,
          recovered: item.recovered + currentCountry.recovered,
          provinces: {
            ...currentCountry.provinces,
            [item.province]: {
              confirmed: item.confirmed,
              deaths: item.deaths,
              recovered: item.recovered,
            },
          },
        };
      } else {
        const provinces = {};

        if (item.province !== '') {
          provinces[item.province] = {
            confirmed: item.confirmed,
            deaths: item.deaths,
            recovered: item.recovered,
          };
        }

        processedData[item.country] = {
          confirmed: item.confirmed,
          deaths: item.deaths,
          recovered: item.recovered,
          provinces,
        };
      }
    });

    state.statistics = processedData;
  },
};
/* eslint-enable no-shadow */

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
