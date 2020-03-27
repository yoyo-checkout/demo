<template>
  <div class="date-slider">
    <div class="hint">
      <div class="hint__date">日期：{{ selectedDate }}</div>
      <div class="hint__text">← →滑動看各國趨勢</div>
    </div>
    <el-slider
      v-model="selectedDateIndex"
      :max="dateRange.length ? dateRange.length - 1 : 1"
      :show-stops="true"
      :format-tooltip="renderSliderTooltip"
      @input="handleDateChange">
    </el-slider>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as _ from 'lodash';
import 'd3-selection-multi';
import { countryMap } from '@/assets/tools/countryNameMap';
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('Covid19', {
      windowSize: (state) => state.windowSize,
      statistics: (state) => state.statistics,
      dateRange: (state) => state.dateRange,
      selectedDate: (state) => state.selectedDate,
    }),

    selectedDateIndex: {
      get() {
        return this.dateRange.indexOf(this.selectedDate);
      },
      set(index) {
        this.SET_SELECTED_DATE(this.dateRange[index]);
      },
    },
  },
  methods: {
    ...mapMutations('Covid19', [
      'SET_SELECTED_DATE',
    ]),

    updateWorldMap() {
      d3.select('.covid19 svg')
        .selectAll('path')
        .attr('style', (data) => {
          let country = data.properties.name;

          // timeseries API 跟 geoJson API 有些國家名稱不同
          // 需要作轉換
          const countryNameInTimeSeries = _.findKey(countryMap, (item) => item === country);
          country = countryNameInTimeSeries || country;

          if (this.statistics[country]) {
            const filterByDate = this.statistics[country].filter((item) => item.date === this.selectedDate)[0];

            if (filterByDate.confirmed === 0) return 'fill: #fff;';
            if (filterByDate.confirmed < 10) return 'fill: #fef0d9;';
            if (filterByDate.confirmed < 100) return 'fill: #fdd49e;';
            if (filterByDate.confirmed < 500) return 'fill: #fdbb84;';
            if (filterByDate.confirmed < 1000) return 'fill: #fc8d59;';
            if (filterByDate.confirmed < 10000) return 'fill: #e34a33;';
            return 'fill: rgb(179, 0, 0);';
          }

          return 'fill: #fff;';
        });
    },
    renderSliderTooltip(index) {
      return this.dateRange[index];
    },
    handleDateChange(index) {
      this.selectedDateIndex = index;
      this.updateWorldMap();
    },
  },
};
</script>

<style lang="scss">
.date-slider {
  padding: 30px;

  .hint {
    color: #fff;
    text-align: center;
  }
}
</style>
