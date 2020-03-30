<template>
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('Covid19', {
      windowSize: (state) => state.windowSize,
    }),
  },
};
</script>

<style lang="scss">
.legend-table {
  position: absolute;
  top: 110px;
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
</style>
