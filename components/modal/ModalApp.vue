<template>
  <div
    v-if="isShown"
    id="app-window"
  >
    <i
      id="closeAppWindow"
      class="fa fa-times"
      @click="isShown = false"
    />
    <!--    <p>Сохраните наше приложение: нажмите <img src="@/assets/images/icons/home.png" /> и выберите пункт "Добавить на-->
    <!--      экран домой"</p>-->
  </div>
</template>

<script>
export default {
  name: 'ModalApp',
  data() {
    return {
      isShown: false,
    };
  },
  mounted() {
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIos = /iphone/.test(userAgent);
      const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      return (isIos && isSafari);
    };

    this.isShown = isIos() && !isInStandaloneMode();
  },

};
</script>

<style scoped>

</style>
