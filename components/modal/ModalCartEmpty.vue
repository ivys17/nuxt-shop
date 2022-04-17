<template>
  <div v-if="isOpen"
       class="modal modal-empty">
    <div class="modal-box">
      <div class="modal-close"
           @click="close">
        <img alt="close"
             src="@/assets/images/icons/close.svg">
      </div>
      <div class="modal-title">Корзина пустая</div>
      <div class="modal-btn"
           @click="close">
        <span>Ок</span>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ModalCartEmpty',
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  methods: {
    close() {
      this.$store.commit('setModalCartEmptyActive', false);
    },
  },

};
</script>
<style scoped>
.modal-info {
  font-size      : 20px;
  line-height    : normal;
  text-align     : center;

  text-transform : uppercase;
}

.modal-img img {
  margin : 0 auto;
}

.modal-img {
  text-align    : center;
  margin-bottom : 10px;
}
</style>
