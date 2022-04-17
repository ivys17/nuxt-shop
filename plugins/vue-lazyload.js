import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad, {
  // error: require('@/assets/images/catalog/stub.png'),
  // loading: require('@/assets/images/catalog/stub.png'),
  attempt: 3,
});
