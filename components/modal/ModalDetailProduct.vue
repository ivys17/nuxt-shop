<template>
  <div
    v-if="isOpen"
    class="product-modal"
  >
    <div class="product">
      <div
        class="product-close"
        @click="close"
      >
        <img
          alt="close"
          src="@/assets/images/icons/close.svg"
        >
      </div>
      <div class="product-box">
        <div class="product-top">
          <div class="product-img">
            <nuxt-img
              :alt="product.name"
              :src="imagePath"
              format="webp"
              heigth="578"
              loading="lazy"
              quality="70"
              width="578"
            />
          </div>

          <client-only>
            <template v-if="product.hasMods || !countInCart">
              <div
                class="catalog-cart"
                @click.prevent="addToCart(product)"
              >
                <div class="catalog-cart-img">
                  <img
                    alt="cart"
                    src="@/assets/images/icons/cart.svg"
                  >
                </div>
                <div class="catalog-price">
                  {{ product.price }} ₽
                </div>
              </div>
            </template>
            <template v-else>
              <div class="catalog-cart">
                <div
                  class="plus"
                  @click.prevent="addToCart(product)"
                />
                {{ countInCart }} шт.
                <div
                  class="minus"
                  @click.prevent="decreaseQtyById"
                />
              </div>
            </template>
          </client-only>
        </div>

        <div class="product-content">
          <div class="product-name">
            {{ product.name }}
          </div>
          <div class="product-weight">
            {{ product.weight * 1000 }} гр
          </div>
          <div class="product-detail">
            <table>
              <tbody>
                <tr>
                  <td>ккал</td>
                  <td>белки</td>
                  <td>жиры</td>
                  <td>углеводы</td>
                </tr>
                <tr>
                  <td>{{ product.energyAmount.toFixed(1) }}</td>
                  <td>{{ product.fiberAmount.toFixed(1) }}</td>
                  <td>{{ product.fatAmount.toFixed(1) }}</td>
                  <td>{{ product.carbohydrateAmount.toFixed(1) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="product-desc">
            <template v-if="product.composition && product.composition.trim().length">
              <div class="product-desc-title">
                Состав
              </div>
              <p>{{ product.composition }}</p>
            </template>

            <template v-if="product.description && product.description.trim().length">
              <div class="product-desc-title">
                Описание
              </div>
              <p>{{ product.description }}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ModalDetailProduct',
  computed: {
    isOpen() {
      return !!this.product;
    },

    product() {
      return this.$store.state.modal.productDetailData;
    },

    imagePath() {
      return this.product.images[0]?.uploadedUrl || this.product.images[0]?.imageUrl || '/theme/stub.png';
    },

    isFavorite() {
      return this.$store.getters['user/favorites'].includes(this.product.id);
    },

    countInCart() {
      const p = this.$store.getters['cart/cartItems'].find((el) => el.product.id === this.product.id);
      return p?.quantity || 0;
    },
  },
  methods: {
    close() {
      this.$store.commit('modal/setProductDetailData', null);
    },

    addToCart() {
      this.$store.dispatch('cart/addItem', { productId: this.product.id });
    },

    decreaseQtyById() {
      this.$store.dispatch('cart/decreaseQtyById', this.product.id);
    },

    toggleFavorite() {
      const { id } = this.product;
      this.isFavorite
        ? this.$store.dispatch('user/removeFavorites', id)
        : this.$store.dispatch('user/addFavorites', id);
    },
    async like() {
      try {
        const likes = this.product.likes + 1;
        this.$store.commit('catalog/setLikes', { id: this.product.id, likes });

        await this.$axios.patch('/api/catalog/product/like', null, {
          params: {
            id: this.product.id,
          },
        });
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>
