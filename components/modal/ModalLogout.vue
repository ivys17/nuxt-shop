<template>
  <div class="modal">
    <div class="modal-box">
      <div class="modal-close"
           @click="close"></div>
      <div class="modal-info">
        <p>Выйти из аккаунта?</p>
      </div>
      <div class="modal-btn"
           @click="logout">Да
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'ModalLogout',
  methods: {
    close() {
      this.$store.commit('setModalWorkTime', false);
      this.$emit('close');
    },
    logout() {
      this.$store.dispatch('user/logoutUser');
      this.$emit('close');
    },
  },
};
</script>
