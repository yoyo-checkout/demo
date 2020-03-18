<template>
  <header class="header">
    <div class="header__logo">
      <div class="top"></div>
      <div class="left"></div>
      <div class="front">B</div>
    </div>
    <div class="header__time">
      <div class="time">{{ `${hour}:${minute}:${second}` }}</div>
      <div class="clock">
        <div class="pointer pointer--hour"></div>
        <div class="pointer pointer--min"></div>
        <div class="pointer pointer--sec"></div>
      </div>
    </div>
    <div class="header__marquee">
      ▉ Every element is a plate, present oneself but also extrude others to create a new possibility.
    </div>
    <div class="header__prod">作品列表</div>
    <div class="header__hamburger"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      hour: '',
      minute: '',
      second: '',
    };
  },
  mounted() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  methods: {
    fixTimeFormat(value) {
      return value < 10 ? `0${value}` : value.toString();
    },
    getPointerDegree(time) {
      const SECONDS_HALF_DAY = 60 * 60 * 12;
      const SECONDS_PER_HOUR = 60 * 60;
      const SECONDS_PER_MINUTE = 60;
      const hourDeg = ((time.hour * SECONDS_PER_HOUR
                      + time.min * SECONDS_PER_MINUTE
                      + time.sec)
                      / SECONDS_HALF_DAY) * 360;
      const minDeg = ((time.min * SECONDS_PER_MINUTE + time.sec) / SECONDS_PER_HOUR) * 360;
      const secDeg = (time.sec / SECONDS_PER_MINUTE) * 360;

      return {
        hour: hourDeg,
        min: minDeg,
        sec: secDeg,
      };
    },
    updateTime() {
      const current = new Date();
      const currentHour = current.getHours();
      const currentMin = current.getMinutes();
      const currentSec = current.getSeconds();

      this.hour = this.fixTimeFormat(currentHour);
      this.minute = this.fixTimeFormat(currentMin);
      this.second = this.fixTimeFormat(currentSec);

      const hourPointer = document.querySelector('.pointer--hour');
      const minPointer = document.querySelector('.pointer--min');
      const secPointer = document.querySelector('.pointer--sec');
      const degree = this.getPointerDegree({
        hour: currentHour > 12 ? currentHour - 12 : currentHour,
        min: currentMin,
        sec: currentSec,
      });

      hourPointer.style.transform = `rotate(${degree.hour}deg)`;
      minPointer.style.transform = `rotate(${degree.min}deg)`;
      secPointer.style.transform = `rotate(${degree.sec}deg)`;
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  top: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: 50px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    left: -20px;
    background-color: #fff;
    z-index: 1;
  }

  &::before {
    width: calc(100% + 40px);
    height: 20px;
  }

  &::after {
    width: 20px;
    height: 100vh;
  }

  &__logo {
    position: relative;
    width: 60px;
    height: 60px;
    transition: transform .3s;
    cursor: pointer;

    &:hover {
      transform: translate3d(30px, 30px, 0px);
    }

    .front,
    .top,
    .left {
      position: absolute;
      border: 1px solid #000;
      background-color: #fff;
    }

    .front {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 60px;
    }

    .top {
      top: -50%;
      width: 100%;
      height: 50%;
      transform-origin: bottom;
      transform: skewX(45deg);
      border-bottom: 0;
    }

    .left {
      left: -50%;
      width: 50%;
      height: 100%;
      transform-origin: right;
      transform: skewY(45deg);
      border-top: 0;
      border-right: 0;
    }
  }

  &__time {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 170px;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    line-height: 50px;
    font-size: 20px;
    font-weight: 500;

    .time {
      width: 80px;
      text-align: center;
    }

    .clock {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px double #000;
    }

    .pointer {
      position: absolute;
      bottom: 50%;
      left: 50%;
      width: 1px;
      transform-origin: center bottom;
      background-color: #000;

      &--hour {
        height: 11px;
      }

      &--min {
        height: 15px;
      }

      &--sec {
        height: 15px;
        background-color: red;
      }
    }
  }
}
</style>
