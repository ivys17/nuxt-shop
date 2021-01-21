const host = 'https://frontend-test.idaproject.com';

const state = () => ({
  productsByCategories: [],
  categories: [],
  sortData: {
    title: 'цене',
    name: 'По цене',
    value: 'price',
    sortingFunction: (a, b) => a.price - b.price,
  },
});

const mutations = {

  setProductsByCategories(state, { products, id }) {
    state.productsByCategories[id] = products.map(el => ({ ...el, photo: `${host}${el.photo}` }));
  },

  setCategories(state, categories) {
    state.categories = categories;
  },

  setSortData(state, sortData) {
    state.sortData = sortData;
  },
};

const actions = {
  async fetchProductsByCategories({ commit }, id) {
    const response = await fetch(`${host}/api/product?category=${id}`);
    const products = await response.json();

    commit('setProductsByCategories', { products, id });
  },

  async fetchCategories({ commit }) {
    const response = await fetch(`${host}/api/product-category`);
    const categories = await response.json();
    commit('setCategories', categories);
  },

  setSortData({ commit }, sortData) {
    commit('setSortData', sortData);
  },
};
const getters = {
  productsByCategories: (state, getters) => (id) => state.productsByCategories[id],
  categories: (state) => state.categories,
  sortData: (state) => state.sortData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
