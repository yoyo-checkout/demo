/* eslint-disable no-unused-expressions */

import * as chai from 'chai';
import spies from 'chai-spies';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Slider } from 'element-ui';
import DateSlider from '@/components/covid19/DateSlider.vue';

const localVue = createLocalVue();
localVue.use(Slider);
chai.use(spies);

describe('Covid19 actions 測試', () => {
  it('getCountryDailyStatistics 測試', () => {
    const wrapper = shallowMount(DateSlider, {
      computed: {
        statistics: () => {},
        dateRange: () => [],
        selectedDate: () => '',
      },
      localVue,
    });
    chai.expect(wrapper.isVueInstance()).to.be.true;
  });

  it('getGlobalStatistics 測試', () => {
    const wrapper = shallowMount(DateSlider, {
      computed: {
        statistics: () => {},
        dateRange: () => [],
        selectedDate: () => '',
      },
      localVue,
    });
    chai.expect(wrapper.vm.dateRange).to.be.an('array');
  });
});
