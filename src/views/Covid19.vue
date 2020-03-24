<template>
  <div class="covid19">
    <svg width="1000px" height="600px"></svg>
    <div class="tooltip" v-show="tooltip.isVisible">
      <p>國家: <span>{{ tooltip.country }}</span></p>
      <p>確診數: <span>{{ tooltip.confirmed ? tooltip.confirmed : '--' }}</span></p>
      <p>死亡數: <span>{{ tooltip.deaths ? tooltip.deaths : '--' }}</span></p>
      <p>治癒數: <span>{{ tooltip.recovered ? tooltip.recovered : '--' }}</span></p>
    </div>
    <div class="legend-table">
      <div class="row">
        <div class="row__color" style="background-color: #eaeaea;"></div>
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
    <el-slider
      class="date-slider"
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
import {
  handleMouseEnter,
  handleMouseOut,
  handleMouseClick,
  closeTooltip,
} from '@/assets/tools/d3HandleEvent';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  async mounted() {
    await this.getGlobalStatistics();
    // const current = new Date();
    // const today = `0${current.getMonth() + 1}-${current.getDate()}`;
    // console.log(today);
    // https://nssac.bii.virginia.edu/covid-19/dashboard/data/nssac-ncov-sd-01-22-2020.csv

    this.initWorldMap();
  },
  created() {
    window.addEventListener('click', closeTooltip);
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

    initWorldMap() {
      const url = 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson';

      d3.json(url).then((world) => {
        const globalProjection = d3.geoMercator().scale(120).translate([480, 430]);
        const pathRenderer = d3.geoPath().projection(globalProjection);

        d3.select('.covid19 svg')
          .selectAll('path')
          .data(world.features)
          .enter()
          .append('path')
          .attr('d', pathRenderer)
          .attr('style', (data) => {
            const country = data.properties.name;

            if (this.statistics[country]) {
              const filterByDate = this.statistics[country].filter((item) => item.date === this.selectedDate)[0];

              if (filterByDate.confirmed < 10) return 'fill: #fef0d9;';
              if (filterByDate.confirmed < 100) return 'fill: #fdd49e;';
              if (filterByDate.confirmed < 500) return 'fill: #fdbb84;';
              if (filterByDate.confirmed < 1000) return 'fill: #fc8d59;';
              if (filterByDate.confirmed < 10000) return 'fill: #e34a33;';
              return 'fill: rgb(179, 0, 0);';
            }

            return 'fill: #eaeaea;';
          })
          .on('mouseenter', handleMouseEnter)
          .on('mouseout', handleMouseOut)
          .on('click', handleMouseClick);
      });
    },
    updateWorldMap() {
      d3.select('.covid19 svg')
        .selectAll('path')
        .attr('style', (data) => {
          const country = data.properties.name;

          if (this.statistics[country]) {
            const filterByDate = this.statistics[country].filter((item) => item.date === this.selectedDate)[0];

            if (filterByDate.confirmed < 10) return 'fill: #fef0d9;';
            if (filterByDate.confirmed < 100) return 'fill: #fdd49e;';
            if (filterByDate.confirmed < 500) return 'fill: #fdbb84;';
            if (filterByDate.confirmed < 1000) return 'fill: #fc8d59;';
            if (filterByDate.confirmed < 10000) return 'fill: #e34a33;';
            return 'fill: rgb(179, 0, 0);';
          }

          return 'fill: #eaeaea;';
        })
        .transition();

      d3.select('.covid19 svg')
        .selectAll('path')
        .exit()
        .remove();
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
  background-color: #d0cfd4;

  * {
    box-sizing: border-box;
  }

  path {
    stroke: rgb(128, 128, 128);

    &.hover {
      opacity: .6;
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
    padding: 10px;
    width: 170px;
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
  }
}
</style>
