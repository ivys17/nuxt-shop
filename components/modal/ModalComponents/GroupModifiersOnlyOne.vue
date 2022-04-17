<template>
  <div class="">
    <div class="components-title">
      <p>{{ group.name }}</p>
    </div>
    <div
      class="components-list"
    >
      <div
        v-for="mod in group.modifiers"
        class="components-item"
      >
        <label>
          <input
            v-model="selectedMod"
            :value="mod.modifierId"
            type="radio"
          >
          <span class="radiomark" />
          <span class="components-item-name"><b>{{ mod.name }}</b><br>{{ mod.description }}</span>
          <span class="components-price">{{ mod.price }} ₽</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupModifiersOnlyOne',
  props: {
    group: {
      type: Object,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedMod: '',
    };
  },
  watch: {
    selectedMod() {
      const mods = [...this.value];
      const mod = this.group.modifiers.find((el) => el.modifierId === this.selectedMod);
      const idx = mods.findIndex((el) => el.groupId === this.group.modifierId);

      const addedMod = {
        id: this.selectedMod,
        count: 1,
        groupId: this.group.modifierId,
        price: mod.price,
        name: mod.name,
      };

      if (idx === -1) {
        mods.push(addedMod);
      } else {
        mods[idx] = addedMod;
      }
      this.$emit('input', mods);
    },
  },
  mounted() {
    if (this.group.modifiers.length) {
      this.selectedMod = this.group.modifiers[0].modifierId;
    }
  },
};
</script>

<style scoped>

</style>
