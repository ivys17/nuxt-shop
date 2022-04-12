<template>
  <div>
    <div class="checkout-agree agree">
      <input
        id="agree"
        v-model="agree"
        checked=""
        class="checkbox"
        type="checkbox">
      <label for="agree"></label>
      <p>Я согласен с условиями
        <a href="/policy.pdf"
           target="_blank">обработки моих персональных данных</a>
      </p>
    </div>
    <div class="cart-sum checkout-sum">
      <div class="cart-sum-top">
        <p>Сумма</p>
        <p>{{ cartTotalMinusBonus }} ₽</p>
      </div>
      <div v-if="agree"
           class="cart-sum-btn"
           @click.prevent="sendOrder">
        <button>Оформить заказ</button>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'CheckoutTotal',
  props: {
    cartTotalMinusBonus: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      agree: true,
    };
  },
  methods: {
    sendOrder() {
      this.$emit('sendOrder');
    },
  },
};
</script>
