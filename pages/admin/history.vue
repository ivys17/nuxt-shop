<template>
  <div class="panel-content">
    <div class="panel-top">
      <div class="panel-title">
        <h1>История</h1>
      </div>
      <div class="panel-nav">
        <NavSearch v-model="search" />
        <NavFilter
          v-model="sort"
          :sort-list="sortList"
        />
        <div class="exel">
          <a
            href="#"
            @click.prevent="getExcel"
          >Выгрузить в exel</a>
        </div>
      </div>
    </div>
    <div class="panel-info">
      <table>
        <tbody>
          <tr>
            <th>Номер заказа</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Имя и телефон</th>
            <th>Адрес</th>
            <th>Статус</th>
          </tr>

          <tr
            v-for="order in filteredOrders"
            :key="order.id"
          >
            <td>{{ order.id }}</td>
            <td>{{ formatDate(order.createdAt) }}</td>
            <td>{{ formatCurrency(order.total) }}</td>
            <td>{{ order.user.name }} ❘ {{ formatPhoneNumber(order.user.phone) }}</td>
            <td>{{ renderAddress(order.address) }}</td>
            <td>
              <span
                :class="`status-${order.status}`"
                class="status"
              >{{
                ADMIN_ORDER_STATUSES[order.status]
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { ADMIN_ORDER_STATUSES } from '@/config/common.js';
import {
  downloadFile, formatCurrency, formatDate, formatPhoneNumber, renderAddress,
} from '@/lib/common.js';
import NavSearch from '../../components/admin/NavSearch.vue';
import NavFilter from '../../components/admin/NavFilter.vue';

export default {
  name: 'History',
  components: { NavFilter, NavSearch },
  layout: 'admin',
  middleware: ['authenticated'],
  data() {
    return {
      orders: [],
      search: '',
      sort: null,

      //
      ADMIN_ORDER_STATUSES,

      sortList: [
        { title: 'Новые клиенты', value: 'new' },
        { title: 'Постоянные клиенты', value: 'old' },
        { title: 'По росту цены', value: 'price-asc' },
        { title: 'По убыванию цены', value: 'price-desc' },
        { title: 'По дате рождения', value: 'birthday' },
        { title: 'Мужчины', value: 'man' },
        { title: 'Женщины', value: 'woman' },
      ],
    };
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get('/api/order', {
        headers: {
          Authorization: `Barer ${this.$store.getters['auth/token']}`,
        },
      });

      this.orders = data;
    } catch (e) {
      await this.$router.push('/admin');
    }
  },
  computed: {

    filteredOrders() {
      let { orders } = this;

      if (this.sort) {
        switch (this.sort) {
          //  price-asc price-desc birthday man woman

          case 'new':
            orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'old':
            orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;

          case 'price-asc':
            orders.sort((a, b) => a.total - b.total);
            break;
          case 'price-desc':
            orders.sort((a, b) => b.total - a.total);
            break;

          case 'man':
            orders.sort((a, _) => (a.user.gender === 'male' ? 1 : -1));
            break;
          case 'woman':
            orders.sort((a, _) => (a.user.gender === 'female' ? 1 : -1));
            break;

          case 'birthday':
            orders.sort((a, b) => {
              if (!a.user.birthday || !b.user.birthday) {
                return 0;
              }
              return new Date(b.user.birthday) - new Date(a.user.birthday);
            });
            break;

          default:
            orders = this.orders;
        }
      } else {
        orders = this.orders;
      }
      if (this.search.length) {
        orders = orders.filter((order) => order.user.phone.toLowerCase().includes(this.search.toLowerCase()));
      }
      return orders;
    },

  },
  methods: {
    formatPhoneNumber(phone) {
      return formatPhoneNumber(phone);
    },
    formatDate(date) {
      return formatDate(date, { hasTime: true });
    },

    formatCurrency(number) {
      return formatCurrency(number);
    },

    renderAddress(address) {
      return renderAddress(address);
    },
    async getExcel() {
      try {
        const { data, headers } = await this.$axios.get('/api/admin/excel/orders', { responseType: 'arraybuffer' });
        downloadFile(data, 'orders.xlsx', headers['content-type']);
      } catch (e) {
        console.log(e);
      }
    },
  },

};
</script>
