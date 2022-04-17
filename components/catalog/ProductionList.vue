<template>
  <div
    v-if="menuItems.length"
    class="production-list"
  >
    <div
      v-for="menuItem in menuItems"
      class="production-list-item"
    >
      <nuxt-link :to="`/menu/${menuItem.slug}`">
        <span class="production-item-img">
          <img
            :alt="menuItem.name"
            :src="menuItem.image"
          >

        </span>
        <span class="production-item-title">{{ menuItem.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductionList',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
