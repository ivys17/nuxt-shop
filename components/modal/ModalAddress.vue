<template>
  <div
    id="modal-address"
    class="modal active"
  >
    <div class="modal-box">
      <div class="address-info">
        <div
          class="modal-close"
          @click="$emit('close')"
        />
        <h4>Проверь свой адрес</h4>
        <div id="checkResult">
          <span
            v-if="warning.length"
            id="checkFail"
          >{{ warning }}</span> <br>
          <span
            v-if="success.length"
            id="checkOK"
          >{{ success }}</span>
        </div>
        <div class="input-address">
          <div class="street">
            <multiselect
              v-model="street"
              :allow-empty="false"
              :options="streets"
              :searchable="true"
              class="custom-multiselect"
              deselect-label=""
              label="name"
              placeholder="Укажите улицу*"
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

          <div class="house">
            <input
              v-model="house"
              placeholder="Дом"
              type="text"
            >
          </div>
          <div class="address-btn">
            <input
              v-if="!isValidAddress"
              type="submit"
              value="Проверить"
              @click.prevent="checkAddress"
            >
            <input
              v-else
              type="submit"
              value="Ок"
              @click.prevent="$emit('close')"
            >
          </div>
        </div>
        <div
          id="address-map"
          class="address-map"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { MAP_CENTER, MAP_ZOOM, USING_MAP_ZONES } from '@/config/map/mapSettings.js';
import { getCoordsByStreet, getZoneId } from '@/lib/google-map.api.js';

import Multiselect from 'vue-multiselect';

export default {
  name: 'ModalAddress',
  components: { Multiselect },
  data() {
    return {
      streets: [],
      street: null,
      streetId: '',
      house: '',
      warning: [],
      success: [],
      map: null,
      zoneId: 0,
      isValidAddress: false,
    };
  },

  async mounted() {
    this.initMap('address-map');
  },

  async created() {
    try {
      const res = await this.$axios.get('/api/cladr');
      this.streets = res.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    setStreet(street) {
      if (!street.value) {
        return;
      }
      this.$store.dispatch('user/setStreet', street);
    },
    async initMap(id) {
      const map = new google.maps.Map(document.getElementById(id), {
        zoom: MAP_ZOOM,
        center: {
          lat: MAP_CENTER.lat,
          lng: MAP_CENTER.lng,
        },
        mapTypeId: 'terrain',
      });

      USING_MAP_ZONES.forEach((zone) => {
        const polygon = new google.maps.Polygon({
          paths: zone.coords,
          strokeColor: zone.borderColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: zone.fillColor,
          fillOpacity: 0.35,
        });
        polygon.setMap(map);
      });
      this.map = map;
    },

    setUserZone() {
      this.$store.dispatch('user/setZoneId', this.zoneId);
    },

    async checkAddress() {
      if (!this.street) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Введите улицу',
        });
        return;
      }
      if (!this.house.length) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Введите номер дома',
        });
        return;
      }

      const streetName = this.street.name;

      const address = `Нижний тагил, ${streetName}, ${this.house}`;

      const point = await getCoordsByStreet(address);
      console.log(point);

      if (!point) {
        return;
      }

      new google.maps.Marker({
        position: point,
        map: this.map,
      });

      this.map.setCenter(point);

      const zoneId = await getZoneId(point);

      (zoneId)
        ? this.success = 'Вы в зоне доставки'
        : this.warning = 'Адрес вне зоны доставки';

      this.zoneId = zoneId;
      this.setUserZone();
      if (zoneId) {
        this.$emit('streetValidHandler', this.street);
        this.isValidAddress = true;
      } else {
        this.$emit('streetValidHandler', null);
        this.isValidAddress = false;
      }
    },

  },
};
</script>
