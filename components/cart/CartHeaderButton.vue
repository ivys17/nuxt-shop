<template>
  <client-only>
    <div
      :class="{active: isCartPage}"
      class="header-cart"
    >
      <a @click.prevent="clickHandler">
        <span
          v-if="!isCalculateCheckinResultFetching"
          class="cart-text"
        >{{ cartTotalAfterDiscounts }} ₽ </span>
        <AppSpinner v-else />
        <span class="cart-bg" />
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
<style lang="scss">
.header-cart {

  font-size   : 14px;
  line-height : 17px;

  @media screen and (max-width : 1199px) {
    position : absolute;
    top      : 16px;
    right    : 20px;
  }
}

.header-cart a {
  align-items     : center;
  justify-content : space-between;
  width           : 145px;
  height          : 48px;
  padding         : 8px 15px 8px 17px;
  cursor          : pointer;
  color           : #fff;
  border-radius   : 12px;
  background      : #e41d2d;
}

.header-cart .cart-qnt {

  font-size       : 10px;
  line-height     : 12px;
  position        : absolute;
  top             : -2px;
  right           : 2px;
  display         : none;
  align-items     : center;
  flex-direction  : column;
  justify-content : center;
  width           : 16px;
  height          : 16px;
  color           : #091b5b;
  border-radius   : 50%;
  background      : #fff;
}

.header-cart.active .cart-qnt {
  display : none;
}

.header-cart.active .cart-bg {
  background : url(~/assets/images/icons/basket-close.svg) right no-repeat;
}

.header-cart a {
  display   : flex;
  flex-wrap : wrap;

  @media screen and (max-width : 1199px) {
    align-items     : center;
    flex-direction  : column;
    justify-content : center;
    width           : 62px;
    height          : 56px;
    padding         : 2px 7px 0 7px;
  }
}

</style>
