<template>
  <div
    :class="{'active': isActive}"
    class="nav-search"
    @click="close"
  >
    <form>
      <input
        ref="searchInput"
        v-model="searchText"
        placeholder="Поиск продуктов"
        type="text"
        @input="searchHandler"
      >
      <button @click.prevent="$emit('close')">
        <img
          alt="search"
          src="@/assets/images/icons/search.svg"
        >
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'CatalogSearch',
  props: {
    value: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  watch: {
    // clear search on open modal
    isActive(value) {
      if (value) {
        this.searchText = '';
        this.$emit('input', '');
      }

      this.$nextTick(() => { this.$refs.searchInput.focus(); });
    },
  },
  methods: {
    close(evt) {
      if (evt.target !== evt.currentTarget) {
        return;
      }
      this.$emit('close');
    },
    searchHandler() {
      this.$emit('input', this.searchText);
    },
  },
};
</script>
