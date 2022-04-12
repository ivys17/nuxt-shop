<template>
  <client-only>
    <div class="panel">
      <div class="panel-box">
        <Sidebar />
          <nuxt></nuxt>
      </div>
    </div>
  </client-only>
</template>

<script>
import Sidebar from '@/components/admin/sidebar.vue';

export default {
  name: 'admin',
  components: {
    Sidebar,
  },
};
</script>

<style>
@import "~/assets/admin/css/admin.css";
</style>
