import Vue from 'vue';
import VueRouter from 'vue-router';
import Covid19 from '../views/Covid19.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Covid19',
    component: Covid19,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
