import { STORE_VERSION } from '@/config/common.js';

export const state = () => ({
  productDetailData: null,
  isBasketModalActive: false,
  isCallbackModalActive: false,

  version: STORE_VERSION,
});

export const mutations = {
  setProductDetailData(state, data) {
    state.productDetailData = data;
  },

  setIsBasketModalActive(state, payload) {
    state.isBasketModalActive = payload;
  },

  setIsCallbackModalActive(state, payload) {
    state.isCallbackModalActive = payload;
  },

};

export const actions = {};
export const getters = {};
