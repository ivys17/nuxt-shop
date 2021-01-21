<template>
  <article class="catalog__item item-product">
    <header class="item-product__header">
      <div class="item-product__rating rating-block">
        <svg class="rating-block__icon"
             width="14"
             height="14"
             xmlns="http://www.w3.org/2000/svg">

          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 .125c.238 0 .455.135.56.348l1.786 3.619 3.994.583a.625.625 0 01.346 1.066l-2.89 2.815.683 3.976a.625.625 0 01-.907.659L7 11.312l-3.572 1.879a.625.625 0 01-.906-.66l.681-3.975L.313 5.74A.625.625 0 01.66 4.675l3.994-.583L6.44.473A.625.625 0 017 .125zm0 2.037L5.63 4.939a.625.625 0 01-.47.342l-3.067.448L4.31 7.89c.148.144.215.351.18.554l-.523 3.052 2.741-1.442a.625.625 0 01.582 0l2.741 1.442-.523-3.052a.625.625 0 01.18-.553l2.218-2.16-3.066-.45a.625.625 0 01-.47-.34L7 2.161z"
                fill="#F2C94C" />

        </svg>
        <span class="rating-block__count">{{ product.rating }}</span>
      </div>
      <button type="button"
              @click="addProductCart"
              class="item-product__add-to-cart"
              :class="{'item-product__add-to-cart--added': isAdded}"
              :aria-label="`Добавить ${product.name} в корзину`">
        <svg width="12"
             height="14"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.92.74A.6.6 0 012.4.5h7.2a.6.6 0 01.48.24l1.8 2.4a.6.6 0 01.12.36v8.4a1.8 1.8 0 01-1.8 1.8H1.8A1.8 1.8 0 010 11.9V3.5a.6.6 0 01.12-.36l1.8-2.4zm.78.96l-1.5 2v8.2a.6.6 0 00.6.6h8.4a.6.6 0 00.6-.6V3.7l-1.5-2H2.7z" />
          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3.5a.6.6 0 01.6-.6h10.8a.6.6 0 110 1.2H.6a.6.6 0 01-.6-.6zM3.6 5.3a.6.6 0 01.6.6 1.8 1.8 0 103.6 0 .6.6 0 011.2 0 3 3 0 11-6 0 .6.6 0 01.6-.6z" />
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


export default {
  name: 'AppItemProduct',
  props: {
    product: Object,
    default: () => ({}),
  },
  filters: {
    price(value) {
      const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumSignificantDigits: 2,
      });
      return formatter.format(value);

    },
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

<style lang="scss">

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

    > svg {
      fill : #959dad;
    }


    // .item-product__add-to-cart--added
    &--added {
      cursor : default;

      > svg {
        fill : #1f1f1f;
      }
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
