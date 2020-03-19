<template>
  <aside class="aside mini-screen-hidden">
    Lorem ipsum adipiscing elit.
  </aside>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.aside {
  position: fixed;
  left: 20px;
  top: 0;
  width: 40px;
  height: calc(100vh - 40px);
  border: 1px solid #000;
  writing-mode: vertical-rl;
  line-height: 35px;
  transform: rotate(180deg);
  text-align: center;
  letter-spacing: 1px;
  z-index: -1;
}
</style>
