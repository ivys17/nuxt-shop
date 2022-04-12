<template>
  <div class="hamburger-block">
    <div class="hamburger"
         @click.prevent="toggleHamburgerMenu">
      <div class="hamburger-icons"></div>
      <div class="hamburger-text">Меню</div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AppHamburgerMenuBtn',
  methods: {
    toggleHamburgerMenu() {
      const { isHamburgerMenuOpen } = this.$store.state;
      this.$store.commit('setVisibleHamburgerMenu', !isHamburgerMenuOpen);
    },
  },
};
</script>
