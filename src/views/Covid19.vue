<template>
  <div class="covid19">
    <svg></svg>
    <div class="tooltip" v-show="tooltip.isVisible && windowSize > 850">
      <p>國家: <span>{{ tooltip.country }}</span></p>
      <p>確診數: <span>{{ tooltip.confirmed ? tooltip.confirmed : '--' }}</span></p>
      <p>死亡數: <span>{{ tooltip.deaths ? tooltip.deaths : '--' }}</span></p>
      <p>治癒數: <span>{{ tooltip.recovered ? tooltip.recovered : '--' }}</span></p>
    </div>
    <div class="legend-table" v-show="windowSize > 850">
      <div class="row">
        <div class="row__color" style="background-color: #fff;"></div>
        <span>0</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: #fef0d9;"></div>
        <span>1 - 9</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: #fdd49e;"></div>
        <span>10 - 99</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: #fdbb84;"></div>
        <span>100 - 499</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: #fc8d59;"></div>
        <span>500 - 999</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: #e34a33;"></div>
        <span>1,000 - 9,999</span>
      </div>
      <div class="row">
        <div class="row__color" style="background-color: rgb(179, 0, 0);"></div>
        <span>10,000 +</span>
      </div>
    </div>
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
  </div>
</template>

<script>
import * as d3 from 'd3';
import 'd3-selection-multi';
import {
  handleMouseEnter,
  handleMouseOut,
  handleMouseClick,
  closeTooltip,
} from '@/assets/tools/d3HandleEvent';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      geoJsonUrl: 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson',
      windowSize: window.innerWidth,
      projectionScale: null,
    };
  },
  async mounted() {
    await this.getGlobalStatistics();
    this.projectionScale = this.getProjectionScale();
    this.initWorldMap();

    window.addEventListener('click', closeTooltip);
    window.addEventListener('resize', this.resizeWorldMap);
  },
  computed: {
    ...mapState('Covid19', {
      statistics: (state) => state.statistics,
      dateRange: (state) => state.dateRange,
      selectedDate: (state) => state.selectedDate,
      tooltip: (state) => state.tooltip,
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
    ...mapActions('Covid19', [
      'getGlobalStatistics',
    ]),
    ...mapMutations('Covid19', [
      'SET_SELECTED_DATE',
    ]),

    getProjectionScale() {
      if (window.innerWidth < 600) return 50;
      if (window.innerWidth < 800) return 75;
      if (window.innerWidth < 1024) return 100;
      return 150;
    },
    async resizeWorldMap() {
      this.windowSize = window.innerWidth;
      this.projectionScale = this.getProjectionScale();

      d3.select('.covid19 svg')
        .selectAll('path')
        .remove();

      this.initWorldMap();
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

      this.updateWorldMap();
    },
    updateWorldMap() {
      d3.select('.covid19 svg')
        .selectAll('path')
        .attr('style', (data) => {
          const country = data.properties.name;

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
.covid19 {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #595959;

  * {
    box-sizing: border-box;
  }

  path {
    stroke: rgb(128, 128, 128);

    &.hover {
      opacity: .9;
      cursor: pointer;
    }
  }

  .tooltip {
    position: absolute;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 5px;
    opacity: .8;

    p {
      margin: 5px 0;
    }
  }

  .legend-table {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px;
    width: 170px;
    background-color: rgba(245, 245, 246, .9);
    border: 2px solid #000;
    border-radius: 5px;

    .row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      &__color {
        width: 25px;
        height: 25px;
      }
    }
  }

  .date-slider {
    padding: 30px;

    .hint {
      color: #fff;
      text-align: center;
    }
  }
}
</style>
