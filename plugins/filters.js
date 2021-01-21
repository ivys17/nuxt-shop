import Vue from 'vue';

Vue.filter('price', (value) => {
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumSignificantDigits: 2,
    });
    return formatter.format(value);
  },
);


