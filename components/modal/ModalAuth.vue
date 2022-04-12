<template>
  <div v-if="isOpen"
       id="modal-phone"
       :class="{ 'is-loading': isLoading}"
       class="modal modal-phone">
    <div class="modal-box">
      <div class="modal-close"
           @click="close"></div>
      <div class="modal-info">
        <p>Для входа введите <br> номер телефона</p>
      </div>
      <div class="modal-phone-arrea">
        <input
          v-model.trim="phoneForm"
          v-phone-mask
          placeholder="+7 (___) ___-__-__"
          type="text">
        <button @click.prevent="sendSMS">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import { validatePhone } from '@/lib/common.js';

export default {
  name: 'ModalAuth',
  props: ['isOpen'],

  data() {
    return {
      phoneForm: '',
      isLoading: false,
    };
  },
  computed: {
    phone() {
      const dirtyPhone = this.phoneForm;
      const phone = dirtyPhone.replace(/\D/g, '');
      return phone;
    },
  },
  methods: {
    async sendSMS() {
      if (validatePhone(this.phone)) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Не верный формат телефона',
        });
        return;
      }

      try {
        const data = await this.$axios.$post('/api/user/sms', null, {
          params: {
            'phone': this.phone,
          },
        });
        this.$store.commit('user/setSMSCode', data.code);
        this.$store.commit('user/setValidationPhone', this.phone);
        this.$store.commit('setModalAuth', false);
        this.$store.commit('setModalAuthSMS', this.isOpen);

        
      } catch (e) {
        throw e;
      }

    },

    close() {
      this.$store.commit('setModalAuth', false);
    },
  },
};
</script>
<style>
.is-loading {
  pointer-events : none
}
</style>
