<template>
  <footer class="footer">
    <div class="footer__fb mini-screen-hidden">
      <div class="right"></div>
      <div class="bottom"></div>
      <div class="front">F</div>
    </div>
    <div class="footer__tel">02-1234-5678</div>
    <div class="footer__email">hi@hello.tw</div>
    <div class="footer__space"></div>
    <div class="footer__addr">金門縣烈嶼鄉涵碧路八段165號89樓</div>
  </footer>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left: 40px;
  bottom: 20px;
  width: 80%;
  max-width: 1000px;
  height: 40px;
  background-color: #fff;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: -20px;
    bottom: -20px;
    width: calc(100% + 40px);
    height: 20px;
    background-color: #fff;
    z-index: 2;
  }

  &__fb {
    position: relative;
    width: 40px;
    height: 40px;
    border: 1px solid #000;
    color: #fff;
    transition: transform .3s;
    cursor: pointer;

    &:hover {
      transform: translate3d(-20px, -20px, 0px);
    }

    .right,
    .bottom,
    .front {
      position: absolute;
      background-color: #fff;
    }

    .front {
      width: 100%;
      height: 100%;
      background-color: #000;
      text-align: center;
      line-height: 40px;
    }

    .right {
      right: -20px;
      top: 0;
      width: 50%;
      height: 100%;
      transform-origin: left;
      transform: skewY(45deg);
      border: 1px solid #000;

      border-right: 0;
      border-left: 0;
    }

    .bottom {
      left: 0;
      bottom: -20px;
      width: 100%;
      height: 50%;
      transform-origin: top;
      transform: skewX(45deg);
      border: 1px solid #000;

      border-top: 0;
      border-right: 0;
    }
  }

  &__tel {
    padding: 0 0 0 50px;
    height: 100%;
    line-height: 40px;
    background-color: #fff;
    border: 1px solid #000;
    border-right: 0;
    z-index: 1;
  }

  &__email {
    padding: 0 0 0 50px;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    border-right: 0;
    line-height: 40px;
  }

  &__space {
    flex-grow: 1;
    height: 100%;
    border: 1px solid #000;
    border-left: 0;
    border-right: 0;
  }

  &__addr {
    padding: 0 20px 0 0;
    height: 100%;
    line-height: 40px;
    border: 1px solid #000;
    border-left: 0;
  }
}

@media screen and (max-width: 1024px) {
  .footer {
    left: 20px;
    max-width: none;
    width: calc(100% - 40px);
  }
}

@media screen and (max-width: 670px) {
  .footer {
    font-size: small;

    &__tel,
    &__email {
      padding: 0 0 0 5px;
    }

    &__addr {
      padding: 0 5px 0 0;
    }
  }
}
</style>
