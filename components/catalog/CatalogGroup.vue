<template>
  <div
    v-if="currentSectionData.items.length"
    class="catalog-list"
  >
    <AppCatalogItem
      v-for="item in startProducts"
      :key="item.id"
      :current-section-data-alias="currentSectionData.slug"
      :item="item"
      :product-title-tag="productTitleTag"
    />
    <div
      v-if="isShown && endProducts.length"
      class="btn-more-wrapper"
    >
      <div class="btn-more">
        <a @click.prevent="showMore">Показать ещё {{ endProducts.length }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';

import AppCatalogItem from '@/components/catalog/CatalogItem';

export default {
  name: 'CatalogGroup',
  components: {
    LazyHydrate,
    AppCatalogItem,
  },
  props: {
    currentSectionData: {
      type: Object,
      default: {},
    },
    hasMore: {
      type: Boolean,
      default: false,
    },

    productTitleTag: {
      type: String,
      default: 'h3',
    },

  },
  data() {
    return {
      hasMoreClone: this.hasMore,
    };
  },
  computed: {
    startProducts() {
      return this.isShown ? this.currentSectionData.items.slice(0, 3) : this.currentSectionData.items;
    },
    endProducts() {
      return this.isShown ? this.currentSectionData.items.slice(3) : [];
    },
    isShown() {
      if (this.hasMoreClone === false) {
        return false;
      }
      return true;

      // return this.$vssWidth < 768;
    },

  },
  methods: {
    showMore() {
      this.hasMoreClone = false;
    },
  },

};

</script>
