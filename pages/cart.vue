<template>
  <div class="basket-page">
    <div class="title">
      <h1>Корзина</h1>
    </div>
    <client-only>
      <div class="wrapper">
        <template v-if="cartItems.length">
          <div class="basket-qnt">
            <span>в ней {{ countItems }} {{ countItemsFormat }}</span>
          </div>

          <div class="basket-bonus-block">
            <div
              v-if="isAuth"
              class="basket-bonus-promo"
            >
              <div class="basket-bonus-arrea">
                <input
                  v-model="coupon"
                  placeholder="Введите промокод"
                  type="text"
                >
                <p
                  v-if="promoError"
                  class="bonus-error"
                >
                  Некорректно введён промокод
                </p>
              </div>

              <div
                :class="{'bonus-btn-ok': isPromoApplied}"
                class="basket-bonus-btn"
              >
                <button
                  v-if="isPromoApplied"
                  @click.prevent="deleteCoupon"
                >
                  удалить
                </button>
                <button
                  v-else
                  @click.prevent="calculateCheckinResult"
                >
                  Применить
                </button>
              </div>
            </div>
            <div
              v-else
              class="basket-login"
            >
              <p>Авторизуйтесь для применения бонусов</p>
              <div class="login-btn">
                <a
                  href
                  @click.prevent="$store.commit('setModalAuth', true );"
                >Войти
                  <img
                    alt="login"
                    src="~/assets/images/icons/login.svg"
                  >
                </a>
              </div>
            </div>
          </div>

          <div class="basket-table">
            <CartItem
              v-for="(cartItem, idx) in cartItems"
              :key="cartItem.product.id + idx"
              :idx="idx"
              :item="cartItem"
            />
          </div>

          <RecommendedProducts
            v-if="recommendedProducts.length"
            :recommended-products="recommendedProducts"
          />

          <template v-if="user.isCompanyEmployee" />
          <BasketBonus v-else-if="isAuth" />
          <div
            v-else
            class="basket-login"
          >
            <p>Авторизуйтесь для применения бонусов</p>
            <div class="login-btn">
              <a
                href
                @click.prevent="$store.commit('setModalAuth', true );"
              >Войти
                <img
                  alt="login"
                  src="~/assets/images/icons/login.svg"
                >
              </a>
            </div>
          </div>

          <div class="cost">
            <div
              v-if="!isCalculateCheckinResultFetching"
              class="cost-info"
            >
              <p class="cost-price">
                Итого: <span>{{ cartTotalAfterDiscounts }} ₽</span>
              </p>
              <p
                v-if="discountTotal > 0"
                class="cost-price"
              >
                Скидка: <span>{{ discountTotal }} ₽</span>
              </p>
            </div>
            <AppSpinner
              v-else
              b-color="#e41d2d"
            />
            <div
              v-if="!isCalculateCheckinResultFetching"
              class="cost-btn"
            >
              <nuxt-link to="checkout">
                Оформить заказ
              </nuxt-link>
            </div>
          </div>
        </template>

        <div
          v-else
          class="empty"
        >
          <div class="basket-img">
            <img
              alt="cart"
              src="~/assets/images/icons/empty.svg"
            >
          </div>
          <div class="basket-info">
            Корзина пустая
          </div>
          <div class="basket-btn">
            <nuxt-link to="/">
              Вернуться на главную
            </nuxt-link>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import plural from 'plural-ru';

import BasketBonus from '@/components/basket/BasketBonus.vue';

import CartItem from '@/components/cart/CartItem';

import RecommendedProducts from '@/components/cart/CartRecommendedProducts';

export default {
  name: 'Basket',
  components: { BasketBonus, RecommendedProducts, CartItem },
  middleware: 'checkout',

  data() {
    return {
      coupon: '',
    };
  },

  computed: {
    cartItems() {
      return this.$store.getters['cart/cartItems'];
    },

    countItems() {
      return this.$store.getters['cart/countItems'];
    },

    countItemsFormat() {
      const count = this.countItems;
      return plural(count, 'товар', 'товара', 'товаров');
    },

    spendBonus() {
      return this.$store.getters['cart/spendBonus'];
    },

    balance() {
      return this.$store.getters['user/balance'];
    },

    cartTotal() {
      return this.$store.getters['cart/cartTotal'];
    },

    user() {
      return this.$store.getters['user/user'];
    },

    cartTotalMinusBonus() {
      return this.$store.getters['cart/cartTotalMinusBonus'];
    },

    cartTotalAfterDiscounts() {
      return this.$store.getters['cart/cartTotalAfterDiscounts'];
    },

    discountTotal() {
      return this.$store.getters['cart/discountTotal'];
    },

    recommendedProducts() {
      return this.$store.getters['catalog/recommendedProducts'];
    },

    isAuth() {
      return this.$store.getters['user/isAuth'];
    },

    isPromoApplied() {
      return !!this.$store.state.cart.appliedCoupon;
    },

    isCalculateCheckinResultFetching() {
      return this.$store.getters['cart/isCalculateCheckinResultFetching'];
    },

    promoError() {
      return this.$store.getters['cart/loyaltyProgramErrors']?.length > 0;
    },
  },
  async created() {
    this.coupon = this.$store.getters['cart/appliedCoupon'];
  },
  methods: {

    async calculateCheckinResult() {
      const coupon = this.coupon.trim();

      if (!coupon.length) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Вы не указали промокод.',
        });
        return;
      }

      await this.$store.dispatch('cart/setAppliedCoupon', coupon);
    },
    async deleteCoupon() {
      await this.$store.dispatch('cart/setAppliedCoupon', '');
    },
  },

};
</script>
