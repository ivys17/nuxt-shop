<template>
  <div v-if="isOpen"
       id="review"
       class="review active">
    <div class="review-box">
      <div class="review-close"
           @click="close">
        <img alt="close"
             src="@/assets/images/icons/close.svg">
      </div>
      <div class="review-title">Оставить отзыв</div>
      <div class="review-desc">
        <p><span>Дорогой друг!</span> Мы рады тому, что вы решили донести свое мнение о наших продуктах и сервисе, ведь
          этим вы помогаете ежедневно совершенствоваться, работать над ошибками и приумножать наши плюсы.</p>
      </div>
      <div class="review-form">
        <form action="#">
          <div class="review-field">
            <p>Введите ваше имя*</p>
            <input v-model="name"
                   type="text">
          </div>
          <div class="review-field">
            <p>Введите ваш телефон*</p>
            <div class="review-field-tel">
              <span>+7</span>
              <input v-model="phone"
                     placeholder="(9хх) ххх-ххх"
                     type="text">
            </div>
          </div>
          <div class="review-field">
            <p>Тип отзыва*</p>
            <div class="review-type">
              <div class="review-type-box">
                <span>Положительный</span>
                <div class="review-type-arrow">
                  <img alt="arrow"
                       src="@/assets/images/icons/dropdown.svg">
                </div>
              </div>
              <div class="review-type-dropdown">
                <div>Положительный</div>
                <div>Отрицательный</div>
              </div>
            </div>
          </div>
          <div class="review-field">
            <p>текст отзыва</p>
            <textarea v-model="text"></textarea>
          </div>
          <div class="agree">
            <input id="agree"
                   v-model="isAgree"
                   checked=""
                   class="checkbox"
                   type="checkbox">
            <label for="agree"></label>
            <p>Я согласен с условиями
              <a href="/policy.pdf"
                 target="_blank">обработки моих персональных данных</a>
            </p>
          </div>
          <div v-if="isAgree"
               class="review-btn"
               @click.prevent="sendReview">
            <button>Оставить отзыв</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalReview',
  data() {
    return {
      name: '',
      phone: '',
      text: '',
      type: '',
      photo: '',

      //
      isAgree: true,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.modal.isModalReviewOpen;
    },
  },
  methods: {
    close() {
      this.$store.commit('modal/setIsModalReviewOpen', false);
    },

    sendReview() {
      console.log('Send data review');
    },
  },
};
</script>

<style scoped>

</style>
