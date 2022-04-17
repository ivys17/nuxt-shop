<template>
  <div class="production">
    <div class="wrapper">
      <div class="title">
        <h1>Меню</h1>
      </div>
      <ProductionList :menu-items="menuItems" />
    </div>
  </div>
</template>

<script>

import ProductionList from '@/components/catalog/ProductionList.vue';

export default {
  components: { ProductionList },
  data() {
    return {};
  },
  head() {
    return {
      title: 'Меню ресторана',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Меню ресторана.',
        },
      ],
    };
  },
  computed: {
    menuItems() {
      const cat = this.$store.getters['catalog/catalogIsIncludedInMenu'];
      return cat;
      // return cat.reduce((acc, el) => {
      //
      //   if (el.groups.length) {
      //     acc = acc.concat(el.groups);
      //   } else {
      //     acc = acc.concat(el);
      //   }
      //   return acc;
      // }, []);
    },
  },

};
</script>
