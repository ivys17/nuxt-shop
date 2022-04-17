<template>
  <div class="page rule">
    <div class="wrapper">
      <div class="wrap">
        <div class="page-title">
          <h1>{{ personalData.title }}</h1>
        </div>
        <div class="rule__body">
          <div
            class="multi-ordered-list"
            v-html="personalData.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const INFO_PAGE_ID = 1;
export default {
  name: 'Rule',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get(`/api/page/${INFO_PAGE_ID}`);
      const { personalData } = data.content;
      return { personalData };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      personalData: null,
    };
  },
};
</script>

<style scoped>

</style>
