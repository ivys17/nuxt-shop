<template>
  <button type="button"
          aria-label="Показать корзину покупателя"
          @click="showCart"
          class="header__cart cart-block">
    <svg
      class="cart-block__icon"
      fill="none"
      width="24"
      height="27"
      xmlns="http://www.w3.org/2000/svg">
      <use xlink:href="#cart-icon" />
    </svg>


    <span class="cart-block__count">{{ cartCount }}</span>
  </button>
</template>

<script>
export default {
  name: 'AppCartIcon',
  methods: {
    showCart() {
      this.$nuxt.$emit('show-cart');
    },
  },
  computed: {
    cartCount() {
      return this.$store.getters['cart/cartCount'];
    },
  },
};
</script>

<style scoped
       lang="scss">

.cart-block {
  position   : relative;
  background : none;

  // .cart-block__icon
  &__icon {

  }

  // .cart-block__count
  &__count {
    font-size        : 8px;
    font-weight      : bold;
    line-height      : 1;
    position         : absolute;
    top              : -4px;
    right            : -4px;
    display          : flex;
    align-items      : center;
    justify-content  : center;
    width            : 12px;
    height           : 12px;
    color            : #fff;
    border-radius    : 50%;
    background-color : $grey-light-color;
  }
}
</style>
