<template>
  <div class="tooltip" v-show="tooltip.isVisible && windowSize > 850">
    <p>國家: <span>{{ tooltip.country }}</span></p>
    <p>確診數: <span>{{ tooltip.confirmed !== null ? tooltip.confirmed : '--' }}</span></p>
    <p>死亡數: <span>{{ tooltip.deaths !== null ? tooltip.deaths : '--' }}</span></p>
    <p>治癒數: <span>{{ tooltip.recovered !== null ? tooltip.recovered : '--' }}</span></p>
  </div>
</template>

<script>
import { closeTooltip } from '@/assets/tools/d3HandleEvent';
import { mapState } from 'vuex';

export default {
  async mounted() {
    window.addEventListener('click', closeTooltip);
  },
  computed: {
    ...mapState('Covid19', {
      windowSize: (state) => state.windowSize,
      tooltip: (state) => state.tooltip,
    }),
  },
};
</script>

<style lang="scss">
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
</style>
