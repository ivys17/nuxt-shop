<template>

  <div class="popup-cart"
       v-if="isCartShown">
    <header class="popup-cart__header">
      <div class="popup-cart__title">Корзина</div>
      <button type="button"
              @click="hideCart"
              aria-label="Закрыть корзину"
              class="popup-cart__close">
        <svg width="14"
             height="14"
             viewBox="0 0 14 14"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893Z"
                fill="black" />
          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                fill="black" />
        </svg>
      </button>
    </header>
    <div class="popup-cart__inner">
      <div v-if="cartCount === 0 && !isCompleted"
           class="popup-cart__empty empty-cart-block">
        <div class="empty-cart-block__text ">
          Пока что вы ничего не добавили в корзину.
        </div>
        <button type="submit"
                @click="hideCart"
                class="btn popup-cart__btn btn">Перейти к выбору
        </button>
      </div>
      <div v-else-if="cartCount > 0 && !isCompleted"
           class="popup-cart__content content-cart-block">
        <div class="content-cart-block__title">Товары в корзине</div>
        <div class="content-cart-block__list">
          <app-cart-item  v-for="(product, index) in products" :key="index"  :product="product"></app-cart-item>

        </div>

        <app-form @orderIsCompleted="clearCart"></app-form>
      </div>
      <div v-else
           class="popup-cart__completed completed-cart-block">
        <div class="completed-cart-block__title">Заявка успешно отправлена</div>
        <div class="completed-cart-block__text">Вскоре наш менеджер свяжется с Вами</div>
      </div>

    </div>
  </div>


</template>

<script>
import AppForm from '~/components/Cart/AppForm';
import AppCartItem from '~/components/Cart/AppCartItem';

export default {
  name: 'AppCart',
  components: { AppCartItem, AppForm },
  props: {
    isCartShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCompleted: false,
    };
  },

  methods: {
    hideCart() {
      this.$nuxt.$emit('hide-cart');
      this.isCompleted = false;
    },
    clearCart() {
      this.$store.dispatch('cart/clearCart');
      this.isCompleted = true;
    },
  },

  computed: {
    cartCount() {
      return this.$store.getters['cart/cartCount'];
    },
    products() {
      return this.$store.getters['cart/cartProducts'];
    },
  },

  filters: {

  },
};
</script>

<style scoped
       lang="scss">
.popup-cart {
  position       : fixed;
  top            : 0;
  right          : 0;
  display        : flex;
  overflow       : auto;
  width          : 100%;
  max-width      : 460px;
  height         : 100vh;
  padding        : 52px 48px;
  border-radius  : 8px 0 0 8px;
  background     : #ffffff;
  box-shadow     : -4px 0px 16px rgba(0, 0, 0, 0.05);
  flex-direction : column;
  z-index        : 100;

  // .popup-cart--hide
  &--hide {
    display : none;
  }

  // .popup-cart__header
  &__header {
  }

  // .popup-cart__title
  &__title {
    font-size     : 32px;
    font-weight   : bold;
    line-height   : 41px;
    margin-bottom : 24px;
    color         : #000;

  }

  // .popup-cart__close
  &__close {
    position   : absolute;
    top        : 60px;
    right      : 48px;
    border     : none;
    background : none;
  }

  // .popup-cart__inner
  &__inner {
    height : 100%;
  }

  // .popup-cart__empty
  &__empty {
  }

  // .popup-cart__btn
  &__btn {
  }

  // .popup-cart__completed
  &__completed {
  }

  // .popup-cart__content
  &__content {
  }
}

.empty-cart-block {
  // .empty-cart-block__text
  &__text {
    font-size   : 22px;
    line-height : 28px;
    color       : #000;
  }
}

.completed-cart-block {
  display         : flex;
  align-items     : center;
  flex-direction  : column;
  justify-content : center;
  height          : 100%;

  &::before {
    content          : '';
    display          : block;
    width            : 80px;
    height           : 80px;
    background-image : url(~assets/img/completed-cart-block.png);
    margin-bottom    : 24px;
  }


  // .completed-cart-block__title
  &__title {
    font-size   : 24px;
    font-weight : bold;
    line-height : 31px;
    color       : #000;

  }

  // .completed-cart-block__text
  &__text {
    font-size   : 16px;
    line-height : 21px;
    color       : $grey-color;
  }
}

.content-cart-block {
  // .content-cart-block__title
  &__title {
    font-size   : 18px;
    line-height : 23px;
    color       : $grey-color;
  }

  // .content-cart-block__list
  &__list {
    margin-top : 16px;
  }

  // .content-cart-block__item
  &__item {
    margin-bottom : 12px;
  }

  // .content-cart-block__form
  &__form {
    margin-top : 32px;
  }
}



.form-cart {
  // .form-cart__title
  &__title {
    font-size   : 18px;
    line-height : 23px;
    color       :$grey-color ;
  }

  // .form-cart__form
  &__form {
    margin-top : 16px;
  }
}

.form {
  // .form__item
  &__item {
    display       : block;
    margin-bottom : 16px;

  }

  // .form__input
  &__input {
    /* grey-extra-light */
    width            : 100%;
    padding          : 14px 14px 15px;
    border-radius    : 8px;
    background-color : $grey-extra-light-color;

  }

  // .form__btn
  &__btn {
    margin-top : 16px;
  }
}

</style>
