<template>
  <div class="agree-block">
    <div class="basket-agree">
      <input
        id="agree"
        v-model="agree"
        checked=""
        class="checkbox"
        type="checkbox"
        @change="$emit('input', agree)"
      >
      <label for="agree" />
      <p>
        Я согласен на обработку моих перс. данных в соответствии с
        <a
          href="/policy.pdf"
          target="_blank"
        >Условиями</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Agree',
  data() {
    return {
      agree: true,
    };
  },
};
</script>
