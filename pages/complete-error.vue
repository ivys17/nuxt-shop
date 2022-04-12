<template>
  <main>
    <div class="order-complete">
      <div class="wrapper">
        <div class="complete-img">
          <img alt="in progress"
               src="@/assets/images/icons/empty.svg">
        </div>
        <div class="basket-info complete-info">Платеж не прошел</div>
        <div class="complete-bottom">
          <p>Попробуйте еще раз или свяжитесь с нашим оператором <br>
            по телефону <a href="tel:+79999999999">8 (999) 999-99-99</a></p>
        </div>
        <div class="basket-btn">
          <nuxt-link to="/">Вернуться на главную</nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'complete-error',
};
</script>

<style scoped>

</style>
