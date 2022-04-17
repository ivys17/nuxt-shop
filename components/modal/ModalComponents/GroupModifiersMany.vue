<template>
  <div class="">
    <div class="components-title">
      <p>{{ group.name }}</p>
    </div>
    <div
      class="components-list"
    >
      <GroupModifiersManyItem
        v-for="mod in group.modifiers"
        :key="mod.modifierId"
        v-model="selectedMods"
        :mod="mod"
        :total-mod-count="totalModCount"
        @decrease="decrease"
        @increase="increase"
      />
    </div>
  </div>
</template>

<script>
import GroupModifiersManyItem from '@/components/modal/ModalComponents/GroupModifiersManyItem.vue';

export default {
  name: 'GroupModifiersOnlyOne',
  components: {
    GroupModifiersManyItem,
  },
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
      selectedMods: {},
      totalModCount: 0,
    };
  },

  watch: {
    selectedMods() {
      const mods = [...this.value];
      const notEmptySelectedMods = Object.entries(this.selectedMods).filter((mod) => mod[1]);
      const emptySelectedModKeys = Object.entries(this.selectedMods).filter((mod) => !mod[1]).map(([key]) => key);

      notEmptySelectedMods.forEach(([id, count]) => {
        const mod = this.group.modifiers.find((el) => el.modifierId === id);
        const idx = mods.findIndex((el) => el.id === id);
        const addedMod = {
          id,
          count,
          groupId: mod.groupId,
          groupName: mod.groupName,
          price: mod.price,
          name: mod.name,
          code: mod.code,
        };

        if (idx === -1) {
          mods.push(addedMod);
        } else {
          mods[idx] = addedMod;
        }
      });

      // delete mod zero quantity
      const modsWithoutZeroQuantity = mods.filter((el) => !emptySelectedModKeys.includes(el.id));

      this.$emit('input', modsWithoutZeroQuantity);
    },
  },
  mounted() {

  },

  methods: {
    decrease() {
      const count = this.totalModCount - 1;
      if (this.totalModCount <= 0) {
        this.totalModCount = 0;
        return;
      }
      this.totalModCount = count;
    },

    increase() {
      const count = this.totalModCount + 1;
      if (count > this.group.maxAmount) {
        this.totalModCount = this.group.maxAmount;
        return;
      }
      this.totalModCount = count;
    },

  },
};
</script>

<style scoped>

</style>
