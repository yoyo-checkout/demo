/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Slider } from 'element-ui';
import DateSlider from '@/components/covid19/DateSlider.vue';

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
});
