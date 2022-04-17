import { STORE_VERSION } from '@/config/common.js';

const getDefaultState = () => ({
  user: {},
  favorites: [],
  smsCode: null,
  validationPhone: null,
});

export const state = () => ({
  ...getDefaultState(),

  version: STORE_VERSION,
});

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },

  setUser(state, user) {
    state.user = user;
  },

  setFavorites(state, favorites) {
    state.favorites = favorites;
  },

  setSMSCode(state, smsCode) {
    state.smsCode = smsCode;
  },

  setValidationPhone(state, phone) {
    state.validationPhone = phone;
  },

};

export const actions = {
  async initUser({ commit, rootGetters, dispatch }) {
    commit('setSMSCode', null);
    commit('setValidationPhone', null);

    const user = rootGetters['user/user'];

    if (user.id) {
      dispatch('address/fetchAddressesForUser', user.id, { root: true });
    }

    let userFromBack = {};

    try {
      if (user.phone?.length) {
        userFromBack = await this.$axios.$get(`/api/user/${user.phone}`);
      }
    } catch (e) {
      console.log(e);
    }
    const resultUser = { ...user, ...userFromBack };

    commit('setUser', resultUser);
  },

  async setUser({ commit, dispatch }, user) {
    commit('setUser', user);
    if (user.id) {
      dispatch('address/fetchAddressesForUser', user.id, { root: true });
    }
  },

  async logoutUser({ commit }) {
    await this.$router.push('/');

    commit('resetState');
    commit('address/resetState', null, { root: true });
    commit('cart/resetState', null, { root: true });
    commit('auth/resetState', null, { root: true });
  },

  setZoneId({ commit, state }, zoneId) {
    const updatedUser = { ...state.user, zoneId };
    commit('setUser', updatedUser);
  },

  async setStreet({ commit, getters }, street) {
    const user = { ...getters.user, street };
    commit('setUser', user);
  },

  addFavorites({ commit, getters }, productId) {
    if (!getters.isAuth) {
      commit('setModalAuth', {}, { root: true });
      return;
    }

    const favorites = [...getters.favorites];
    if (favorites.includes(productId)) {
      return;
    }
    favorites.push(productId);
    commit('setFavorites', favorites);
  },

  removeFavorites({ commit, getters }, productId) {
    const favorites = [...getters.favorites];
    const idx = favorites.findIndex((el) => el === productId);

    if (idx === -1) {
      return;
    }
    favorites.splice(idx, 1);
    commit('setFavorites', favorites);
  },

  async auth({ commit, dispatch, rootCommit }, phone) {
    if (phone.length === 0) {
      $nuxt.$notify({
        group: 'messages',
        type: 'error',
        horizontal: 'center',
        text: 'Введите номер телефона',
      });
      return;
    }

    if (!(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
      .test(phone))) {
      $nuxt.$notify({
        group: 'messages',
        type: 'error',
        horizontal: 'center',
        text: 'Неверный формат телефона',
      });
      return;
    }

    try {
      const user = await this.$axios.$get(`/api/user/${phone}`);
      if (!user) {
        this.$notify({
          group: 'messages',
          type: 'error',
          horizontal: 'center',
          text: 'Произошла ошибка. Попробуйте пройти регистрацию позже.',
        });
      }
      await dispatch('setUser', user);
      commit('setModalAuthSMS', false, { root: true });

      // TODO: fix think about how to update the user from iiko after authorization
      setTimeout(async () => {
        const user = await this.$axios.$get(`/api/user/${phone}`);
        await dispatch('user/setUser', user, { root: true });
      }, 3000);

      dispatch('cart/calculateCheckinResult', null, { root: true });
    } catch (e) {
      console.log(e);
    }
  },

};
export const getters = {
  user: ({ user }) => user,
  id: ({ user }) => user.id,
  isAuth: ({ user }) => Object.keys(user).length !== 0,
  balance: ({ user }) => parseInt(user.balance, 10) || 0,
  userPhone: ({ user }) => user.phone,
  userName: ({ user }) => user.name || user.phone,
  zoneId: ({ user }) => user?.zoneId || 0,
  favorites: ({ favorites }) => favorites,
  smsCode: ({ smsCode }) => smsCode,
  validationPhone: ({ validationPhone }) => validationPhone,
};
