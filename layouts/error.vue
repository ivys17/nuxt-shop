<template>
  <main>
    <div class="error">
      <div class="title">
        <h1><span>Извините</span>что-то пошло не так</h1>
      </div>
      <img alt="404"
           src="~/assets/images/content/error.svg">
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'error',
};
</script>
