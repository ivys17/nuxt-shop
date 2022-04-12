<template>
  <div class="cart-menu">
    <ul>
      <li>
        <nuxt-link to="/">В меню</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/cart">Заказ</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/checkout">Доставка</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CartMenu',
};
</script>
