<template>
  <div class="recomend">
    <div class="recomend-title">
      <h3>Добавить к заказу</h3>
    </div>

    <div class="recomend-list">
      <CartRecommendedProduct
          v-for="recommendedProduct in recommendedProducts"
          :key="recommendedProduct.id"
          :item="recommendedProduct" />
    </div>
  </div>
</template>
<script>
import CartRecommendedProduct from '@/components/cart/CartRecommendedProduct';

export default {
  name: 'CartRecommendedProducts',
  components: { CartRecommendedProduct },
  props: {
    recommendedProducts: {
      type: Array,
      required: true,
    },
  },
  computed: {
    productsInCartIds() {
      return this.$store.getters['cart/productsInCartIds'];
    },
    isProductInCart() {
      return this.productsInCartIds.includes(this.item.id);
    },
  },

};
</script>
