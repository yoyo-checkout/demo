<template>
  <header class="header">
    <div class="header__logo">
      <div class="top"></div>
      <div class="left"></div>
      <div class="front">B</div>
    </div>
    <div class="header__time mini-screen-hidden">
      <div class="time">{{ `${hour}:${minute}:${second}` }}</div>
      <div class="clock">
        <div class="pointer pointer--hour"></div>
        <div class="pointer pointer--min"></div>
        <div class="pointer pointer--sec"></div>
      </div>
    </div>
    <div class="header__marquee">
      <span class="marquee">▉ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium ante erat, vitae sodales mi varius quis.</span>
    </div>
    <div class="header__space">
      <router-link class="text" to="/covid-19">肺炎</router-link>
    </div>
    <div class="header__hamburger" @click="toggleHamburger">
      <div
        class="icon"
        :class="[{ 'active': isHamburgerActive }, { 'unactive': !initHamburger && !isHamburgerActive }]"
      >
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      hour: '',
      minute: '',
      second: '',
      isHamburgerActive: false,
      initHamburger: true, // 初始化漢堡選單不啟動 unactive 樣式動畫
      clockInterval: null,
    };
  },
  mounted() {
    this.clockInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.clockInterval);
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
    toggleHamburger() {
      this.isHamburgerActive = !this.isHamburgerActive;
      this.initHamburger = false;
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
  z-index: 1;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    left: -20px;
    background-color: #fff;
    z-index: 2;
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
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
    transition: transform .3s;
    z-index: 1;
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
    flex-shrink: 0;
    padding: 0 15px;
    width: 190px;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    line-height: 50px;
    font-size: 20px;
    font-weight: 500;

    .time {
      width: 80px;
      text-align: center;
      letter-spacing: 1.5px;
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

  &__marquee {
    flex-grow: 1;
    position: relative;
    width: 880px;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    line-height: 50px;
    letter-spacing: 1.5px;
    white-space: nowrap;
    overflow: hidden;

    .marquee {
      position: absolute;
      animation: marquee 15s infinite linear;
    }

    @keyframes marquee {
      from {
        left: 880px;
      }

      to {
        left: -1015px;
      }
    }
  }

  &__space {
    position: relative;
    width: 220px;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    line-height: 50px;
    cursor: pointer;

    &:hover {
      &::before {
        width: 100%;
      }

      .text {
        color: #fff;
      }
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 100%;
      background-color: #000;
      transition: width .5s;
    }

    .text {
      position: absolute;
      display: block;
      width: 100%;
      color: #000;
      text-decoration: none;
      text-align: center;
      z-index: 1;
      transition: color .25s;
    }
  }

  &__hamburger {
    flex-shrink: 0;
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    border-left: 0;
    cursor: pointer;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &.active {
        .line1 {
          animation: hamburgerline1 .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline1 {
            0% {
              transform: translateY(0) rotate(0);
            }

            50% {
              transform: translateY(8.5px) rotate(0);
            }

            100% {
              transform: translateY(8.5px) rotate(-135deg);
            }
          }
        }

        .line2 {
          animation: hamburgerline2 .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline2 {
            0% {
              transform: scale(1);
            }

            100% {
              transform: scale(0);
            }
          }
        }

        .line3 {
          animation: hamburgerline3 .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline3 {
            0% {
              transform: translateY(0) rotate(0);
            }

            50% {
              transform: translateY(-8.5px) rotate(0);
            }

            100% {
              transform: translateY(-8.5px) rotate(135deg);
            }
          }
        }
      }

      &.unactive {
        .line1 {
          animation: hamburgerline1-rev .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline1-rev {
            0% {
              transform: translateY(8.5px) rotate(-135deg);
            }

            50% {
              transform: translateY(8.5px) rotate(0);
            }

            100% {
              transform: translateY(0) rotate(0);
            }
          }
        }

        .line2 {
          animation: hamburgerline2-rev .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline2-rev {
            0% {
              transform: scale(0);
            }

            100% {
              transform: scale(1);
            }
          }
        }

        .line3 {
          animation: hamburgerline3-rev .7s cubic-bezier(.30, 1, .7, 1) forwards;

          @keyframes hamburgerline3-rev {
            0% {
              transform: translateY(-8.5px) rotate(135deg);
            }

            50% {
              transform: translateY(-8.5px) rotate(0);
            }

            100% {
              transform: translateY(0) rotate(0);
            }
          }
        }
      }
    }

    .line {
      width: 30px;
      height: 3px;
      border-radius: 3px;
      background-color: #000;
    }

    .line2 {
      margin: 5.5px 0;
    }
  }
}
</style>
