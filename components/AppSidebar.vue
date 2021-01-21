<template>
  <aside class="content__sidebar sidebar">
    <nav class="sidebar__nav">
      <ul class="sidebar__catalog-menu catalog-menu list--clear">
        <li class="catalog-menu__item"
            v-for="category in categories">
          <nuxt-link
            :to="`/${category.id}`"
            exact
            tag="a"
            class="catalog-menu__link"
            active-class="catalog-menu__link--active">
            {{ category.name }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => ([]),
    },
  },
  name: 'AppSidebar',
};
</script>

<style scoped>

</style>
