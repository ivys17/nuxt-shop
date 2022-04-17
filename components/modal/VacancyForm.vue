<template>
  <div
    :class="{ 'is-loading': isLoading}"
    class="vacancy-modal"
  >
    <div class="vacancy-modal-box">
      <div
        class="vacancy-close"
        @click="close"
      >
        <img
          alt="close"
          src="@/assets/images/icons/close3.svg"
        >
      </div>
      <div class="quest">
        <div class="quest-title">
          Анкета
        </div>
        <div class="quest-form">
          <form>
            <div class="quest-fields">
              <div class="quest-field">
                <select
                  v-model="vacancies"
                  placeholder="Вакансия"
                >
                  <option
                    disabled
                    selected
                  >
                    Вакансия
                  </option>
                  <option>Повар</option>
                  <option>Официант</option>
                  <option>Кассир</option>
                </select>
              </div>
              <div class="quest-field">
                <input
                  v-model="fio"
                  placeholder="Ф.И.О"
                  type="text"
                >
              </div>
              <div class="quest-field">
                <input
                  v-model.trim="phone"
                  autofocus
                  placeholder="Телефон"
                  type="tel"
                >
              </div>
            </div>
            <div class="quest-bottom">
              <div class="basket-agree quest-agree">
                <input
                  id="agree"
                  checked=""
                  class="checkbox"
                  type="checkbox"
                >
                <label for="agree" />
                <p>
                  Я согласен на обработку моих перс. данных в соответствии с
                  <a
                    href="/policy.pdf"
                    target="_blank"
                  >Условиями</a>
                </p>
              </div>
              <div class="quest-btn">
                <button
                  type="submit"
                  @click.prevent="onSend"
                >
                  Отправить анкету
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validatePhone } from '@/lib/common.js';

export default {
  name: 'VacancyForm',

  data() {
    return {
      vacancies: 'Вакансия',
      fio: '',
      phone: '',

      //
      isLoading: false,
    };
  },
  computed: {},
  methods: {

    close() {
      this.$emit('close');
    },

    async onSend() {
      if (!this.fio.length || !this.phone.length) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Заполните имя и телефон',
        });
        return;
      }

      try {
        await this.$axios.post('/api/form/vacancy', {
          vacancies: this.vacancies,
          fio: this.fio,
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
</style>
