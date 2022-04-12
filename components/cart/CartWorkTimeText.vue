<template>
  <div v-if="isShow"
       class="not-work-pc not-work">
    <div class="not-work-title">Сегодня мы уже не доставляем.</div>
    <p>Заказы принимаем до 20:50, доставляем с {{ time.open }} до {{ time.close }}</p>
    <div class="not-work-img">

    </div>
  </div>
</template>

<script>
import { checkWorkTime } from '~/lib/common.js';

export default {
  name: 'CartWorkTimeText',
  data() {
    return {
      time: checkWorkTime(),

    };
  },
  computed: {
    isShow() {
      return !(this.time === true);
    },
  },

};
</script>

<style scoped>

</style>
