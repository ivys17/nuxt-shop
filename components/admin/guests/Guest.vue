<template>
  <tr>
    <td>{{ user.name ? user.name : 'не задано' }}</td>
    <td><a :href="`tel:${user.phone}`">{{ formatPhoneNumber(user.phone) }}</a></td>
    <td
      v-if="!isEditing"
      @click="clickBirthdayHandler"
    >
      {{ formatBirthday(user.birthday) }}
    </td>
    <td v-else>
      <input
        v-model="birthday"
        type="date"
      > <span @click="saveBirthday">сохранить</span>
    </td>
    <td>{{ user.count }}</td>
    <td>{{ formatCurrency(user.sum) }}</td>
  </tr>
</template>
<script>
import { formatCurrency, formatDate, formatPhoneNumber } from '@/lib/common.js';

export default {
  name: 'Guest',
  props: {
    user: {
      type: Object,
    },

  },
  data() {
    return {
      birthday: this.user.birthday,
      isEditing: false,
    };
  },
  methods: {
    formatPhoneNumber(phone) {
      if (!phone) {
        return 'не задан';
      }
      return formatPhoneNumber(phone);
    },

    formatBirthday(date) {
      return date ? formatDate(date, { hasTime: false }) : 'не указан';
    },

    formatCurrency(number) {
      return number ? formatCurrency(number) : 'нет данных';
    },
    clickBirthdayHandler() {
      this.isEditing = true;
    },
    async saveBirthday() {
      this.isEditing = false;
      this.user.birthday = this.birthday;
      try {
        await this.$axios.$patch('/api/user/', { user: this.user });
      } catch (e) {
        console.log(e);
        alert('Данные покупателя не обновлены. Попробуйте еще раз или свяжитесь с администратором сайта.');
      }
    },
  },
};
</script>

<style scoped>
input[type='date'] {
  color         : #000;
  font-size     : 14px;
  line-height   : 17px;
  padding       : 13px 40px 13px 20px;
  font-family   : Tahoma, sans-serif;
  box-shadow    : 0 4px 25px rgb(0 0 0 / 5%);
  border-radius : 6px;
  border        : 0;
  width         : 190px;
  height        : 44px;
  margin        : auto;
}

input[type='date'] + span {
  font-size   : 12px;
  margin-left : 15px;
  cursor      : pointer;
}
</style>
