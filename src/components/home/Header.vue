<template>
  <header class="header">
    <div class="header__logo">
      <div class="top"></div>
      <div class="left"></div>
      <div class="front">B</div>
    </div>
    <div class="header__time">22:45:47</div>
    <div class="header__temp">20°C</div>
    <div class="header__marquee">
      ▉ Every element is a plate, present oneself but also extrude others to create a new possibility.
    </div>
    <div class="header__prod">作品列表</div>
    <div class="header__hamburger"></div>
  </header>
</template>

<script>
export default {
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
    background-color: #fff;
    z-index: 1;
  }

  &::before {
    width: calc(100% + 40px);
    height: 20px;
    top: -20px;
    left: -20px;
  }

  &::after {
    width: 20px;
    height: 100vh;
    top: -20px;
    left: -20px;
  }

  &__logo {
    position: relative;
    width: 60px;
    height: 60px;
    transition: transform .3s;
    cursor: pointer;

    &:hover {
      transform: translate3d(30px, 35px, 0px);
    }

    .front,
    .top,
    .left {
      position: absolute;
      border: #000 1px solid;
    }

    .front {
      width: 100%;
      height: 100%;
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
}
</style>
