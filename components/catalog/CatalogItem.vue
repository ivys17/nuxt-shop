<template>
  <div class="catalog-item">
    <div class="catalog-item-img"
         @click="goToDetail">
      <div v-if="hasStickers"
           class="catalog-item__stickers">
        <div v-for="sticker in item.tags"
             :class="`catalog-item__sticker--${sticker}`"
             class="catalog-item__sticker"></div>
      </div>

      <nuxt-img
        :alt="item.name"
        :src="item.image"
        format="webp"
        loading="lazy"
        quality="100"
        sizes="xs:375px"
        width="375" />


    </div>
    <div class="catalog-item-info">
      <div class="catalog-item-text">
        <nuxt-link :to="`/menu/${this.currentSectionDataAlias}/${this.item.slug}`"
                   class="catalog-item-name">{{ item.name }}
        </nuxt-link>

        <div class="catalog-item-desc">
          <p>{{ item.description }}</p>
        </div>
      </div>
      <div class="catalog-item-bottom">
        <div class="catalog-item-price">{{ item.price }} ₽</div>


        <client-only>
          <div v-if="item.hasMods || !countInCart"
               class="addcart"
               @click.prevent="addToCart(item)">
            <div>В корзину</div>
          </div>
          <div v-else
               class="product-qnt">
            <div class="qnt-btn qnt-minus"
                 @click="decreaseQtyById"></div>
            <input :value="countInCart"
                   readonly
                   type="text">
            <div class="qnt-btn qnt-plus"
                 @click="addToCart(item)"></div>
          </div>
        </client-only>


      </div>
    </div>
  </div>


</template>
<script>
import LazyHydrate from 'vue-lazy-hydration';

export default {
  components: { LazyHydrate },
  name: 'CatalogItem',
  props: {
    item: {
      type: Object,
      required: true,
    },

    currentSectionDataAlias: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    countInCart() {
      const p = this.$store.getters['cart/cartItems'].find(el => el.product.id === this.item.id);
      return p?.quantity || 0;
    },

    hasStickers() {
      return Boolean(this.item.tags);
    },
  },
  methods: {
    addToCart({ id: productId }) {
      this.$store.dispatch('cart/addItem', { productId });
    },

    decreaseQtyById(idx) {
      this.$store.dispatch('cart/decreaseQtyById', this.item.id);
    },

    goToDetail() {
      this.$router.push(`/menu/${this.currentSectionDataAlias}/${this.item.slug}`);
    },
  },

};
</script>
