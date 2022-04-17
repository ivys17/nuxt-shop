<template>
  <div class="cart-bonus">
    <div class="cart-bonus-check">
      <label>
        <input
          v-model="isApplied"
          type="checkbox"
          @change="applyBonus"
        >
        <span class="bonus-mark" />
        <span
          class="cart-bonus-text"
          @click.prevent="applyBonus"
        >Применить к заказу
          <span>{{ bonus }}
            <img
              alt="rubl"
              src="~/assets/images/icons/rubl.svg"
            ></span>
        </span>
      </label>
    </div>
    <div class="cart-bonus-rule">
      <nuxt-link to="/bonus">
        Правила бонусной программы
      </nuxt-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BasketBonus',
  data() {
    return {
      isApplied: false,
    };
  },
  computed: {
    bonus() {
      const canBonusSpend = Math.floor(this.cartTotal / 2);
      return Math.min(canBonusSpend, this.balance);
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal'];
    },
    balance() {
      return this.$store.getters['user/balance'];
    },
    spendBonus() {
      return this.$store.getters['cart/spendBonus'];
    },
  },
  created() {
    this.isApplied = this.spendBonus > 0;
  },
  methods: {
    applyBonus() {
      if (this.isApplied) {
        this.$store.commit('cart/setSpendBonus', this.bonus);
      } else {
        this.$store.commit('cart/setSpendBonus', 0);
      }
    },
  },
};
</script>
