<template>
  <client-only>
    <quill-editor
      ref="editor"
      v-model="content"
      :options="editorOption"
      class="custom-rich-editor"
      @input="onEditorInput"
    />
  </client-only>
</template>

<script>

export default {
  name: 'AppEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      content: this.value,
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ]
        }
      }
    };
  },
  mounted() {

  },
  methods: {
    onEditorInput() {
      this.$emit('input', this.content);
    }
  }
};
</script>

<style scoped>
.custom-rich-editor >>> .ql-toolbar.ql-snow {
  border-radius : 10px 10px 0 0;
}

.custom-rich-editor >>> .ql-container.ql-snow {
  border-radius : 0 0 10px 10px;
  background-color : #fff;
  font-size: 18px;
  line-height: 22px;
  font-family: Tahoma, sans-serif;
}

</style>
