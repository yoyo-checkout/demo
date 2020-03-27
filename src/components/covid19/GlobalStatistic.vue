<template>
  <div class="global">
    <div class="global__title">
      目前全球數據
      <span class="updatetime">更新時間: {{ lastUpdateTime }}</span>
    </div>
    <div>
      <number
        class="global__number"
        :from="0"
        :to="globalStatistic.cases"
        :format="numberFormat"
        :duration="2"
        easing="Power4.easeOut"
      />
      <div>確診數</div>
    </div>
    <div>
      <number
        class="global__number"
        :from="0"
        :to="globalStatistic.deaths"
        :format="numberFormat"
        :duration="2"
        easing="Power4.easeOut"
      />
      <div>死亡數</div>
    </div>
    <div>
      <number
        class="global__number"
        :from="0"
        :to="globalStatistic.recovered"
        :format="numberFormat"
        :duration="2"
        easing="Power4.easeOut"
      />
      <div>治癒數</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  mounted() {
    this.getGlobalStatistics();
  },
  computed: {
    ...mapState('Covid19', {
      globalStatistic: (state) => state.globalStatistic,
    }),

    lastUpdateTime() {
      const lastTime = new Date(this.globalStatistic.updated);

      return `${lastTime.getFullYear()}.${lastTime.getMonth() + 1}.${lastTime.getDate()}`;
    },
  },
  methods: {
    ...mapActions('Covid19', [
      'getGlobalStatistics',
    ]),

    numberFormat(number) {
      const numberWithoutFloat = parseInt(number.toFixed(0), 10);
      return numberWithoutFloat.toLocaleString('en-US');
    },
  },
};
</script>

<style lang="scss">
.global {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  text-align: center;
  color: #fff;

  &__title {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-end;
    width: 100%;

    .updatetime {
      margin-left: 5px;
      font-size: .5rem;
    }
  }

  &__number {
    font-size: 1.5rem;
  }
}
</style>
