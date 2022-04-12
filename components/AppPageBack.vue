<template>
  <div class="back-basket">
    <a href
       @click.prevent="$router.go(-1)">в корзину</a>
  </div>
</template>
<script>
export default {
  name: 'AppPageBack',
};
</script>
