<template>
  <main class="main">
    <div class="main__cardwrapper">
      <template v-for="index in 200">
        <div class="card left" :style="`background-position: -${index * 3}px;`"></div>
        <div class="card right" :style="`background-position: -${index * 3}px;`"></div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.main {
  position: relative;
  top: 50px;
  left: 40px;
  bottom: 30px;
  width: calc(100% - 40px);
  height: calc(100vh - 90px);
  border: 1px solid #000;
  border-top: 0;
  border-left: 0;

  &__cardwrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: auto;
    width: 600px;
    height: 200px;
    transform: translate(-50%, -50%);
    animation: flipwrapper 4.5s 0s infinite alternate ease-in-out;

    @keyframes flipwrapper {
      0% {
        transform: perspective(1500px) translate(-50%, -50%) rotateY(-25deg);
      }

      100% {
        transform: perspective(1500px) translate(-50%, -50%) rotateY(25deg);
      }
    }

    .card {
      display: inline-block;
      width: .5%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 600px 200px;

      &.left {
        background-image: url('../../assets/lenticular-left.jpg');
        animation: flipcardleft 4.5s 0s infinite alternate ease-in-out;

        @keyframes flipcardleft {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }

          50% {
            transform: rotateY(45deg);
            opacity: 1;
          }

          100% {
            transform: rotateY(89deg);
            opacity: .5;
          }
        }
      }

      &.right {
        margin-left: -3px;
        background-image: url('../../assets/lenticular-right.jpg');
        animation: flipcardright 4.5s 0s infinite alternate ease-in-out;

        @keyframes flipcardright {
          0% {
            transform: rotateY(89deg);
            opacity: .5;
          }

          50% {
            transform: rotateY(45deg);
            opacity: 1;
          }

          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .main {
    left: 0;
    width: 100%;
    border-left: 1px solid #000;
    z-index: 1;
  }
}
</style>
