/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import * as store from '@/store/modules/covid19';

describe('Covid19 mutations 測試', () => {
  it('SET_COUNTRY_STATISTICS 正確設定', () => {
    const state = {
      statistics: {},
    };
    const statistics = {
      Taiwan: [
        {
          date: '2020-1-22',
          confirmed: 0,
          deaths: 0,
          recovered: 0,
        },
      ],
    };

    expect(state.statistics).to.be.an('object');
    store.default.mutations.SET_COUNTRY_STATISTICS(state, statistics);
    expect(state.statistics).to.be.an('object');

    const firstStatistic = Object.values(state.statistics)[0];

    expect(firstStatistic).to.be.an('array');
    expect(firstStatistic[0].date).to.be.a('string');
    expect(firstStatistic[0].confirmed).to.be.a('number');
    expect(firstStatistic[0].deaths).to.be.a('number');
    expect(firstStatistic[0].recovered).to.be.a('number');
  });

  it('SET_DATE_RANGE 正確設定', () => {
    // const state = {
    //   selectedDate: '',
    // };
    //
    // store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    // expect(state.selectedDate).to.equal('2020-3-22');
  });

  it('SET_SELECTED_DATE 正確設定', () => {
    const state = {
      selectedDate: '',
    };

    store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    expect(state.selectedDate).to.equal('2020-3-22');
  });

  it('SET_TOOLTIP_DATA 正確設定', () => {
    // const state = {
    //   selectedDate: '',
    // };
    //
    // store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    // expect(state.selectedDate).to.equal('2020-3-22');
  });

  it('RESET_TOOLTIP_DATA 正確設定', () => {
    // const state = {
    //   selectedDate: '',
    // };
    //
    // store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    // expect(state.selectedDate).to.equal('2020-3-22');
  });

  it('SET_WINDOW_SIZE 正確設定', () => {
    // const state = {
    //   selectedDate: '',
    // };
    //
    // store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    // expect(state.selectedDate).to.equal('2020-3-22');
  });

  it('SET_GLOBAL_STATISTIC 正確設定', () => {
    // const state = {
    //   selectedDate: '',
    // };
    //
    // store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    // expect(state.selectedDate).to.equal('2020-3-22');
  });
});
