<template>
  <main>
    <div class="about" />
  </main>
</template>

<script>

import { BLOCKS } from '@/config/common.js';

export default {
  name: 'Delivery',

  data() {
    return {
      isShowReq: false,
      about1: '',
      about2: '',
    };
  },

  async fetch() {
    const [about1, about2] = await Promise.all([
      await this.$axios.get(`/api/block/${BLOCKS.ABOUT_1}`),
      await this.$axios.get(`/api/block/${BLOCKS.ABOUT_2}`),
    ]);

    if (about1.data) {
      this.about1 = about1.data;
    }

    if (about2.data) {
      this.about2 = about2.data;
    }
  },
  head() {
    return {
      title: 'Заказать столик в ресторане',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Заказ столика в ресторане. ',
        },
      ],
    };
  },

};
</script>
