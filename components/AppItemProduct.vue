<template>
  <article class="catalog__item item-product">
    <header class="item-product__header">
      <app-rating :rating="product.rating"
                  class-name="item-product__rating"></app-rating>
      <button type="button"
              @click="addProductCart"
              class="item-product__add-to-cart"
              :class="{'item-product__add-to-cart--added': isAdded}"
              :aria-label="`Добавить ${product.name} в корзину`">

        <svg
          width="12"
          height="14">
          <use xlink:href="#cart-icon"></use>
        </svg>
      </button>
    </header>
    <div class="item-product__image">
      <img :src="product.photo"
           :alt="product.name">
    </div>
    <footer class="item-product__footer">
      <a href=""
         class="item-product__title">{{ product.name }}</a>
      <div class="item-product__price">{{ product.price | price }}</div>
    </footer>
  </article>
</template>

<script>


import AppRating from '~/components/AppRating';

export default {
  name: 'AppItemProduct',
  components: { AppRating },
  props: {
    product: Object,
    default: () => ({}),
  },
  methods: {
    addProductCart() {
      if (this.isAdded) {
        return;
      }
      const product = { ...this.product };
      this.$store.dispatch('cart/addProductCart', product);
    },
  },
  computed: {
    cartProducts() {
      return this.$store.getters['cart/cartProducts'];
    },

    isAdded() {
      return !!this.cartProducts.find(el => el.id === this.product.id);
    },

  },

};
</script>

<style scoped
       lang="scss">

.item-product {
  position      : relative;
  padding       : 16px;
  border-radius : 8px;
  background    : #fff;
  box-shadow    : 0 4px 16px rgba(0, 0, 0, 0.05);

  // .item-product__header
  &__header {
    display         : flex;
    align-items     : center;
    justify-content : space-between;
  }

  // .item-product__rating
  &__rating {

  }

  // .item-product__add-to-cart
  &__add-to-cart {
    border     : none;
    background : none;
    color      : $grey-light-color;


    // .item-product__add-to-cart--added
    &--added {
      cursor : default;
      color  : $black-color;


    }
  }

  // .item-product__image
  &__image {
    display         : flex;
    align-items     : center;
    justify-content : center;
  }

  // .item-product__footer
  &__footer {
  }

  // .item-product__title
  &__title {
    font-weight     : 400;
    display         : block;
    overflow        : hidden;
    margin-top      : 16px;
    margin-bottom   : 0;
    white-space     : nowrap;
    text-decoration : none;
    text-overflow   : ellipsis;
    color           : $grey-color;
  }

  // .item-product__price
  &__price {
    font-weight : bold;
    /* black */
    margin-top  : 6px;
    color       : #1f1f1f;
  }
}
</style>
