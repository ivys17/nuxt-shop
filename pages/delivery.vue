<template>
  <main>
    <div class="delivery-page">
      <div class="delivery">
        <div class="delivery-map">
          <iframe height="490"
                  src="https://www.google.com/maps/d/embed?mid=1BB6qOexs9xgTk7oJIcR72FNfcS0-G0c7"
                  style="border: 0;"
                  width="100%"></iframe>

        </div>
        <div v-if="delivery1.content" class="delivery-content"
             v-html="delivery1.content"></div>
      </div>
      <div v-if="delivery2.content" class="delivery-bottom">
        <div v-html="delivery2.content"  class="wrapper">

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { BLOCKS } from '@/config/common.js';

export default {
  name: 'delivery',
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

  data() {
    return {
      delivery1: '',
      delivery2: '',
    };
  },

  methods: {},
};
</script>
