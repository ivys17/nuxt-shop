import { STORE_VERSION } from '@/config/common.js';
import { checkWorkTime } from '@/lib/common.js';
import * as axios from 'axios';
import hash from 'object-hash';
import { v4 as uuidv4 } from 'uuid';

const getDefaultState = () => ({
  items: [],
  modalComponents: null,
  spendBonus: 0,

  discountTotal: 0,

  deliveryTime: null,
  isDeliveryTimeFetching: false,
  isCalculateCheckinResultFetching: false,
  appliedCoupon: '',

  workTimeShownToday: null,

  lostGift: [],
  freeProducts: [],
  setLoyaltyProgramErrors: [],
});

export const state = () => ({
  ...getDefaultState(),

  abortController: null,
  version: STORE_VERSION,
});

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },

  setItems(state, items) {
    state.items = items;
  },

  setModalComponents(state, data) {
    state.modalComponents = data;
  },

  setSpendBonus(state, bonus) {
    state.spendBonus = bonus;
  },

  setDiscountTotal(state, discountTotal) {
    state.discountTotal = discountTotal;
  },

  setDeliveryTime(state, minutes) {
    state.deliveryTime = minutes;
  },

  setIsDeliveryTimeFetching(state, payload) {
    state.isDeliveryTimeFetching = payload;
  },

  setIsCalculateCheckinResultFetching(state, payload) {
    state.isCalculateCheckinResultFetching = payload;
  },

  setAppliedCoupon(state, coupon) {
    state.appliedCoupon = coupon;
  },

  setWorkTimeShownToday(state, payload) {
    state.workTimeShownToday = payload;
  },

  setLostGift(state, payload) {
    state.lostGift = payload;
  },

  setFreeProducts(state, payload) {
    state.freeProducts = payload;
  },

  setLoyaltyProgramErrors(state, payload) {
    state.loyaltyProgramErrors = payload;
  },

  setAbortController(state, payload) {
    state.abortController = payload;
  },

};

export const actions = {
  setItems({
    commit, dispatch, state, rootGetters,
  }, payload) {
    let items = payload;

    // clear cart if in cart only gifts
    const notGifts = items.filter((i) => !i.isGift);
    if (notGifts.length === 0) {
      items = [];
    }

    if (items.length === 0) {
      dispatch('setDiscountTotal', 0);
      commit('setItems', []);
      return;
    }

    commit('setItems', items);
    dispatch('calculateCheckinResult');
  },

  setAppliedCoupon({ commit, dispatch }, coupon) {
    commit('setAppliedCoupon', coupon);
    dispatch('calculateCheckinResult');
  },

  setDiscountTotal({ commit, dispatch }, discountTotal) {
    const total = Number(discountTotal);
    commit('setDiscountTotal', isNaN(total) ? 0 : total);
  },

  /// ////////////
  initCart({ commit, dispatch, rootGetters }) {
    const items = rootGetters['cart/cartItems'];

    // validate cart items
    const validateItems = items
      .filter(({ product }) => rootGetters['catalog/products'].find((el) => el.id === product.id));

    dispatch('setItems', validateItems);
    commit('setIsDeliveryTimeFetching', false);
    dispatch('calculateCheckinResult');
  },

  addItem({
    commit, dispatch, state, rootGetters, getters,
  }, { productId, mods = [], isGift }) {
    const workTime = checkWorkTime();

    const workTimeShownToday = new Date(state.workTimeShownToday);

    if (workTime !== true) {
      if (workTimeShownToday === null || workTimeShownToday.getDate() !== new Date().getDate()) {
        commit('setModalWorkTime', true, { root: true });
        commit('setWorkTimeShownToday', new Date());
      }
    }

    let product = rootGetters['catalog/products'].find((el) => el.id === productId);

    if (!product) {
      return;
    }
    if (isGift) {
      product = { ...product };
      product.price = 0;
    }

    if (product.groupModifiers.length && !mods.length) {
      commit('setModalComponents', product);
      return;
    }

    const items = [...state.items];
    const idx = getters.indexProductInCart(productId);

    const productData = {
      mods,
      product,
      quantity: 1,
      timestamp: Date.now(),
      isGift: isGift || product.isGift || false,
      uid: uuidv4(),
    };

    if (idx === -1) {
      items.push(productData);
    } else {
      const needItem = { ...items[idx] };
      const quantity = needItem.quantity + 1;
      if (product.additionalInfo?.deliveryMobile?.maxCountInOrder && quantity
        > product.additionalInfo.deliveryMobile.maxCountInOrder) {
        return;
      }

      needItem.quantity = quantity;
      items[idx] = needItem;
    }
    dispatch('setItems', items);
  },

  decreaseQtyByIndex({ commit, state, dispatch }, idx) {
    const items = [...state.items];
    const needItem = { ...items[idx] };
    if (needItem.quantity <= 1) {
      dispatch('removeItemByIndex', idx);
      return;
    }
    needItem.quantity -= 1;
    items[idx] = needItem;
    dispatch('setItems', items);
  },

  removeItemByIndex({ commit, state, dispatch }, idx) {
    const items = [...state.items];
    items.splice(idx, 1);
    dispatch('setItems', items);
  },

  decreaseQtyById({ commit, state, dispatch }, productId) {
    const items = [...state.items];
    const idx = items
      .findIndex((el) => el.product.id === productId);
    const needItem = { ...items[idx] };
    if (needItem.quantity <= 1) {
      dispatch('removeItemById', productId);
      return;
    }
    needItem.quantity -= 1;
    items[idx] = needItem;
    dispatch('setItems', items);
  },

  removeItemById({ commit, state, dispatch }, productId) {
    const items = [...state.items];
    const idx = items
      .findIndex((el) => el.product.id === productId);
    items.splice(idx, 1);
    dispatch('setItems', items);
  },

  async checkDeliveryTime({ commit, rootGetters }) {
    const isAuth = rootGetters['user/isAuth'];
    if (!isAuth) {
      return;
    }

    const selectedAddress = rootGetters['address/selectedAddress'];
    const cartItems = rootGetters['cart/cartItems'];

    if (!selectedAddress) {
      commit('setDeliveryTime', null);
      commit('modal/setIsBasketModalActive', true, { root: true });
      return;
    }

    const orderRequest = {
      order: {
        phone: rootGetters['user/userPhone'],
        date: null,
        items: cartItems.map((item) => ({
          id: item.product.iikoId,
          amount: item.quantity,
        })),
        address: selectedAddress,
      },
    };

    commit('setIsDeliveryTimeFetching', true);

    this.$axios.post('/api/iiko/orders/check-create', orderRequest)
      .then(({ data }) => {
        if (typeof data.deliveryDurationInMinutes !== 'undefined') {
          commit('setDeliveryTime', data.deliveryDurationInMinutes);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => commit('setIsDeliveryTimeFetching', false));
  },

  async calculateCheckinResult({
    commit, rootGetters, getters, dispatch, state,
  }) {
    // cancel previous request
    if (state.abortController?.signal) {
      state.abortController.abort();
    }

    const abortController = new AbortController();
    commit('setAbortController', abortController);

    const isAuth = rootGetters['user/isAuth'];
    if (!isAuth) {
      return;
    }

    const orderRequest = getters.orderIiko;

    if (!orderRequest) {
      return;
    }

    commit('setIsCalculateCheckinResultFetching', true);
    axios
      .post(
        '/api/iiko/calculate-checkin-result',
        orderRequest,
        {
          signal: abortController.signal,
        },
      ).then(({ data }) => {
        const {
          discountTotal,
          discounts,
          loyaltyProgramErrors,
          freeProducts,
          lostGift,
        } = data;
        commit('setAbortController', null);
        dispatch('setDiscountTotal', discountTotal);
        dispatch('setLostGift', lostGift);
        dispatch('setFreeProducts', freeProducts);
        dispatch('setLoyaltyProgramErrors', loyaltyProgramErrors);
        if (freeProducts.length) {
          const products = rootGetters['catalog/products']
            .filter((p) => freeProducts.includes(p.code));
          products.forEach((p) => {
            dispatch('addItem', { productId: p.id, isGift: true });
          });
        }

        commit('setIsCalculateCheckinResultFetching', false);
      }).catch((e) => console.log(e));
  },

  setLostGift({ commit }, payload) {
    commit('setLostGift', payload);
  },

  setFreeProducts({ commit }, payload) {
    commit('setFreeProducts', payload);
  },

  setLoyaltyProgramErrors({ commit }, payload) {
    commit('setLoyaltyProgramErrors', payload);
  },

};
export const getters = {
  productsInCartIds: ({ items }) => items.map((i) => i.product.id),

  cartItems: ({ items }) => items,

  countItems: ({ items }) => items.reduce((acc, item) => acc + item.quantity, 0),

  cartTotal: ({ items }) => items.reduce((acc, el) => {
    if (el.isGift) {
      return acc;
    }
    const modsTotal = el.mods.reduce((acc, el) => acc + el.price * el.count, 0);
    return acc + ((el.product.price + modsTotal) * el.quantity);
  }, 0),

  cartTotalMinusBonus: (state, getters) => getters.cartTotal - getters.spendBonus,

  cartTotalAfterDiscounts: (state, getters) => getters.cartTotal - getters.spendBonus - getters.discountTotal,

  modalComponents: ({ modalComponents }) => modalComponents,

  deliveryTime: ({ deliveryTime }) => (deliveryTime ? `${deliveryTime} минут` : null),

  isDeliveryTimeFetching: ({ isDeliveryTimeFetching }) => isDeliveryTimeFetching,

  isCalculateCheckinResultFetching: ({ isCalculateCheckinResultFetching }) => isCalculateCheckinResultFetching,

  appliedCoupon: ({ appliedCoupon }) => appliedCoupon,

  isProductInCart: ({ items }) => (id, mods = []) => items
    .findIndex((el) => el.product.id === id && hash(mods) === hash(el.mods)) !== -1,

  indexProductInCart: ({ items }) => (id, mods = []) => items
    .findIndex((el) => el.product.id === id && hash(mods) === hash(el.mods)),

  // bonus
  spendBonus: ({ spendBonus }) => spendBonus,

  discountTotal: ({ discountTotal }) => discountTotal,

  lostGift: ({ lostGift }) => lostGift,

  loyaltyProgramErrors: ({ loyaltyProgramErrors }) => loyaltyProgramErrors,

  orderIiko: (state, getters, rootState, rootGetters) => {
    const { cartItems } = getters;
    if (!cartItems.length) {
      return false;
    }

    const selectedAddress = rootGetters['address/selectedAddress'];

    return {
      coupon: getters.appliedCoupon,
      customer: {
        phone: rootGetters['user/userPhone'],
        name: rootGetters['user/userName'],
      },
      order: {
        phone: rootGetters['user/userPhone'],
        date: null,
        items: cartItems.map((item) => {
          const modifiers = item.mods.map((mod) => ({
            id: mod.id,
            name: mod.name,
            amount: mod.count,
            sum: mod.price * mod.count,
            code: mod.code,
          }));

          return {
            id: item.product.id,
            name: item.product.name,
            amount: item.quantity,
            sum: item.product.price * item.quantity,
            code: item.product.code,
            modifiers,
          };
        }),
        address: selectedAddress,
      },
    };
  },
};
