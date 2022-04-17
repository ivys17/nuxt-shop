import { STORE_VERSION } from '@/config/common.js';

const getDefaultState = () => ({
  token: null,
});

export const state = () => ({
  ...getDefaultState(),

  version: STORE_VERSION,
});

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },

  setAuthToken(state, token) {
    state.token = token;
  },
};

export const actions = {};

export const getters = {
  token: ({ token }) => token,
};
