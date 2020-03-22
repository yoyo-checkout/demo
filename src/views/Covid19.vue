<template>
  <div class="covid19">
    <svg width="1000px" height="600px"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.getGlobalStatisticsByDate();
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
          .on('mouseover', () => {

            // d3
            //   .select(this)
            //   .classed('active', true);
          })
          .on('mouseout', () => {
            // d3
            //   .select(this)
            //   .classed('active', false);
          });
      });
    },
  },
};
</script>

<style lang="scss">
</style>
