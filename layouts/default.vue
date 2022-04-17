<template>
  <div :class="globalClasses">
    <notifications
      group="messages"
      position="top center"
    />
    <AppHeader />

    <div class="box">
      <nuxt />
    </div>
    <AppFooter />

    <client-only>
      <!-- Модальное окно. Блюда нет в наличии -->
      <ModalWorkTime :is-open="isModalWorkTimeShown" />
      <!-- Модальное окно. Блюда нет в наличии -->

      <!-- Модальное окно. Номер телефона -->
      <ModalAuth :is-open="isModalAuthShown" />
      <!-- Модальное окно. Номер телефона -->

      <!-- Модальное окно. Дождитесь смс -->
      <ModalAuthSMS :is-open="isModalAuthSMSActive" />
      <!-- Модальное окно. Дождитесь смс -->

      <ModalRegistration :data="isModalRegistrationShown" />

      <!-- Модальное окно. Выберите компоненты -->
      <ModalComponents />
      <!-- Модальное окно. Выберите компоненты -->

      <!-- Корзина в модальном окне -->
      <ModalBasket :is-open="isBasketModalActive" />
      <!-- Корзина в модальном окне -->

      <ModalApp />
    </client-only>
  </div>
</template>
<script>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';

import ModalApp from '~/components/modal/ModalApp';
import ModalAuth from '~/components/modal/ModalAuth';
import ModalAuthSMS from '~/components/modal/ModalAuthSMS';
import ModalBasket from '~/components/modal/ModalBasket.vue';

import ModalComponents from '~/components/modal/ModalComponents';
import ModalRegistration from '~/components/modal/ModalRegistration';
import ModalWorkTime from '~/components/modal/ModalWorkTime';
import { HOST } from '~/config/common.js';
import { checkWorkTime } from '~/lib/common.js';

export default {
  components: {
    AppHeader,
    AppFooter,
    ModalBasket,
    ModalComponents,
    ModalWorkTime,
    ModalAuth,
    ModalAuthSMS,
    ModalRegistration,
    ModalApp,
  },
  data() {
    return {};
  },
  head() {
    const canonical = `${HOST}${this.$route.path.toLowerCase().replace(/\/$/, '')}`;
    return {
      link: [{ rel: 'canonical', href: canonical }],
    };
  },
  computed: {
    globalClasses() {
      const result = [];
      if (['/basket', '/checkout'].includes(this.$route.fullPath)) {
        result.push('order-page');
      }
      return result;
    },

    isModalWorkTimeShown() {
      return this.$store.state.isModalWorkTimeShown;
    },

    isModalAuthShown() {
      return this.$store.state.isModalAuthShown;
    },

    isModalAuthSMSActive() {
      return this.$store.state.isModalAuthSMSActive;
    },

    isModalRegistrationShown() {
      return this.$store.state.isModalRegistrationShown;
    },

    isBasketModalActive() {
      return this.$store.state.modal.isBasketModalActive;
    },

  },
  watch: {
    $route(route) {
      if (route.query.message === 'not-working') {
        const workTime = checkWorkTime();
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: `Заказ можно оформить только с ${workTime.open} до ${workTime.close} <br> приносим свои извинения.`,
        });
      }
    },
  },
  methods: {},
};
</script>
<style>
@import "~/assets/css/style.css";
</style>
