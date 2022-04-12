<template>
  <main>
    <div class="order-complete">
      <div class="wrapper">
        <div class="complete-img">
          <img alt="in progress"
               src="~/assets/images/icons/basket-sent.svg">
        </div>
        <div class="basket-info complete-info">Ваш заказ отправлен</div>
        <div class="complete-bottom">
          <p>Очень скоро мы его обработаем и свяжемся с <br> Вами для подтверждения. <br> Спасибо, что выбрали нашу
            доставку!</p>
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
  name: 'complete',
};
</script>
