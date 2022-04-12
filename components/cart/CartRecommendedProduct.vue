<template>
  <div class="recomend-item">
    <div class="recomend-img">
      <nuxt-img
        :alt="item.name"
        :src="item.image"
        format="webp"
        loading="lazy"
        quality="100"
        width="199" />
    </div>
    <div class="recomend-info">
      <div class="recomend-name">
        <h4>{{ item.name }}</h4>
      </div>
      <div class="recomend-bottom">
        <div class="recomend-addcart"
             @click="addToCart(item.id)">
          <p>Добавить</p>
          <span></span>
        </div>
        <div class="recomend-price">
          <span>{{ item.price }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartRecommendedProduct',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart(productId) {
      this.$store.dispatch('cart/addItem', { productId });
    },
  },
};
</script>
