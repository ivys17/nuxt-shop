<template>
  <div
    class="components-item"
  >
    <p>{{ mod.name }}</p>

    <div class="count">
      <div @click="decrease()">
        <svg
          fill="none"
          height="2"
          viewBox="0 0 8 2"
          width="8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="white"
            height="2"
            rx="1"
            width="8"
          />
        </svg>
      </div>
      <span>{{ count }}</span>
      <div
        :disabled="!maxMod"
        @click="increase()"
      >
        <svg
          fill="none"
          height="8"
          viewBox="0 0 8 8"
          width="8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.05886 3.04762H4.95238V0.941143C4.95238 0.423619 4.51771 0 4 0C3.48229 0 3.04762 0.423619 3.04762 0.941143V3.04762H0.941143C0.423619 3.04762 0 3.48229 0 4C0 4.51771 0.423619 4.95238 0.941143 4.95238H3.04762V7.05886C3.04762 7.57638 3.48229 8 4 8C4.51771 8 4.95238 7.57638 4.95238 7.05886V4.95238H7.05886C7.57638 4.95238 8 4.51771 8 4C8 3.48229 7.57638 3.04762 7.05886 3.04762Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <div class="components-price">
      {{ mod.price }} ₽
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupModifiersManyItem',
  props: {
    mod: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    totalModCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
      returnedMod: {},
    };
  },

  computed: {
    maxMod() {
      return this.mod.maxAmount - this.totalModCount;
    },
  },

  watch: {
    count() {
      const model = { ...this.value };
      model[this.mod.modifierId] = this.count;
      this.$emit('input', model);
    },
  },
  methods: {
    decrease() {
      this.count = Math.max(0, this.count - 1);
      this.$emit('decrease');
    },
    increase() {
      if (this.maxMod > 0) {
        this.count += 1;
      }
      this.$emit('increase');
    },
  },
};
</script>

<style scoped>

</style>
