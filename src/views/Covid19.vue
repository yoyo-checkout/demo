<template>
  <div class="covid19">
    <svg width="1000px" height="600px"></svg>
    <div class="tooltip" v-show="tooltip.isVisible">
      <p>Country: <span>{{ tooltip.country }}</span></p>
      <p>confirmed: <span>{{ tooltip.confirmed ? tooltip.confirmed : '--' }}</span></p>
      <p>deaths: <span>{{ tooltip.deaths ? tooltip.deaths : '--' }}</span></p>
      <p>recovered: <span>{{ tooltip.recovered ? tooltip.recovered : '--' }}</span></p>
    </div>
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
import { mapState, mapActions } from 'vuex';

export default {
  async mounted() {
    await this.getGlobalStatisticsByDate();
    // const current = new Date();
    // const today = `0${current.getMonth() + 1}-${current.getDate()}`;
    // console.log(today);
    // https://nssac.bii.virginia.edu/covid-19/dashboard/data/nssac-ncov-sd-01-22-2020.csv

    this.renderWorldMap();
  },
  created() {
    window.addEventListener('click', closeTooltip);
  },
  computed: {
    ...mapState('Covid19', {
      statistics: (state) => state.statistics,
      selectedDate: (state) => state.selectedDate,
      tooltip: (state) => state.tooltip,
    }),
  },
  methods: {
    ...mapActions('Covid19', [
      'getGlobalStatisticsByDate',
    ]),

    renderWorldMap() {
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
}
</style>
