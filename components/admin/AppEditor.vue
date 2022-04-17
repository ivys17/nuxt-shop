<template>
  <textarea v-model="content" />
</template>

<script>

export default {
  name: 'AppEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: this.value,
    };
  },
  mounted() {

  },
  methods: {
    onEditorInput() {
      this.$emit('input', this.content);
    },
  },
};
</script>

<style scoped>

</style>
