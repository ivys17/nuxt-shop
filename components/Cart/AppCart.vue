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
          <article v-for="product in products"
                   class="content-cart-block__item item-cart-block">
            <div class="item-cart-block__image">
              <img :src="product.photo"
                   :alt="product.name">
            </div>
            <div class="item-cart-block__content">
              <h3 class="item-cart-block__title">{{ product.name }}</h3>
              <div class="item-cart-block__price">{{ product.price | price }}</div>
              <div class="item-cart-block__rating rating-block">
                <svg class="rating-block__icon"
                     width="14"
                     height="14"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 .125c.238 0 .455.135.56.348l1.786 3.619 3.994.583a.625.625 0 01.346 1.066l-2.89 2.815.683 3.976a.625.625 0 01-.907.659L7 11.312l-3.572 1.879a.625.625 0 01-.906-.66l.681-3.975L.313 5.74A.625.625 0 01.66 4.675l3.994-.583L6.44.473A.625.625 0 017 .125zm0 2.037L5.63 4.939a.625.625 0 01-.47.342l-3.067.448L4.31 7.89c.148.144.215.351.18.554l-.523 3.052 2.741-1.442a.625.625 0 01.582 0l2.741 1.442-.523-3.052a.625.625 0 01.18-.553l2.218-2.16-3.066-.45a.625.625 0 01-.47-.34L7 2.161z"
                        fill="#F2C94C" />
                  <path d="M3.5 8L1 5h12l-2.5 3v3.5l-.5 1L7 11l-1 .5-2.5 1V8z"
                        fill="#F2C94C" />
                </svg>
                <span class="rating-block__count">{{ product.rating }}</span>
              </div>
            </div>
            <button class="item-cart-block__delete"
                    @click="removeProductCart(product.id)"
                    type="button"
                    :aria-label="`Удалить ${product.name} из корзины`">
              <svg width="20"
                   height="22"
                   viewBox="0 0 20 22"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 5C0 4.44772 0.447715 4 1 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H1C0.447715 6 0 5.55228 0 5Z"
                      fill="#959DAD" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H13V3C13 2.73478 12.8946 2.48043 12.7071 2.29289C12.5196 2.10536 12.2652 2 12 2H8ZM15 4V3C15 2.20435 14.6839 1.44129 14.1213 0.87868C13.5587 0.31607 12.7956 0 12 0H8C7.20435 0 6.44129 0.31607 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H3C2.44772 4 2 4.44772 2 5V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H15C15.7957 22 16.5587 21.6839 17.1213 21.1213C17.6839 20.5587 18 19.7957 18 19V5C18 4.44772 17.5523 4 17 4H15ZM4 6V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H15C15.2652 20 15.5196 19.8946 15.7071 19.7071C15.8946 19.5196 16 19.2652 16 19V6H4Z"
                      fill="#959DAD" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 9C8.55229 9 9 9.44771 9 10V16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16V10C7 9.44771 7.44772 9 8 9Z"
                      fill="#959DAD" />
                <path fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 9C12.5523 9 13 9.44771 13 10V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V10C11 9.44771 11.4477 9 12 9Z"
                      fill="#959DAD" />
              </svg>
            </button>
          </article>
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

export default {
  name: 'AppCart',
  components: { AppForm },
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
    removeProductCart(id) {
      this.$store.dispatch('cart/removeProductCart', id);
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
    price(value) {
      const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumSignificantDigits: 2,
      });
      return formatter.format(value);
    },
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
  background     : #fff;
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

.item-cart-block {
  display          : flex;
  align-items      : center;
  justify-content  : space-between;
  padding          : 15px 25px 15px 25px;
  border-radius    : 8px;
  background-color : #fff;
  box-shadow       : 0px 4px 16px rgba(0, 0, 0, 0.05);

  // .item-cart-block__image
  &__image {
    max-width    : 70px;
    max-height   : 90px;
    margin-right : 35px;
  }

  // .item-cart-block__content
  &__content {
  }

  // .item-cart-block__title
  &__title {
    font-size       : 14px;
    line-height     : 18px;
    text-decoration : none;
    color           : #59606d;
    font-weight     : 400;
  }

  // .item-cart-block__price
  &__price {
    font-size   : 14px;
    font-weight : bold;
    line-height : 18px;
    margin-top  : 6px;
    color       : #1f1f1f;
  }

  // .item-cart-block__rating
  &__rating {
    margin-top : 16px;
  }

  // .item-cart-block__delete
  &__delete {
    margin-left : 16px;
    border      : none;
    background  : none;
  }
}

.form-cart {


  // .form-cart__title
  &__title {
    font-size   : 18px;
    line-height : 23px;
    color       : #59606d;

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
    background-color : #f8f8f8;

  }

  // .form__btn
  &__btn {

  }
}

</style>
