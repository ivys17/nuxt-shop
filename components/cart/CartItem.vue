<template>
  <div class="basket-product">
    <div class="basket-product-img">
      <nuxt-img
        :alt="item.name"
        :src="imagePath"
        format="webp"
        loading="lazy"
        quality="70"
        sizes="xs:510px"
        width="510"
      />
    </div>
    <div class="basket-product-info">
      <div class="basket-desc">
        <div class="basket-product-name">
          <h4>{{ product.name }}</h4>
        </div>
        <p>{{ product.description }}</p>
        <p>{{ mods }}</p>
      </div>
      <div class="basket-additionally">
        <div
          v-if="!item.isGift"
          class="basket-count"
        >
          <div
            class="minus"
            @click.prevent="decreaseQty(product)"
          >
            <svg
              fill="none"
              height="4"
              viewBox="0 0 12 4"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1.8999C0 1.07148 0.671573 0.399902 1.5 0.399902H10.5C11.3284 0.399902 12 1.07148 12 1.8999C12 2.72833 11.3284 3.3999 10.5 3.3999H1.5C0.671573 3.3999 0 2.72833 0 1.8999Z"
                fill="white"
              />
            </svg>
          </div>
          <span>{{ item.quantity }}</span>
          <div
            class="plus"
            @click.prevent="addToCart(product)"
          >
            <svg
              fill="none"
              height="12"
              viewBox="0 0 12 12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2771 4.69683H7.34632V1.76608C7.34632 1.04605 6.74157 0.456665 6.02127 0.456665C5.30097 0.456665 4.69622 1.04605 4.69622 1.76608V4.69683H1.76547C1.04544 4.69683 0.456055 5.30158 0.456055 6.02188C0.456055 6.74218 1.04544 7.34693 1.76547 7.34693H4.69622V10.2777C4.69622 10.9977 5.30097 11.5871 6.02127 11.5871C6.74157 11.5871 7.34632 10.9977 7.34632 10.2777V7.34693H10.2771C10.9971 7.34693 11.5865 6.74218 11.5865 6.02188C11.5865 5.30158 10.9971 4.69683 10.2771 4.69683Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div
          v-if="!item.isGift"
          class="basket-price"
        >
          <span>{{ totalItemPrice }} ₽</span>
          <div
            class="product-del"
            @click="removeFromCart(idx)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  computed: {
    product() {
      return this.item.product;
    },

    totalItemPrice() {
      const modSumPrice = this.item.mods.reduce((acc, el) => acc + el.price, 0);
      return (this.product.price + modSumPrice) * this.item.quantity;
    },

    imagePath() {
      return this.product.image;
    },

    mods() {
      return this.item.mods.map((mod) => mod.name).join(', ');
    },

  },
  methods: {
    addToCart({ id: productId }) {
      this.$store.dispatch('cart/addItem', { productId });
    },
    removeFromCart() {
      this.$store.dispatch('cart/removeItemByIndex', this.idx);
    },
    decreaseQty() {
      this.$store.dispatch('cart/decreaseQtyByIndex', this.idx);
    },
  },

};
</script>
