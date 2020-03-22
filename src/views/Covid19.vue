<template>
  <div class="covid19">
    <svg width="1000px" height="600px"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedDate: '2020-3-21',
    };
  },
  async mounted() {
    await this.getGlobalStatisticsByDate();
    // const current = new Date();
    // const today = `0${current.getMonth() + 1}-${current.getDate()}`;
    // console.log(today);
    // https://nssac.bii.virginia.edu/covid-19/dashboard/data/nssac-ncov-sd-01-22-2020.csv

    this.renderWorldMap();
  },
  computed: {
    ...mapState('Covid19', {
      statistics: (state) => state.statistics,
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
          });
      });
    },
  },
};
</script>

<style lang="scss">
.covid19 {
  background-color: #d0cfd4;

  path {
    stroke: rgb(128, 128, 128);
  }
}
</style>
