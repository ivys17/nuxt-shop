<template>
  <client-only>
    <div :class="{active: isCartPage}"
         class="header-cart">
      <a @click.prevent="clickHandler">
      <span v-if="!isCalculateCheckinResultFetching"
            class="cart-text">{{ cartTotalAfterDiscounts }} ₽ </span>
        <AppSpinner v-else />
        <span class="cart-bg"></span>
      </a>
    </div>
  </client-only>
</template>
<script>
import AppSpinner from '~/components/AppSpinner.vue';

export default {
  name: 'CartHeaderButton',
  components: {
    AppSpinner,
  },
  computed: {

    isCartPage() {
      return this.$route.fullPath === '/cart';
    },

    cartTotalAfterDiscounts() {
      return this.$store.getters['cart/cartTotalAfterDiscounts'];
    },

    isCalculateCheckinResultFetching() {
      return this.$store.getters['cart/isCalculateCheckinResultFetching'];
    },

  },
  methods: {
    clickHandler() {
      if (this.countItems === 0) {
        this.$store.commit('setModalCartEmptyActive', true);
      } else if (!this.isCartPage) {
        this.$router.push('/cart');
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
