<template>
  <svg></svg>
</template>

<script>
import * as d3 from 'd3';
import * as _ from 'lodash';
import 'd3-selection-multi';
import {
  handleMouseEnter,
  handleMouseOut,
  handleMouseClick,
} from '@/assets/tools/d3HandleEvent';
import { countryMap } from '@/assets/tools/countryNameMap';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      geoJsonUrl: 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson',
      projectionScale: null,
    };
  },
  async mounted() {
    await this.getGlobalStatistics();
    this.projectionScale = this.getProjectionScale();
    await this.initWorldMap();
    this.updateWorldMap();

    window.addEventListener('resize', this.resizeWorldMap);
  },
  computed: {
    ...mapState('Covid19', {
      windowSize: (state) => state.windowSize,
      statistics: (state) => state.statistics,
      selectedDate: (state) => state.selectedDate,
    }),
  },
  methods: {
    ...mapActions('Covid19', [
      'getGlobalStatistics',
    ]),

    getProjectionScale() {
      if (window.innerWidth < 600) return 50;
      if (window.innerWidth < 800) return 75;
      if (window.innerWidth < 1024) return 100;
      return 150;
    },
    async resizeWorldMap() {
      this.projectionScale = this.getProjectionScale();

      d3.select('.covid19 svg')
        .selectAll('path')
        .remove();

      await this.initWorldMap();
      this.updateWorldMap();
    },
    async initWorldMap() {
      await d3.json(this.geoJsonUrl).then((world) => {
        const globalProjection = d3.geoMercator().translate([this.windowSize / 2, this.windowSize / 3]).scale(this.projectionScale);
        const pathRenderer = d3.geoPath().projection(globalProjection);

        d3.select('.covid19 svg')
          .attrs({ width: this.windowSize, height: this.windowSize / 2, viewBox: `0 0 ${this.windowSize} ${this.windowSize / 2}` })
          .selectAll('path')
          .data(world.features)
          .enter()
          .append('path')
          .attr('d', pathRenderer)
          .on('mouseenter', handleMouseEnter)
          .on('mouseout', handleMouseOut)
          .on('click', handleMouseClick);
      });
    },
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
  },
};
</script>

<style lang="scss">
path {
  stroke: rgb(128, 128, 128);

  &.hover {
    opacity: .9;
    cursor: pointer;
  }
}
</style>
