<template>
  <main>
    <div class="vacancy">
      <div class="wrapper">
        <div class="vacancy-box">
          <div class="title">
            <h1>Требования</h1>
          </div>
          <div class="vacancy-info">
            <ul>
              <li>Обучаемость</li>
              <li>Коммуникабельность</li>
            </ul>
          </div>
          <div class="vacancy-btn">
            <a
              href
              @click.prevent="vacancyFormShow = true"
            >Заполнить анкету</a>
          </div>
        </div>
      </div>
    </div>
    <VacancyForm
      v-if="vacancyFormShow"
      @close="vacancyFormShow = false"
    />
  </main>
</template>

<script>

import VacancyForm from '@/components/modal/VacancyForm.vue';

export default {
  name: 'Vacancy',
  components: { VacancyForm },
  data() {
    return {
      vacancyFormShow: false,
    };
  },
  head() {
    return {
      title: 'Вакансии',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Вакансии',
        },
      ],
    };
  },
};
</script>
