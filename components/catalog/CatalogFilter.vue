<template>
  <div
    class="filter"
    :class="{'active': isActive}"
  >
    <div class="filter-box">
      <div
        class="filter-close modal-close"
        @click.prevent="close"
      >
        <img
          src="~/assets/images/icons/close2.svg"
          alt="close"
        >
      </div>
      <div class="filter-title">
        <span>Фильтр аллергенов</span>
        <span>
          <FilterIcon />
        </span>
      </div>
      <div class="filter-list">
        <form>
          <label v-for="allergen in allergenList">
            <input
              v-model="selectedAllergens"
              type="checkbox"
              :value="allergen.code"
              @change="filterHandler"
            >
            <span class="filter-mark" />
            <span class="filter-name">{{ allergen.name }}</span>
          </label>

          <!-- на пк в дизайне эта кнопка скрыта. Не знаю как это на функционал повлияет -->
          <div class="filter-submit">
            <button @click.prevent="close">
              Применить
            </button>
          </div>
          <!-- на пк в дизайне эта кнопка скрыта. Не знаю как это на функционал повлияет -->
          <div class="reset">
            <button
              class="reset-btn"
              @click.prevent="resetFilter"
            >
              Сбросить фильтр
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FilterIcon from '~/assets/images/icons/filter.svg?inline';

export default {
  name: 'CatalogFilter',
  components: {
    FilterIcon,
  },
  props: {
    allergenList: {
      type: Array,
      default: [],
    },
    value: {
      type: Array,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedAllergens: [],
    };
  },
  methods: {
    filterHandler() {
      this.$emit('input', this.selectedAllergens);
    },
    resetFilter() {
      this.selectedAllergens = [];
      this.filterHandler();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
