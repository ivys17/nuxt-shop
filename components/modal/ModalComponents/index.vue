<template>
  <div v-if="modalComponentsData"
       id="modal-components"
       class="modal modal-components">
    <div class="modal-box">

      <div class="modal-close"
           @click="closeModal"></div>


      <div class="modal-components-title">
        <span>Выберите опции</span>
      </div>


      <div class="components">
        <div v-for="(group, idx) in modalComponentsData.groupModifiers"
             :key="group.modifierId + idx"
             class="components-container">
          <GroupModifiersOnlyOne
            v-if="group.minAmount === 1 && group.maxAmount === 1"
            v-model="modifier"
            :group="group" />
          <GroupModifiersMany
            v-else
            v-model="modifier"
            :group="group" />
        </div>


      </div>
      <div class="components-result">
        <span class="result-value">{{ totalPrice }} ₽</span>
        <button @click.prevent="addToCart(modalComponentsData.id)">В корзину</button>
      </div>
    </div>
  </div>
</template>
<script>
import GroupModifiersMany from '@/components/modal/ModalComponents/GroupModifiersMany.vue';
import GroupModifiersManyItem from '@/components/modal/ModalComponents/GroupModifiersManyItem.vue';
import GroupModifiersOnlyOne from '@/components/modal/ModalComponents/GroupModifiersOnlyOne.vue';

export default {
  name: 'ModalComponents',
  components: {
    GroupModifiersOnlyOne,
    GroupModifiersMany,
    GroupModifiersManyItem,
  },
  data() {
    return {
      modifier: [],
    };
  },
  computed: {
    modalComponentsData() {
      return this.$store.getters['cart/modalComponents'];
    },
    totalPrice() {
      const modsTotal = this.modifier.reduce((acc, el) => acc += el.price * el.count, 0);
      return this.modalComponentsData.price + modsTotal;
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('cart/setModalComponents', null);
    },
    addToCart(productId, mods = []) {
      this.$store.dispatch('cart/addItem', { productId, mods: this.modifier });
      this.closeModal();
    },
  },
  watch: {
    modalComponentsData() {
      this.modifier = [];
    },
  },
};
</script>
