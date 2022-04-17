<template>
  <div
    v-if="isOpen"
    class="modal active"
  >
    <div class="modal-box">
      <div class="modal-info">
        <p>
          К сожалению данное блюдо можно купить только с
          {{ workTime.open }} до {{ workTime.close }} <br> приносим свои извинения
        </p>
      </div>
      <div
        class="modal-btn"
        @click="close"
      >
        ок
      </div>
    </div>
  </div>
</template>
<script>
import { checkWorkTime } from '@/lib/common';

export default {
  name: 'ModalWorkTime',
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    workTime() {
      return checkWorkTime();
    },
  },
  methods: {
    close() {
      this.$store.commit('setModalWorkTime', false);
    },
  },
};
</script>
