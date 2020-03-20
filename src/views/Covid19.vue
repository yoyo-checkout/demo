<template>
  <div class="covid19">
    <svg width="1000px" height="600px"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  mounted() {
    const url = 'https://enjalot.github.io/wwsd/data/world/world-110m.geojson';

    d3.json(url).then((world) => {
      const globalProjection = d3.geoMercator();
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
};
</script>

<style lang="scss">
</style>
