<template>
  <div class="covid19">
    <WorldMap />
    <ToolTip />
    <LegendTable />
    <DateSlider />
  </div>
</template>

<script>
import WorldMap from '@/components/covid19/WorldMap.vue';
import ToolTip from '@/components/covid19/ToolTip.vue';
import LegendTable from '@/components/covid19/LegendTable.vue';
import DateSlider from '@/components/covid19/DateSlider.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    WorldMap,
    ToolTip,
    LegendTable,
    DateSlider,
  },
  created() {
    this.windowSize = window.innerWidth;
    window.addEventListener('resize', this.windowResize);
  },
  computed: {
    windowSize: {
      get() {
        return this.$store.state.Covid19.windowSize;
      },
      set(val) {
        this.SET_WINDOW_SIZE(val);
      },
    },
  },
  methods: {
    ...mapMutations('Covid19', [
      'SET_WINDOW_SIZE',
    ]),

    windowResize() {
      this.windowSize = window.innerWidth;
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
}
</style>
