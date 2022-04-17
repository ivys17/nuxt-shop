<template>
  <div class="filter">
    <div class="filter-title">
      <span>Сортировка</span>
      <span>
        <svg
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.11717 15.9866H0.883057"
            stroke="#200E32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            clip-rule="evenodd"
            d="M19.1178 15.9866C19.1178 17.5772 17.8284 18.8666 16.2378 18.8666C14.6473 18.8666 13.3578 17.5772 13.3578 15.9866C13.3578 14.3948 14.6473 13.1066 16.2378 13.1066C17.8284 13.1066 19.1178 14.3948 19.1178 15.9866Z"
            fill-rule="evenodd"
            stroke="#200E32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M11.8827 4.26211H19.118"
            stroke="#200E32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            clip-rule="evenodd"
            d="M0.882568 4.26211C0.882568 5.85388 2.17198 7.14211 3.76257 7.14211C5.35316 7.14211 6.64257 5.85388 6.64257 4.26211C6.64257 2.67152 5.35316 1.38211 3.76257 1.38211C2.17198 1.38211 0.882568 2.67152 0.882568 4.26211Z"
            fill-rule="evenodd"
            stroke="#200E32"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </span>
    </div>
    <div class="filter-list">
      <form action="#">
        <label v-for="sortItem in sortList">
          <input
            v-model="sort"
            :value="sortItem.value"
            type="radio"
            @change="select"
          >
          <span class="filter-mark" />
          <span class="filter-name">{{ sortItem.title }}</span>
        </label>
        <div class="reset">
          <a
            class="reset-btn"
            href="#"
            @click.prevent="resetSorting"
          >Сбросить фильтр</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavFilter',
  props: {
    value: {
      type: String,
      default: '',
    },
    sortList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      sort: null,
    };
  },

  methods: {
    select() {
      this.$emit('input', this.sort);
    },

    resetSorting() {
      this.$emit('input', null);
    },
  },
};
</script>
