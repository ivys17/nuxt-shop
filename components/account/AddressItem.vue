<template>
  <li class="address-list__item field-radio">
    {{ renderAddress(address) }}
    <div class="actions">
      <span @click="removeAddress(address.id)">удалить</span> | <span @click="editAddress()">изменить</span>
    </div>
  </li>
</template>

<script>
import { renderAddress } from '@/lib/common.js';

export default {
  name: 'AddressItem',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeAddress(id) {
      await this.$store.dispatch('address/deleteAddress', id);
    },
    renderAddress(address) {
      return renderAddress(address);
    },

    editAddress() {
      this.$emit('edit');
    },
  },
};
</script>

<style scoped>

</style>
