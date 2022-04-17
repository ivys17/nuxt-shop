import { STORE_VERSION } from '@/config/common.js';

const getDefaultState = () => ({
  addresses: [],
  selectedAddress: null,
});

export const state = () => ({
  ...getDefaultState(),

  version: STORE_VERSION,
});

export const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },

  setAddresses(state, data) {
    state.addresses = data;
  },

  setSelectedAddress(state, selectedAddress) {
    state.selectedAddress = selectedAddress;
  },
};

export const actions = {
  async fetchAddressesForUser({ commit, getters, dispatch }, userId) {
    const { data: addresses } = await this.$axios(`/api/address/by-user-id/${userId}`);
    commit('setAddresses', addresses);
    const { selectedAddress } = getters;

    const firstAddress = addresses[0];

    if (!selectedAddress && firstAddress) {
      dispatch('setSelectedAddress', firstAddress);
    }
  },

  async deleteAddress({ commit, dispatch, getters }, id) {
    try {
      await this.$axios.delete(`/api/address/${id}`);
      const addresses = getters.addresses.filter((address) => address.id !== id);
      commit('setAddresses', addresses);

      const firstAddress = addresses[0];

      if (firstAddress) {
        dispatch('setSelectedAddress', firstAddress);
      } else {
        dispatch('setSelectedAddress', null);
      }
    } catch (e) {
      console.log(e);
    }
  },

  async updateAddress({ commit, getters, rootGetters }, address) {
    address.userId = rootGetters['user/id'];
    try {
      const { id } = address;
      const { data: updatedAddress } = await this.$axios.patch(`/api/address/${id}`, address);
      const addresses = [...getters.addresses];
      const idx = addresses.findIndex((address) => address.id === id);
      addresses[idx] = updatedAddress;
      commit('setAddresses', addresses);
    } catch (e) {
      console.log(e);
    }
  },

  async createAddress({
    commit, getters, rootGetters, dispatch,
  }, address) {
    address.userId = rootGetters['user/id'];
    try {
      const { data: createdAddress } = await this.$axios.post('/api/address/', address);
      const addresses = [...getters.addresses];

      addresses.push(createdAddress);

      commit('setAddresses', addresses);

      dispatch('setSelectedAddress', createdAddress);
    } catch (e) {
      console.log(e);
    }
  },

  async setSelectedAddress({ commit }, address) {
    commit('setSelectedAddress', address);
  },

};
export const getters = {
  addresses: ({ addresses }) => addresses,
  selectedAddress: ({ selectedAddress }) => selectedAddress,
};
