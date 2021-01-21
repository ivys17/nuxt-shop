<template>
  <header class="page__header header">
    <div class="container header__container">
      <a href=""
         class="header__logo">TestList</a>

      <app-cart-icon></app-cart-icon>


    </div>

  </header>
</template>

<script>
import AppCartIcon from '~/components/AppCartIcon';

export default {
  name: 'AppHeader',
  components: { AppCartIcon },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.header {
  padding          : 20px 0;
  background-color : $white-color;
  border-radius    : 0 0 8px 8px;
  box-shadow       : 0 4px 16px rgba(0, 0, 0, 0.05);

  // .header__container
  &__container {
    display         : flex;
    align-items     : center;
    justify-content : space-between;
  }

  // .header__logo
  &__logo {
    font-size       : 22px;
    font-weight     : bold;
    line-height     : 28px;
    text-decoration : none;
    color           : $grey-color;
  }

  // .header__cart
  &__cart {
  }
}
</style>
