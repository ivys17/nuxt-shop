<template>
  <div class="panel-content">
    <div class="panel-top">
      <div class="panel-title">
        <h1>Товары</h1>
      </div>
      <div class="panel-nav">
        <NavSearch v-model="search" />
        <NavFilter
          v-model="sort"
          :sort-list="sortList"
        />
      </div>
    </div>
    <div class="procucts-nav">
      <ul>
        <li>
          <a
            :class="{'active': currentCat === 'all'}"
            href
            @click.prevent="filterCategories('all')"
          >Все</a>
        </li>
        <li v-for="cat in categories">
          <a
            :class="{'active': currentCat === cat.id}"
            href
            @click.prevent="filterCategories(cat.id)"
          >{{ cat.name }}</a>
        </li>
      </ul>
    </div>
    <div class="panel-info">
      <table>
        <tbody>
          <tr>
            <th>Название блюда</th>
            <th>Описание</th>
            <th>Состав</th>
            <th>Граммы</th>
            <th>Стоимость</th>
            <th>Раздел</th>
            <th>Фото</th>
          </tr>
          <tr v-for="product in products">
            <td>
              <div class="products-name">
                <label>
                  <input
                    checked
                    type="checkbox"
                  >
                  <span class="products-mark" />
                  <span class="products-title">{{ product.name }}</span>
                </label>
              </div>
            </td>
            <td>
              <a
                v-if="product.description && product.description.length > 0"
                href="#"
              >Посмотреть описание</a>
              <a
                v-else
                href="#"
              >Нет описания</a>
            </td>
            <td>
              <a
                v-if="product.composition && product.composition.length > 0"
                href="#"
              >Посмотреть состав</a>
              <a
                v-else
                href="#"
              >Нет состава</a>
            </td>
            <td>{{ (product.weight * 1000).toFixed(0) }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>{{ getGroup(product.parentGroup) }}</td>
            <td>
              <div
                v-if="product.image && !product.image.includes('stub')"
                class="photo"
              >
                <img
                  alt="check"
                  src="@/assets/admin/images/icons/check2.svg"
                >
              </div>
              <div
                v-else
                class=""
              >
                —
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavSearch from '@/components/admin/NavSearch.vue';
import NavFilter from '@/components/admin/NavFilter.vue';

import { formatCurrency } from '@/lib/common.js';

export default {
  name: 'Products',
  components: { NavSearch, NavFilter },
  layout: 'admin',
  middleware: ['authenticated'],
  data() {
    return {
      search: '',
      currentCat: 'all',
      sort: null,
      sortList: [
        { title: 'Новые товары', value: 'new' },
        { title: 'Старые товары', value: 'old' },
        { title: 'По росту цены', value: 'price-asc' },
        { title: 'По убыванию цены', value: 'price-desc' },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.getters['catalog/catalog'].map((c) => ({ name: c.name, id: c.id }));
    },
    products() {
      let products = [...this.$store.getters['catalog/products']];
      if (this.currentCat === 'all') {
        products = [...this.$store.getters['catalog/products']];
      } else {
        products = this.$store.getters['catalog/products'].filter((p) => p.parentGroup === this.currentCat);
      }

      if (this.sort) {
        switch (this.sort) {
          case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'old':
            products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'new':
            products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          default:
            products = this.$store.getters['catalog/products'];
        }
      }
      if (this.search.length) {
        products = products.filter((p) => p.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      return products;
    },
  },
  methods: {
    filterCategories(cat) {
      this.currentCat = cat;
    },
    formatCurrency(n) {
      return formatCurrency(n);
    },
    resetSorting() {
      this.sort = null;
    },
    getGroup(parentGroup) {
      const catalog = this.$store.getters['catalog/catalog'];

      const group = catalog.find((g) => g.iikoId === parentGroup);
      return group ? group.name : '—';
    },
  },
};
</script>

<style scoped>

</style>
