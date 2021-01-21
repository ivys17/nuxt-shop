<template>
  <main class="page__main main">
    <section class="main__catalog catalog">
      <div class="catalog__inner">
        <app-item-product
          v-for="product in products"
          :product="product"
          :key="product.id"
        ></app-item-product>
      </div>
    </section>
  </main>
</template>

<script>

import AppItemProduct from '~/components/AppItemProduct';

export default {
  components: { AppItemProduct },
  async fetch({ store, params }) {
    const categoryId = params.id;
    if (!store.getters['catalog/productsByCategories'](categoryId)) {
      await store.dispatch('catalog/fetchProductsByCategories', categoryId);
    }

    if (!store.getters['catalog/categories'].length) {
      await store.dispatch('catalog/fetchCategories');
    }
  },

  data() {
    return {};
  },
  computed: {
    productsByCategories() {
      const categoryId = this.$route.params.id;
      return this.$store.getters['catalog/productsByCategories'](categoryId);
    },
    sortData() {
      return this.$store.getters['catalog/sortData'];
    },
    products: {
      set(value) {

      },
      get(value) {
        const sortingFunction = this.sortData.sortingFunction;
        const products = [...this.productsByCategories];
        if (typeof sortingFunction === 'function') {
          products.sort(sortingFunction);
        }
        return products;
      },

    },

  },
};
</script>

<style>
</style>
