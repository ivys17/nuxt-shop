<template>
  <div class="checkout-flex">
    <div class="account-field checkout-arrea">
      <multiselect
        v-model="selectedStreet"
        :allow-empty="false"
        :options="streets"
        :searchable="true"
        class="custom-multiselect"
        deselect-label=""
        label="name"
        placeholder="Введите улицу и выберите из списка"
        select-label=""
        selected-label=""
        track-by="iikoId"
      >
        <template
          #option="{option}"
        >
          {{ option.name }}
        </template>
        <span slot="noResult">Улица не найдена.</span>
        <span slot="noOptions">Начните вводить название улицы.</span>
      </multiselect>
    </div>

    <div class="account-field checkout-arrea">
      <input
        v-model="addressModel.home"
        placeholder="Дом"
        type="text"
      >
    </div>

    <div class="account-field checkout-arrea">
      <input
        v-model="addressModel.apartment"
        placeholder="Квартира"
        type="text"
      >
    </div>

    <div class="account-field checkout-arrea">
      <input
        v-model="addressModel.entrance"
        placeholder="Подъезд"
        type="text"
      >
    </div>
    <div class="account-field checkout-arrea">
      <input
        v-model="addressModel.floor"
        placeholder="Этаж"
        type="text"
      >
    </div>
    <div
      class="add-address-save"
      @click="save"
    >
      <span>Сохранить адрес</span>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'AccountAddress',
  components: { Multiselect },
  props: {
    address: {
      type: [Object, null],
    },

  },
  data() {
    return {
      addressModel: {
        apartment: null,
        city: 'Нижний Тагил',
        doorphone: null,
        entrance: null,
        floor: null,
        home: null,
        housing: null,
        street: null,
        streetId: null,
        ...this.address,
      },

      selectedStreet: this.address ? { iikoId: this.address.streetId, name: this.address.street } : null,
      streets: [],
    };
  },
  watch: {
    selectedStreet(street) {
      this.addressModel.street = street.name;
      this.addressModel.streetId = street.iikoId;
    },
  },

  async created() {
    try {
      const res = await this.$axios.get('/api/cladr');
      console.log(res);
      this.streets = res.data;
    } catch (e) {
      console.log(e);
    }
  },

  methods: {

    async save() {
      // TODO: validate address
      if (!this.addressModel.street || !this.addressModel.home) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Улица и номер дома нужно заполнить!',
        });
        return;
      }

      try {
        const { id } = this.addressModel;
        if (id) {
          await this.$store.dispatch('address/updateAddress', this.addressModel);
        } else {
          await this.$store.dispatch('address/createAddress', this.addressModel);
        }
        this.$emit('complete');
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>
<style scoped>
.custom-multiselect {
  box-sizing : border-box;
  display    : block;
  position   : relative;
  width      : 100%;
  min-height : auto;
  text-align : left;
  color      : inherit;
}

.custom-multiselect >>> .multiselect__tags {
  min-height    : 40px;
  display       : block;
  background    : #fff;
  width         : 100%;
  border        : 1px solid #b5b5b5;
  border-radius : 10px;
  font-size     : 18px;
  line-height   : 22px;
  color         : #7d8088;
  padding       : 18px 25px;
  opacity       : 1;
  height        : 58px;
}

.custom-multiselect >>> .multiselect__placeholder {
  padding-top : 0;
  font-size   : 18px;
  color       : #7d8088;
  white-space : nowrap;
  overflow    : hidden;
  display     : block;
}

.custom-multiselect >>> .multiselect__select {
  top : 12px;
}

.custom-multiselect >>> .multiselect__single {
  white-space : nowrap;
  overflow    : hidden;
}
</style>
