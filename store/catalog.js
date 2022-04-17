import {
  SECTION_ID_ADD_TO_ORDER,
  STORE_VERSION,
  TIME_CAN_SELL_BUSINESS_LUNCH,
} from '@/config/common.js';
import { checkWorkTime } from '@/lib/common.js';

export const state = () => ({
  catalog: [],
  products: [],
  recommendedProducts: [],
  stopList: [],
  likingProduct: [],

  version: STORE_VERSION,

});

export const mutations = {
  setCatalog(state, payload) {
    state.catalog = payload;
  },

  setProducts(state, payload) {
    state.products = payload;
  },

  setRecommendedProducts(state, payload) {
    state.recommendedProducts = payload;
  },

  setStopList(state, payload) {
    state.stopList = payload;
  },

  setLikes(state, { id, likes }) {
    const idx = state.products.findIndex((p) => p.id === id);
    if (idx === -1) {
      return;
    }
    const products = [...state.products];
    const product = products[idx];
    if (state.likingProduct.includes(product.id)) {
      return;
    }

    products[idx].likes = likes;
    state.products = products;
    state.likingProduct.push(product.id);
  },

};

export const actions = {
  async initCatalog({ commit }) {
    const canBuyBusinessLunch = checkWorkTime(TIME_CAN_SELL_BUSINESS_LUNCH) === true;

    try {
      const { data: { groups, products, stopList } } = await this.$axios.get('/api/catalog');

      const groupWithItems = groups.map((g) => ({
        ...g,
        items: products.filter((p) => p.parentGroup === g.id),
      }));
      const catalog = groupWithItems
        .filter((g) => g.isIncludedInMenu)
        .filter((g) => {
          // if not business lunch
          if (g.id !== 'c3142dda-d79f-4769-8a56-6d03f0524ba6') {
            return true;
          }
          return canBuyBusinessLunch;
        })
        .map((g) => ({
          ...g,
          groups: groupWithItems.filter((el) => el.parentGroup === g.id),
        }));

      const recommendedProducts = catalog.find((el) => el.id === SECTION_ID_ADD_TO_ORDER);

      commit('setCatalog', catalog);
      commit('setProducts', products);
      commit('setRecommendedProducts', recommendedProducts.items);
      commit('setStopList', stopList);
    } catch (e) {
      console.log(e);
    }
  },

};
export const getters = {
  catalog: ({ catalog }) => catalog,

  products: ({ products }) => products,

  catalogIsIncludedInMenu: ({ catalog }) => catalog.filter((group) => {
    const { additionalInfo } = group;

    if (additionalInfo?.deliveryMobile?.isSticker) {
      return false;
    }

    if (additionalInfo?.deliveryMobile?.isHide) {
      return false;
    }

    return group.isIncludedInMenu;
  }),

  currentSectionData: ({ catalog }) => (slug) => catalog.find((s) => s.slug === slug),

  currentProductData: ({ products }) => (slug) => products.find((s) => s.slug === slug),

  productByCode: ({ products }) => (code) => products.find((p) => p.code === code),

  productById: ({ products }) => (id) => products.find((p) => p.id === id),

  zoneStopList: ({ stopList }) => (zoneId) => stopList
    .filter((s) => s.deliveryTerminalId === zoneId),

  recommendedProducts: ({ recommendedProducts }, { products }, rootState, rootGetters) => {
    const lostGift = rootGetters['cart/lostGift'];
    if (lostGift?.length) {
      const gifts = products.filter((p) => lostGift.includes(p.code));
      gifts.forEach((product) => product.isGift = true);
      return [...recommendedProducts, ...gifts];
    }
    return recommendedProducts;
  },
};
