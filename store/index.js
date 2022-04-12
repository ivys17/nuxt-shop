import { STORE_VERSION } from '@/config/common.js';
import { yaInit } from '@/lib/yandexService';

export const state = () => ({
  isHamburgerMenuOpen: false,
  isModalWorkTimeShown: false,
  isModalAuthShown: false,
  isModalRegistrationShown: false,
  isModalAuthSMSActive: false,
  isModalCartEmptyActive: false,

  version: STORE_VERSION
});

export const mutations = {
  setVisibleHamburgerMenu(state, isVisible) {
    state.isHamburgerMenuOpen = isVisible;
  },

  setModalWorkTime(state, isVisible) {
    state.isModalWorkTimeShown = isVisible;
  },

  setModalAuth(state, isVisible) {
    state.isModalAuthShown = isVisible;
  },

  setModalAuthSMS(state, isVisible) {
    state.isModalAuthSMSActive = isVisible;
  },

  setModalRegistration(state, isVisible) {
    state.isModalRegistrationShown = isVisible;
  },

  setModalCartEmptyActive(state, isVisible) {
    state.isModalCartEmptyActive = isVisible;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('catalog/initCatalog');
  },
  nuxtClientInit({ dispatch }) {
    dispatch('cart/initCart');
    dispatch('user/initUser');
    yaInit();
  },

};
export const getters = {};
