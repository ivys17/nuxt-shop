<template>
  <main>
    <client-only>
      <div class="order">
        <AppMobileBack />
        <div class="wrapper">
          <div class="title">
            <h1>Оформление заказа</h1>
          </div>

          <AppPageBack />

          <div class="order-fields">
            <div class="order-item">
              <div class="field-title">1. Контактная информация</div>
              <div class="field-flex field-top">
                <div class="field">
                  <input
                    v-model.trim="user.name"
                    placeholder="Имя*"
                    required
                    type="text">
                </div>
                <div class="field">
                  <input
                    v-model.trim="user.phone"
                    v-phone-mask
                    placeholder="Телефон*"
                    required
                    type="text">
                </div>
                <div class="field">
                  <input
                    v-model.trim="user.email"
                    placeholder="Email"
                    required
                    type="text">
                </div>
              </div>
            </div>
            <div class="order-item field-delivery">
              <div class="field-title">2. Доставка</div>
              <div class="field-flex">
                <div class="field-radio">
                  <label>
                    <input v-model="deliveryMethod"
                           checked=""
                           name="delivery-2"
                           type="radio"
                           value="delivery">
                    <span>Доставка</span>
                  </label>
                  <label>
                    <input
                      v-model="deliveryMethod"
                      name="delivery-2"
                      type="radio"
                      value="self">
                    <span>Самовывоз</span>
                  </label>
                </div>
              </div>

              <div v-if="deliveryMethod==='self'"
                   class="field-rest">
                <p>Выберите ресторан</p>
                <div class="field field-dropdown">
                  <span @click="restaurantShow = true">{{ restaurant.text || 'Выберите ресторан' }}</span>
                  <div v-if="restaurantShow"

                       class="dropdown">
                    <ul>
                      <li
                        v-for="rest in restaurants"
                        :key="rest.value"
                        @click="restaurant = rest; restaurantShow = false">{{ rest.text }}
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="deliveryMethod==='delivery'"
                   class="field-address">
                <p>Адрес доставки</p>
                <div class="field-address-box">
                  <div class="field">
                    <multiselect
                      v-model="selectedStreet"
                      :allow-empty="false"
                      :options="streets"
                      :searchable="true"
                      class="custom-multiselect"
                      deselect-label=""
                      label="name"
                      placeholder="Укажите улицу*"
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
                  <div class="field">
                    <input
                      v-model.lazy="order.address.home"
                      maxlength="10"
                      placeholder="Номер дома*"
                      type="text">
                  </div>
                  <div class="field">
                    <input
                      v-model="order.address.apartment"
                      placeholder="№ квартиры/офиса"
                      type="text">
                  </div>
                  <div class="field">
                    <input
                      v-model="order.address.entrance"
                      placeholder="Подъезд"
                      type="text">
                  </div>
                  <div class="field">
                    <input
                      v-model="order.address.floor"
                      placeholder="Этаж"
                      type="text">
                  </div>

                </div>
              </div>
              <div class="field field-comment">
                <textarea
                  v-model="comment"
                  placeholder="Комментарий"></textarea>
              </div>

            </div>
            <div class="order-item order-payment">
              <div class="field-title">3. Оплатить</div>
              <div class="field-flex">
                <div class="field-radio">
                  <label>
                    <input
                      v-model="payment"
                      type="radio"
                      value="CASH">
                    <span>Наличными</span>
                  </label>
                  <label>
                    <input
                      v-model="payment"
                      type="radio"
                      value="CARD">
                    <span>Картой</span>
                  </label>
<!--                  <label>-->
<!--                    <input-->
<!--                      v-model="payment"-->
<!--                      type="radio"-->
<!--                      value="MCARD">-->
<!--                    <span>Онлайн</span>-->
<!--                  </label>-->
                </div>
              </div>
              <div v-if="payment === 'CASH'"
                   class="field change">
                <input placeholder="Сдача с">
              </div>
            </div>
            <div class="order-item">
              <div class="field-title">4. Получить</div>
              <div class="payment-time">
                <div class="field-radio">
                  <label>
                    <input v-model="inTime"
                           :value="false"
                           type="radio">
                    <span>В ближайшее время</span>
                  </label>
                  <label>
                    <input v-model="inTime"
                           :value="true"
                           type="radio">
                    <span>Ко времени</span>
                  </label>
                </div>


                <div v-if="inTime"
                     class="payment-time-info field-dropdown">
                  <input v-model="toTime"
                         placeholder="Укажите время"
                         readonly
                         @click="isCheckoutTimeDropdownBoxShown = true">
                  <CheckoutTimeDropdownBox
                    v-if="isCheckoutTimeDropdownBoxShown"
                    v-model="toTime"
                    @close="isCheckoutTimeDropdownBoxShown = false" />
                </div>

              </div>


              <div class="order-quantity">
                <p>Кол-во персон</p>
                <div class="basket-count">
                  <div class="count-minus"
                       @click="order.personsCount > 1 ? order.personsCount -= 1 : null"></div>
                  <span>{{ order.personsCount }}</span>
                  <div class="count-plus"
                       @click="order.personsCount += 1"></div>
                </div>
              </div>


              <div class="call">
                <div class="call-title">Хотите мы позвоним?</div>
                <div class="call-radio">
                  <label>
                    <input v-model="needCall"
                           :value="true"

                           type="radio">
                    <span class="radiomark"></span>
                    <span class="call-radio-name">Потребуется звонок оператора</span>
                  </label>
                </div>
                <div class="call-radio">
                  <label>
                    <input v-model="needCall"
                           :value="false"

                           type="radio">
                    <span class="radiomark"></span>
                    <span class="call-radio-name">Не перезванивать</span>
                  </label>
                </div>
              </div>

            </div>
            <div class="order-bottom">
              <Agree v-model="agree" />
              <div v-if="agree"
                   class="order-button">
                <div class="order-btn">
                  <button
                    :class="{disabledBtn: isFetching}"
                    @click.prevent="sendOrder">
                    <template v-if="!isFetching">Оформить заказ</template>
                    <AppSpinner v-else />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </main>
</template>

<script>
import _ from 'lodash';

import AppMobileBack from '@/components/AppMobileBack.vue';
import AppPageBack from '@/components/AppPageBack.vue';
import CartMenu from '@/components/cart/CartMenu.vue';
import CartWorkTimeText from '@/components/cart/CartWorkTimeText.vue';
import Agree from '@/components/checkout/Agree.vue';
import CheckoutTimeDropdownBox from '@/components/checkout/CheckoutTimeDropdownBox.vue';
import CheckoutTotal from '@/components/checkout/CheckoutTotal.vue';
import { getCoordsByStreet, getZone } from '@/lib/google-map.api.js';
import { yaSendOrderData } from '@/lib/yandexService.js';
import zoneInfo from '@/config/zoneInfo.js';
import Multiselect from 'vue-multiselect';

import { CITY_NAME, RESTAURANT_LIST } from '~/config/common.js';

export default {
  components: {
    AppMobileBack,
    Agree,
    CartMenu,
    CartWorkTimeText,
    AppPageBack,
    CheckoutTotal,
    CheckoutTimeDropdownBox,
    Multiselect,
  },
  head() {
    return {};
  },
  data() {
    return {

      user: {
        name: '',
        phone: '',
        email: '',
      },

      order: {
        address: {
          city: CITY_NAME,
          street: '',
          home: '',
          apartment: '',
          entrance: '',
          floor: '',
        },
        personsCount: 1,
      },

      deliveryMethod: 'delivery',

      /**/

      selectedStreet: null,

      streets: [],

      restaurant: RESTAURANT_LIST?.[0] || null,

      restaurants: RESTAURANT_LIST,

      isCheckoutTimeDropdownBoxShown: false,

      //===

      comment: '',
      payment: 'CASH',
      money: '',
      whenDeliver: 'in-time',
      inTime: false,
      toTime: '',
      person: 1,

      agree: true,

      needCall: true,
      restaurantShow: false,

      zone: null,

      //
      isFetching: false,

    };
  },
  methods: {
    checkOrderMinSum() {
      const { freeShippingFrom, shippingPrice } = this.zone;

      if (this.deliveryMethod === 'self') {
        return;
      }

      if (!this.zone) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Адрес не входит в зону доставки',
        });
        return;
      }

      if (this.cartTotal < freeShippingFrom) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: `Адрес находится в зоне платной. <br>При заказе до ${freeShippingFrom} руб. доставка ${shippingPrice} руб.`,
        });
      }
    },

    checkOrderRequiredUserFields() {
      return !(!this.user?.name?.trim() || !this.user?.phone?.trim());
    },

    checkOrderRequiredAddressFields() {
      return !(!this.order?.address?.street || !this.order?.address?.home);
    },

    async sendOrder() {
      const canCreateOrder = await this.checkCreateOrder();

      if (!canCreateOrder) {
        return;
      }

      if (!this.user.id) {
        await this.$store.dispatch('user/auth', this.user.phone);
      }

      this.isFetching = true;
      await this.$store.dispatch('address/createAddress', this.order.address);
      this.isFetching = false;

      const comment = this.createComment();

      const orderData = {
        user: this.user,
        coupon: this.$store.getters['cart/appliedCoupon'],
        spendBonus: this.spendBonus,
        order: {
          payment: this.payment,
          delivery: this.deliveryMethod,
          comment: comment,
          personsCount: this.order.personsCount,
          basket: this.cartItems,
          total: this.cartTotalAfterDiscounts,
          zoneId: this.zone?.deliveryTerminalId,
          isSelfService: this.deliveryMethod === 'self',
          addressId: this.selectedAddress?.id || null,
        },
      };

      try {

        this.isFetching = true;
        const { data } = await this.$axios.post('/api/catalog/order', orderData);
        this.isFetching = false;


        //update user if order was create
        await this.$store.dispatch('user/setUser', this.user);

        yaSendOrderData && yaSendOrderData(orderData);

        this.$store.commit('cart/setSpendBonus', 0);
        await this.$store.dispatch('cart/setItems', []);
        await this.$store.dispatch('cart/setAppliedCoupon', '');
        await this.$store.dispatch('cart/setDiscountTotal', 0);


        if (data.paymentLink) {
          window.location.href = data.paymentLink;
        } else {
          await this.$router.push('/complete');
        }

      } catch (e) {
        this.isFetching = false;
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Возникла проблема при создании заказа. Попробуйте еще раз или свяжитесь с администратором.',
        });
        console.log(e);
      }

    },

    async checkCreateOrder() {

      try {
        if (!this.checkOrderRequiredUserFields()) {
          this.$notify({
            group: 'messages',
            type: 'error',
            text: 'Имя и телефон обязательны!',
          });
          return false;
        }

        if (this.deliveryMethod === 'delivery' && !this.checkOrderRequiredAddressFields()) {
          this.$notify({
            group: 'messages',
            type: 'error',
            text: 'Улица и номер дома нужно заполнить!',
          });
          return false;
        }

        const orderIiko = this.$store.getters['cart/orderIiko'];
        if (!orderIiko) {
          return false;
        }

        //TODO: fix this shit
        const cloneOrderIiko = _.cloneDeep(orderIiko);
        cloneOrderIiko.order.address = {};
        cloneOrderIiko.order.phone = this.user.phone;
        cloneOrderIiko.customer = {};
        cloneOrderIiko.customer.phone = this.user.phone;
        cloneOrderIiko.deliveryTerminalId = this.restaurant.value;
        if (this.deliveryMethod === 'self') {
          cloneOrderIiko.order.address.city = this.restaurant.address.city;
          cloneOrderIiko.order.address.street = this.restaurant.address.street;
          cloneOrderIiko.order.address.home = this.restaurant.address.home;
        } else {
          cloneOrderIiko.order.address.city = CITY_NAME;
          cloneOrderIiko.order.address.street = this.order.address.street;
          cloneOrderIiko.order.address.home = this.order.address.home;
        }
        this.isFetching = true;
        const { data } = await this.$axios.post('/api/iiko/orders/check-create', cloneOrderIiko);
        this.isFetching = false;

        if (data.resultState > 0) {
          let errorMessage = '';
          switch (data.resultState) {
            case 1:
              errorMessage = data.problem;
              break;
            case 2:
              errorMessage = data.problem;
              break;
            case 3:
              errorMessage = data.problem;
              break;
            case 4:
              errorMessage = `${data.problem} Удалите данное блюдо из корзины.`;
              break;
            case 5:
              errorMessage = data.problem;
              break;

          }
          this.$notify({
            group: 'messages',
            type: 'error',
            text: errorMessage,
          });
          return false;
        }

        if (data.deliveryRestriction) {
          const currentZoneInfo = zoneInfo.find(z => {
            return z.deliveryTerminalId === data.deliveryRestriction.deliveryTerminalId
              && z.zone === data.deliveryRestriction.zone
              && z.organizationId === data.deliveryRestriction.organizationId;
          });

          if (!currentZoneInfo) {
            this.$notify({
              group: 'messages',
              type: 'error',
              text: 'Не найдена зона доставки.',
            });
            return false;
          }

          this.zone = currentZoneInfo;
        } else {
          this.zone = null;
        }
        //this.zone = await this.getZone();

        this.checkOrderMinSum();

      } catch (e) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Возникла проблема при создании заказа. Попробуйте еще раз или свяжитесь с администратором.',
        });
        console.log(e);
        this.isFetching = false;
        return false;
      }

      return true;
    },

    async getZone() {
      const { city, street, home } = this.order.address;

      try {
        const addressString = `${city}, ${street} ${home}`;

        const point = await getCoordsByStreet(addressString);
        return await getZone(point);
      } catch (e) {
        console.log(e);
      }
    },

    createComment() {
      const comment = [this.comment];

      const toTime = (!this.toTime.length)
        ? 'Доставить в ближайшее время.'
        : `Доставить ко времени: ${this.toTime}.`;
      comment.push(toTime);

      if (this.spendBonus) {
        comment.push(`Клиент оплатил бонусами: ${this.spendBonus}`);
      }

      if (this.$store.getters['cart/appliedCoupon']?.length) {
        comment.push(`Клиент ввел промокод: ${this.$store.getters['cart/appliedCoupon']}`);
      }
      return comment.join('\n');

    },

    async setZone() {

    },
  },

  mounted() {
    this.$watch('order.address.home', this.checkCreateOrder);
    this.$watch('order.address.street', this.checkCreateOrder);
  },

  watch: {
    selectedStreet(v) {
      this.order.address.street = v.name;
      this.order.address.streetId = v.iikoId;
    },
  },

  computed: {
    spendBonus() {
      return this.$store.getters['cart/spendBonus'];
    },
    selectedAddress: {
      set(address) {
        this.$store.dispatch('address/setSelectedAddress', address);
      },
      get() {
        return this.$store.getters['address/selectedAddress'];
      },
    },
    cartItems() {
      return this.$store.getters['cart/cartItems'];
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal'];
    },

    cartTotalAfterDiscounts() {
      return this.$store.getters['cart/cartTotalAfterDiscounts'];
    },

    zoneId() {
      if (this.deliveryMethod === 'self') {
        return this.restaurant?.value || null;
      }

      if (!this.zone) {
        return null;
      }

      return this.zone.zoneId;
    },
  },

  async created() {
    if (!this.cartItems.length) {
      await this.$router.push('/cart');
    }
    this.user = { ...this.$store.getters['user/user'] };

    const selectedAddress = this.$store.getters['address/selectedAddress'];
    if (selectedAddress) {
      this.selectedStreet = { iikoId: selectedAddress.streetId, name: selectedAddress.street };
      this.order.address.home = selectedAddress.home;
    }

    try {
      this.isFetching = true;
      const res = await this.$axios.get('/api/cladr');
      this.streets = res.data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isFetching = false;
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
  min-height    : 40px;
  display       : block;
  background    : #fff;
  width         : 100%;
  border        : 1px solid #e7eef1;
  border-radius : 10px;
  font-size     : 16px;
  line-height   : 22px;
  color         : #7d8088;
  padding       : 18px 25px;
  opacity       : 1;
  height        : 58px;
}

.custom-multiselect >>> .multiselect__placeholder {
  padding-top : 0;
  font-size   : 16px;
  color       : #32324180;
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

.disabledBtn {
  pointer-events : none;
  padding-top    : 4px;
  padding-bottom : 3px;
}
</style>
