<template>
  <div
    :class="{ 'is-loading': isLoading}"
    class="modal"
  >
    <div class="modal-box">
      <div
        class="modal-close"
        @click="close"
      >
        <img
          alt="close"
          src="@/assets/images/icons/close2.svg"
        >
      </div>
      <div class="modal-info">
        <div class="modal-title">
          Заказать обратный звонок
        </div>

        <div class="authorization-form">
          <form>
            <p>Имя</p>
            <div class="authorization-tel">
              <input
                v-model.trim="name"
                type="text"
              >
            </div>
            <br>
            <p>Введите ваш телефон*</p>
            <div class="authorization-tel">
              <span>+7</span>
              <input
                v-model.trim="phoneForm"
                v-mask="'(###) ###-##-##'"
                autofocus
                placeholder="(9хх) ххх-ххх"
                type="tel"
              >
            </div>
            <button @click.prevent="onSend">
              Заказать обратный звонок
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validatePhone } from '@/lib/common.js';

export default {
  name: 'ModalCallback',

  data() {
    return {
      phoneForm: '',
      name: '',
      isLoading: false,
    };
  },
  computed: {
    phone() {
      const dirtyPhone = this.phoneForm;
      const phone = dirtyPhone.replace(/\D/g, '');
      return `+7${phone}`;
    },
  },
  methods: {

    close() {
      this.$store.commit('modal/setIsCallbackModalActive', false);
    },

    async onSend() {
      if (validatePhone(this.phone)) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Не верный формат телефона',
        });
        return;
      }
      if (!this.name.length || !this.phone.length) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Заполните имя и телефон',
        });
        return;
      }

      try {
        await this.$axios.post('/api/form/callback', {
          name: this.name,
          phone: this.phone,
        });

        this.$notify({
          group: 'messages',
          type: 'success',
          text: 'Ваше сообщение отправлено.',
        });

        this.close();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.is-loading {
  pointer-events : none;
}

input[type='text'] {
  display       : block;
  color         : #7d8088;
  font-size     : 18px;
  line-height   : 22px;
  font-family   : 'Tahoma', sans-serif;
  border        : 1px solid #b5b5b5;
  border-radius : 10px;
  height        : 58px;
  width         : 100%;
  padding       : 18px 18px 18px 74px;
  opacity       : 1;
}
</style>
