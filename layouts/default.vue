<template>
  <div>
    <div class="page">
      <app-header></app-header>
      <div class="pade__content content">
        <div class="container content__container">
          <header class="content__header">
            <h1 class="content__title">Каталог</h1>
            <app-sort></app-sort>
          </header>
          <div class="content__inner">
            <app-sidebar :categories="categories"></app-sidebar>
            <nuxt></nuxt>
          </div>

        </div>

      </div>
    </div>
    <app-overlay v-if="isOverlayShown"></app-overlay>
    <app-cart :is-cart-shown="isCartShown"></app-cart>
  </div>
</template>
<script>
import AppCart from '~/components/Cart/AppCart';
import AppSidebar from '~/components/AppSidebar';
import AppHeader from '~/components/AppHeader';
import AppOverlay from '~/components/AppOverlay';
import AppSort from '~/components/AppSort';

export default {
  components: {
    AppSort,
    AppOverlay,
    AppHeader,
    AppSidebar,
    AppCart,
  },

  data() {
    return {
      isOverlayShown: false,
      isCartShown: false,
    };
  },

  methods: {},
  computed: {
    categories() {
      return this.$store.getters['catalog/categories'];
    },
  },
  created() {
    this.$nuxt.$on('hide-cart', () => {
      this.isOverlayShown = false;
      this.isCartShown = false;
    });

    this.$nuxt.$on('show-cart', () => {
      this.isOverlayShown = true;
      this.isCartShown = true;
    });
  },
  mounted() {
    this.$store.dispatch('cart/initCart');
  }
};
</script>
<style lang="scss">


.page {
  // .page__header
  &__header {
    position : sticky;
    top : 0;
    z-index : 10;
  }

  // .page__main
  &__main {
    flex-grow : 1;
  }
}


.container {
}

.cart-block {
  position   : relative;
  background : none;

  // .cart-block__icon
  &__icon {

  }

  // .cart-block__count
  &__count {
    font-size        : 8px;
    font-weight      : bold;
    line-height      : 1;
    position         : absolute;
    top              : -4px;
    right            : -4px;
    display          : flex;
    align-items      : center;
    justify-content  : center;
    width            : 12px;
    height           : 12px;
    color            : #fff;
    border-radius    : 50%;
    background-color : #959dad;
  }
}

.pade {
  // .pade__content
  &__content {
  }
}

.content {
  // .content__container
  &__container {
  }

  // .content__header
  &__header {
    display         : flex;
    align-items     : center;
    justify-content : space-between;
    padding         : 40px 0;
  }

  // .content__inner
  &__inner {
    display : flex;
  }

  // .content__sidebar
  &__sidebar {
    flex-basis   : 150px;
    flex-grow    : 0;
    flex-shrink  : 0;
    margin-right : 30px;
    min-width : 160px;
  }

  // .content__title
  &__title {
    font-size   : 32px;
    font-weight : bold;
    line-height : 41px;

    /* black */
    color       : #1f1f1f;
  }

  // .content__sort
  &__sort {
  }
}


.sidebar {
  // .sidebar__nav
  &__nav {
  }

  // .sidebar__catalog-menu
  &__catalog-menu {
  }
}

.catalog-menu {
  font-size   : 16px;
  line-height : 21px;


  // .catalog-menu__item
  &__item {
    margin : 0 0 16px;

  }

  // .catalog-menu__link
  &__link {
    text-decoration : none;
    /* grey-light */
    color           : #959dad;

    &:hover {
      /* grey */
      color : #59606d;
    }

    // .catalog-menu__item--active
    &--active {
      /* black */
      color                : #1f1f1f;
      text-decoration-line : underline;
    }

  }
}



.main {
  // .main__catalog
  &__catalog {
  }
}

.catalog {
  // .catalog__inner
  &__inner {
    display   : flex;
    flex-wrap : wrap;
    margin    : 0 -16px;
  }

  // .catalog__item
  &__item {
    width     : 100%;
    max-width : calc(100% / 4 - 16px);
    margin    : 0 8px 16px;

  }
}



.rating-block {
  display     : flex;
  align-items : center;
  // .rating-block__icon
  &__icon {
    margin-right : 3px;
  }

  // .rating-block__count
  &__count {
    font-size   : 10px;
    font-weight : bold;
    line-height : 13px;
    /* Yellow */
    color       : #f2c94c;
  }
}


.btn {
  font-size        : 16px;
  line-height      : 21px;
  display          : flex;
  align-items      : flex-end;
  justify-content  : center;
  width            : 100%;
  /* white */
  margin-top       : 24px;
  padding          : 15px;
  transition       : all 0.32s;
  text-align       : center;
  color            : #fff;
  border-radius    : 8px;
  background-color : #1f1f1f;

  &:active,
  &:focus,
  &:hover {
    background-color : #59606d;
  }
}


</style>
