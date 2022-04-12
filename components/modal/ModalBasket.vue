<template>
  <div v-if="isOpen"
       :class="{ 'is-loading': isLoading}"
       class="basket-modal modal">
    <div class="basket-box">
      <div class="basket-close modal-close"
           @click="close">
        <img alt="close"
             src="~/assets/images/icons/close.svg">
      </div>

      <div class="basket-content">
        <div class="baket-map">
          <iframe height="100%"
                  src="https://www.google.com/maps/d/embed?mid=1Cc0hJCYSOSVbfEEqnDP4jlEjwAVCp0lL"
                  style="border: 0;"
                  width="100%"></iframe>
        </div>
        <div class="basket-info">
          <div class="basket-title">Корзина</div>
          <div class="basket-desc">
            <p>Для заказов в зелёной зоне от 400 ₽ - бесплатно;
              <br> Для заказов в желтой зоне от 1 000 ₽ - бесплатно;
              <br> Для заказов от 400 ₽ до 999 ₽ в желтой зоне - 100 ₽.</p>
          </div>
          <div class="basket-field">

            <div class="field-box active">
              <div class="field-flex">
                <div class="field-item field-city">

                  <multiselect
                    v-model="selectedStreet"
                    :allow-empty="false"
                    :options="streets"
                    :searchable="true"
                    class="custom-multiselect"
                    deselect-label=""
                    label="name"
                    placeholder="Введите улицу и выберите из списка"
                    selectLabel=""
                    selectedLabel=""
                    track-by="iikoId">
                    <template
                      slot="option"
                      slot-scope="{option}">
                      {{ option.name }}
                    </template>
                    <span slot="noResult">Улица не найдена.</span>
                    <span slot="noOptions">Начните вводить название улицы.</span>
                  </multiselect>


                </div>
                <div class="field-item field-house">
                  <input v-model="address.home"
                         placeholder="Дом"
                         type="text">
                </div>
                <div class="field-item field-room">
                  <input v-model="address.apartment"
                         placeholder="Квартира"
                         type="text">
                </div>
                <div class="field-item field-entrance">
                  <input v-model="address.entrance"
                         placeholder="Подъезд"
                         type="text">
                </div>
                <div class="field-item field-storey">
                  <input v-model="address.floor"
                         placeholder="Этаж"
                         type="text">
                </div>
              </div>
            </div>
            <div class="view-zones">
              <nuxt-link to="/delivery">Посмотреть зоны доставки</nuxt-link>
            </div>
            <div class="basket-btn">
              <button @click.prevent="send">Готово</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Multiselect from 'vue-multiselect';
import AccountAddress from '../../components/account/AccountAddress.vue';

export default {
  name: 'ModalBasket',
  components: {
    AccountAddress,
    Multiselect,
  },
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      selectedStreet: null,
      streets: [],

      address: {
        city: 'Нижний Тагил',
        street: '',
        home: '',
        apartment: '',
        entrance: '',
        floor: '',
      },

    };
  },
  methods: {
    close() {
      this.$store.commit('modal/setIsBasketModalActive', false);
    },
    async send() {
      if (!this.address.street || !this.address.home) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Улица и номер дома нужно заполнить!',
        });
        return;
      }

      const request = {
        city: this.address.city,
        street: this.address.street,
        home: this.address.home,
      };

      try {
        const { data: { addressInZone } } = await this.$axios.post('/api/iiko/orders/checkAddress', request);

        if (addressInZone !== true) {
          this.$notify({
            group: 'messages',
            type: 'error',
            horizontal: 'center',
            text: 'Адрес не входит в зону доставки',
          });
          return;
        }

        await this.$store.dispatch('address/createAddress', this.address);
      } catch (e) {
        console.log(e);
      }

    },
  },
  watch: {
    selectedStreet(v) {
      this.address.street = v.name;
    },
  },
  async created() {
    try {
      const res = await this.$axios.get('/api/cladr');
      this.streets = res.data;
    } catch (e) {
      console.log(e);
    }
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
  display       : block;
  width         : 100%;
  padding       : 13px 20px;
  background    : #fff;
  border        : 1px solid #b5b5b5;
  border-radius : 7px;
  font-family   : 'Tahoma', sans-serif;
  font-size     : 12px;
  line-height   : 14px;
  color         : #222529;
  opacity       : 1;
  position      : relative;
  height        : 42px;
}

.custom-multiselect >>> .multiselect__placeholder {
  position : absolute;
  top      : 13px;
  left     : 20px;
  padding  : 0;
}

.custom-multiselect >>> .multiselect__placeholder::placeholder {
  padding-top : 0;
  font-size   : 12px;
  color       : #222529;
  white-space : nowrap;
  overflow    : hidden;
  display     : block;
}

.multiselect__select {
  top : 12px;
}

.custom-multiselect >>> .multiselect__input,
.custom-multiselect >>> .multiselect__single {
  white-space : nowrap;
  overflow    : hidden;
  margin      : 0;
  padding     : 0;
  font-size   : 12px;
  line-height : 14px;
  color       : #222529;
  display     : inline;
}

</style>
