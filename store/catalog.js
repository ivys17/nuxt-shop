const host = 'https://frontend-test.idaproject.com';

const state = () => ({
  productsByCategories: [],
  categories: [],
  sort: {
    title: 'цене',
    name: 'По цене',
    value: 'price',
    f: (a, b) => a.price - b.price,
  },
});

const mutations = {

  setProductsByCategories(state, { products, id }) {
    state.productsByCategories[id] = products.map(el => ({ ...el, photo: `${host}${el.photo}` }));
  },

  setCategories(state, categories) {
    state.categories = categories;
  },

  setSort(state, sortItem) {
    state.sort = sortItem;
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

  setSort({ commit }, sortItem) {
    commit('setSort', sortItem);
  },
};
const getters = {
  productsByCategories: (state) => (id) => state.productsByCategories[id],
  categories: (state) => state.categories,
  sort: (state) => state.sort,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
