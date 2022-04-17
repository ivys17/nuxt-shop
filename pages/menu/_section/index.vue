<template>
  <section class="catalog wrapper">
    <div class="title">
      <h1>
        <NuxtLink :to="`/menu/${currentSectionData.alias}`">
          {{ currentSectionData.name }}
        </NuxtLink>
      </h1>
    </div>
    <div
      v-if="currentSectionData.groups && currentSectionData.groups.length"
      class="wrapper"
    >
      <ProductionList
        :menu-items="currentSectionData.groups"
      />
    </div>

    <CatalogGroup
      v-else
      :current-section-data="currentSectionData"
    />
  </section>
</template>

<script>

import CatalogGroup from '@/components/catalog/CatalogGroup';
import ProductionList from '@/components/catalog/ProductionList';

export default {
  components: { CatalogGroup, ProductionList },
  validate({ store, params }) {
    return typeof store.getters['catalog/currentSectionData'](params.section) !== 'undefined';
  },
  data() {
    return {};
  },
  head() {
    return {
      title: `Заказать ${this.currentSectionData.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Оформите заказ на ${this.currentSectionData.name}`,
        },
      ],
    };
  },

  computed: {
    currentSectionData() {
      return this.$store.getters['catalog/currentSectionData'](this.$route.params.section);
    },
  },
};
</script>

<style scoped>

</style>
