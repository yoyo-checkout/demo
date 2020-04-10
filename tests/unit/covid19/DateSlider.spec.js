/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Slider } from 'element-ui';
import DateSlider from '@/components/covid19/DateSlider.vue';
import * as store from '@/store/modules/covid19';

const localVue = createLocalVue();
localVue.use(Slider);

describe('DateSlider.vue', () => {
  it('DateSlider 正確渲染', () => {
    const wrapper = shallowMount(DateSlider, {
      computed: {
        statistics: () => {},
        dateRange: () => [],
        selectedDate: () => '',
      },
      localVue,
    });
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it('dateRange is an array', () => {
    const wrapper = shallowMount(DateSlider, {
      computed: {
        statistics: () => {},
        dateRange: () => [],
        selectedDate: () => '',
      },
      localVue,
    });
    expect(wrapper.vm.dateRange).to.be.an('array');
  });

  it('dateRange 正確切換', () => {
    const state = {
      selectedDate: '',
    };

    store.default.mutations.SET_SELECTED_DATE(state, '2020-3-22');
    expect(state.selectedDate).to.equal('2020-3-22');
  });
});
