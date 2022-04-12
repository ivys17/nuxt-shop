<template>
  <div :class="{ 'is-loading': isLoading}"
       class="vacancy-modal">
    <div class="vacancy-modal-box">
      <div class="vacancy-close"
           @click="close">
        <img alt="close"
             src="@/assets/images/icons/close3.svg">
      </div>
      <div class="quest">
        <div class="quest-title">Анкета</div>
        <div class="quest-form">
          <form>
            <div class="quest-fields">
              <div class="quest-field">
                <select v-model="vacancies"
                        placeholder="Вакансия">
                  <option disabled
                          selected>Вакансия
                  </option>
                  <option>Бармен</option>
                  <option>Повар</option>
                  <option>Официант</option>
                  <option>Кассир</option>
                  <option>Хостес</option>
                  <option>Тайный покупатель</option>
                </select>
              </div>
              <div class="quest-field">
                <input v-model="fio"
                       placeholder="Ф.И.О"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model="birthday"
                       placeholder="Дата рождения"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model="birthplace"
                       placeholder="Место рождения"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model="address1"
                       placeholder="Адрес прописки"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model="address2"
                       placeholder="Адрес фактический"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model.trim="phone"
                       autofocus
                       placeholder="Телефон"
                       type="tel"
                >
              </div>
              <div class="quest-field">
                <input v-model="educationalInstitution"
                       placeholder="Учебное заведение"
                       type="text">
              </div>
              <div class="quest-field">
                <input v-model="studyPeriod"
                       placeholder="Период обучения"
                       type="text">
              </div>
              <div class="quest-field">
                <select v-model="educationForm">
                  <option disabled
                          selected>Форма обучения
                  </option>
                  <option>Очная</option>
                  <option>Заочная</option>
                  <option>Вечерняя</option>

                </select>
              </div>
              <div class="quest-field">
                <input v-model="speciality"
                       placeholder="Специальность"
                       type="text">
              </div>
              <div class="quest-field">
                <select v-model="language">
                  <option disabled>Владение языками</option>
                  <option>Свободно</option>
                  <option>Бытовой</option>
                  <option>Со словарем</option>
                </select>
              </div>
              <div class="quest-field">
                <select v-model="pc">
                  <option disabled
                          selected>Владение ПК
                  </option>
                  <option>Продвинутый пользователь</option>
                  <option>Пользователь</option>
                  <option>Не работаю</option>
                </select>
              </div>
              <div class="quest-field">
                <select v-model="familyStatus">
                  <option disabled
                          selected>Семейное положение
                  </option>
                  <option>Замужем/Женат</option>
                  <option>Не замужем/Не женат</option>
                </select>
              </div>
              <div class="quest-field">
                <select v-model="children">
                  <option disabled
                          selected>Дети
                  </option>
                  <option>Есть</option>
                  <option>Нет</option>
                </select>
              </div>
              <div class="quest-field">
                <select v-model="military">
                  <option disabled
                          selected>Воинская обязанность
                  </option>
                  <option>Военнообязанный</option>
                  <option>Не военнообязанный</option>
                </select>
              </div>
              <div class="quest-field">
                <select v-model="criminal">
                  <option disabled
                          selected>Уголовная/административная ответственность
                  </option>
                  <option>Привлекался</option>
                  <option>Не привлекался</option>
                </select>
              </div>
            </div>
            <div class="quest-bottom">
              <div class="basket-agree quest-agree">
                <input id="agree"
                       checked=""
                       class="checkbox"
                       type="checkbox">
                <label for="agree"></label>
                <p>Я согласен на обработку моих перс. данных в соответствии с
                  <a href="/policy.pdf"
                     target="_blank">Условиями</a>
                </p>
              </div>
              <div class="quest-btn">
                <button type="submit"
                        @click.prevent="onSend">Отправить анкету
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
      birthday: '',
      birthplace: '',
      address1: '',
      address2: '',
      phone: '',
      educationalInstitution: '',
      studyPeriod: '',
      educationForm: 'Форма обучения',
      speciality: '',
      language: 'Владение языками',
      pc: 'Владение ПК',
      familyStatus: 'Семейное положение',
      children: 'Дети',
      military: 'Воинская обязанность',
      criminal: 'Уголовная/административная ответственность',

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
          birthday: this.birthday,
          birthplace: this.birthplace,
          address1: this.address1,
          address2: this.address2,
          phone: this.phone,
          educationalInstitution: this.educationalInstitution,
          studyPeriod: this.studyPeriod,
          educationForm: this.educationForm,
          speciality: this.speciality,
          language: this.language,
          pc: this.pc,
          familyStatus: this.familyStatus,
          children: this.children,
          military: this.military,
          criminal: this.criminal,
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
    }
  },
};
</script>
<style scoped>
.is-loading {
  pointer-events : none;
}
</style>
