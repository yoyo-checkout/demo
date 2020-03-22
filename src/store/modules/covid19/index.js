import * as api from '@/api';

const state = {
  testVuex: 'testVuex',
};

const actions = {
  async getGlobalStatisticsByDate() {
    const data = await api.Covid19.fetchGlobalConfirmedByDate();

    console.log(data); // eslint-disable-line
  },
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
