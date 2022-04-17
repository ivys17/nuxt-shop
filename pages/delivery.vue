<template>
  <main>
    <div class="delivery-page">
      <div class="delivery">
        <div class="delivery-map">
          <iframe
            height="490"
            src="https://www.google.com/maps/d/embed?mid=1BB6qOexs9xgTk7oJIcR72FNfcS0-G0c7"
            style="border: 0;"
            width="100%"
          />
        </div>
        <div
          v-if="delivery1.content"
          class="delivery-content"
          v-html="delivery1.content"
        />
      </div>
      <div
        v-if="delivery2.content"
        class="delivery-bottom"
      >
        <div
          class="wrapper"
          v-html="delivery2.content"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { BLOCKS } from '@/config/common.js';

export default {
  name: 'Delivery',

  data() {
    return {
      delivery1: '',
      delivery2: '',
    };
  },

  async fetch() {
    const [delivery1, delivery2] = await Promise.all([
      await this.$axios.get(`/api/block/${BLOCKS.DELIVERY_1}`),
      await this.$axios.get(`/api/block/${BLOCKS.DELIVERY_2}`),
    ]);

    if (delivery1.data) {
      this.delivery1 = delivery1.data;
    }

    if (delivery2.data) {
      this.delivery2 = delivery2.data;
    }
  },
  head() {
    return {
      title: 'Условия доставки',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Условия работы',
        },
      ],
    };
  },

  methods: {},
};
</script>
