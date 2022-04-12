<template>

  <div v-if="isOpen"
       id="modal-sms"
       :class="{ 'is-loading': isLoading}"
       class="modal modal-sms">
    <div class="modal-box">
      <div class="modal-close"
           @click="close"></div>
      <div class="modal-info">
        <p>Дождитесь смс-сообщение</p>
        <span>Введите код подтверждения или свяжитесь <br> с оператором +7 (383) 123-23-34</span>
      </div>
      <div class="modal-sms-arrea">
        <input v-model="sms"
               autofocus
               placeholder="Код подтверждения">
        <button @click.prevent="checkSMS">Отправить</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ModalAuth',
  props: ['isOpen'],

  data() {
    return {
      sms: '',
      isLoading: false,
    };
  },
  computed: {
    smsCode() {
      return this.$store.getters['user/smsCode'];
    },
    phone() {
      return this.$store.getters['user/validationPhone'];
    },
  },
  methods: {
    close() {
      this.$store.commit('setModalAuthSMS', false);
    },

    async checkSMS() {
      if (this.sms !== this.smsCode) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Вы указали не верный код!',
        });
        return;
      }

      await this.getUserByPhone();

    },

    async getUserByPhone() {

      this.isLoading = true;
      try {
        await this.$store.dispatch('user/auth', this.phone)

      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style>
.is-loading {
  pointer-events : none
}
</style>
