<template>
  <div class="panel-content">
    <div class="panel-top">
      <div class="panel-title">
        <h1>Гости</h1>
      </div>
      <div class="panel-nav">
        <NavSearch v-model="search" />
        <NavFilter v-model="sort"
                   :sort-list="sortList" />
        <div class="exel">
          <a href="#"
             @click.prevent="getExcel">Выгрузить в excel</a>
        </div>
      </div>
    </div>
    <div class="panel-info">
      <table>
        <tbody>
        <tr>
          <th>ФИО</th>
          <th>Номер телефона</th>
          <th>Дата рождения</th>
          <th>Количество заказов</th>
          <th>Сумма, руб.</th>
        </tr>
        <guest v-for="user in filteredUsers"
               :key="user.id"
               :user="user" />

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { downloadFile } from '@/lib/common.js';

import Guest from '@/components/admin/guests/Guest.vue';
import NavFilter from '@/components/admin/NavFilter.vue';
import NavSearch from '@/components/admin/NavSearch.vue';

export default {
  name: 'guests',
  middleware: ['authenticated'],
  components: { Guest, NavSearch, NavFilter },
  layout: 'admin',
  async fetch() {
    try {
      const { data } = await this.$axios.get('/api/user', {
        headers: {
          'Authorization': `Barer ${this.$store.getters['auth/token']}`
        }
      });

      this.users = data;
    } catch (e) {
      throw e;
    }
  },
  data() {
    return {
      users: [],
      search: '',
      sort: null,
      sortList: [
        { title: 'Новые клиенты', value: 'new' },
        { title: 'Постоянные клиенты', value: 'old' },
        { title: 'По росту цены', value: 'price-asc' },
        { title: 'По убыванию цены', value: 'price-desc' },
        { title: 'По дате рождения', value: 'birthday' },
        { title: 'Мужчины', value: 'man' },
        { title: 'Женщины', value: 'woman' },
      ]
    };
  },

  computed: {

    filteredUsers() {

      let users = this.users;

      if (this.sort) {
        switch (this.sort) {

          case 'new':
            users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'old':
            users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;

          case 'price-asc':
            users.sort((a, b) => a.total - b.total);
            break;
          case 'price-desc':
            users.sort((a, b) => b.total - a.total);
            break;

          case 'man':
            users.sort((a, b) => a.user.gender === 'male');
            break;
          case 'woman':
            users.sort((a, b) => a.user.gender === 'female');
            break;

          case 'birthday':
            users.sort((a, b) => {
              if (!a.user.birthday || !b.user.birthday) {
                return 0;
              }
              return new Date(b.user.birthday) - new Date(a.user.birthday);
            });
            break;

          default:
            users = this.users;
        }
      }
      if (this.search.length) {
        users = users.filter(user => user.phone.toLowerCase().includes(this.search.toLowerCase()));
      }
      return users;
    },

  },

  methods: {
    async getExcel() {
      try {
        const { data, headers } = await this.$axios.get('/api/admin/excel/customers', { responseType: 'arraybuffer' });
        downloadFile(data, 'customers.xlsx', headers['content-type']);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

