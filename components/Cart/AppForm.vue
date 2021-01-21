<template>
  <div class="content-cart-block__form form-cart">
    <div class="form-cart__title">Оформить заказ</div>
    <form class="form-cart__form form"
          @submit.prevent="onSubmitHandler">

      <label class="form__item">
        <input type="text"
               required
               v-model="name"
               placeholder="Ваше имя"
               class="form__input">
      </label>
      <label class="form__item">
        <input type="text"
               required
               v-model="phone"
               v-mask
               placeholder="Телефон"
               class="form__input">
      </label>
      <label class="form__item">
        <input type="text"
               required
               v-model="address"
               placeholder="Адрес"
               class="form__input">
      </label>
      <div class="form__item">
        <button type="submit"
                class="btn form__btn">Отправить
        </button>
      </div>

    </form>
  </div>
</template>

<script>

export default {
  name: 'AppForm',
  data() {
    return {
      name: '',
      phone: '',
      address: '',
    };
  },

  methods: {
    onSubmitHandler() {
      console.log('Form sent!!!');
      this.$emit('orderIsCompleted')
    },
  },
  directives: {
    mask: {
      bind: el => {
        el.oninput = function(e) {
          if (!e.isTrusted) return;
          const x = this.value.replace(/\+.|\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
          this.value = !x[1] ? '' : !x[2] ? '+7 (' + x[1] : '+7 (' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') +
            (x[4] ? '-' + x[4] : '');
          el.dispatchEvent(new Event('input'));
        };
      },
    },
  },
};
</script>

<style scoped
       lang="scss">

.form-cart {


  // .form-cart__title
  &__title {
    font-size   : 18px;
    line-height : 23px;
    color       : $grey-color;

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
