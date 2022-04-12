<template>
  <div v-if="isOpen"
       id="modal-login"
       :class="{ 'is-loading': isLoading}"
       class="modal active">
    <div class="modal-box">
      <div class="modal-close"
           @click="close"></div>
      <div class="modal-login-title">Регистрация</div>
      <div class="modal-login-desc">
        <p>Получайте бонусы после первого заказа! Укажите имя и дату рождения для регистрации.</p>
      </div>
      <div class="modal-login-info">
        <input v-model="name"
               placeholder="Имя"
               type="text">
        <input v-model="birthday"
               v-mask="'##.##.####'"
               placeholder="Дата рождения"
               type="text">
        <button @click.prevent="getUserByPhone">Зарегистрироваться</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalRegistration',
  props: ['data'],

  data() {
    return {
      name: '',
      phone: '',
      birthday: '',
      isLoading: false,
    };
  },
  methods: {
    async getUserByPhone() {
      if (this.phone.length === 0) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Введите номер телефона',
        });
        return;
      }

      if (!(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        this.phone))) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Неверный формат телефона',
        });
        return;
      }

      if (this.name.length === 0) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Введите имя',
        });
        return;
      }

      if (this.birthday.length === 0) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Введите дату рождения',
        });
        return;
      }

      this.isLoading = true;
      try {
        const user = await this.$axios.$post(
          '/api/user',
          {
            name: this.name,
            phone: this.phone,
            birthday: this.birthday,
          });

        if (!user) {
          this.$notify({
            group: 'messages',
            type: 'error',
            horizontal: 'center',
            text: 'Произошла ошибка. Попробуйте пройти регистрацию позже.',
          });
        }

        await this.$store.dispatch('user/setUser', user);

        //if modal open after add to cart
        if (this.data && typeof this.data === 'object' && 'productId' in this.data) {
          await this.$store.dispatch('cart/addItem', this.data);
        }
        this.$store.commit('setModalRegistration', false);
      } catch (e) {
        throw e;
      }
      this.isLoading = false;
    },
    close() {
      this.$store.commit('setModalRegistration', false);
    },
  },
  computed: {
    isOpen() {
      this.phone = this.data?.phone || '';
      return Boolean(this.data);
    },
  },
};
</script>
<style>
.is-loading {
  pointer-events : none
}
</style>
