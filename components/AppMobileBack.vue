<template>
  <div class="mobile-back">
    <a
      href
      @click.prevent="$router.go(-1)"
    >
      <span class="mobile-back-img">
        <img
          alt="close"
          src="~/assets/images/icons/close-mob.svg"
        >
      </span>
      <span>закрыть</span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'AppPageBack',
};
</script>
