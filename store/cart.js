const host = 'https://frontend-test.idaproject.com';

const state = () => ({
  cart: [],
});

const mutations = {
  setCart(state, cart) {
    state.cart = cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  },

};

const actions = {
  initCart({ commit }) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    commit('setCart', cart);
  },
  addProductCart({ state, commit }, product) {
    const cart = [...state.cart];
    cart.push(product);
    commit('setCart', cart);
  },
  removeProductCart({ state, commit }, id) {
    const cart = state.cart.filter((el) => el.id !== id);
    commit('setCart', cart);
  },

  clearCart({ commit }) {
    const cart = [];
    commit('setCart', cart);
  },

};
const getters = {
  cartProducts: (state) => state.cart,
  cartCount: (state) => state.cart.length,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
