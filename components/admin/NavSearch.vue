<template>
  <div class="nav-search">
    <form>
      <input
        v-model="s"
        type="text"
        placeholder="Поиск"
        @input.prevent="input"
      >
      <button>
        <img
          src="@/assets/admin/images/icons/search.svg"
          alt="search"
        >
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'NavSearch',
  props: {

    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      s: '',
    };
  },
  methods: {
    input() {
      this.$emit('input', this.s);
    },
  },
};
</script>
