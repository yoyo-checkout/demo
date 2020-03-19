<template>
  <div class="home">
    <Header />
    <!-- <Aside />
    <Content />
    <Footer /> -->
  </div>
</template>

<script>
import Header from '@/components/home/Header.vue';
// import Aside from '@/components/home/Aside.vue';
// import Content from '@/components/home/Content.vue';
// import Footer from '@/components/home/Footer.vue';

export default {
  components: {
    Header,
    // Aside,
    // Content,
    // Footer,
  },
};
</script>

<style lang="scss">
.home {
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }
}

@media screen and (max-width: 1024px) {
  .mini-screen-hidden {
    display: none;
  }
}
</style>
