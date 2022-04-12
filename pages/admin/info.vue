<template>
  <div class="panel-content">
    <div class="info">
      <div class="info-box">

        <div class="info-banner">
          <div class="info-title">
            <h3>Баннеры для десктопа</h3>
          </div>

          <div v-if="this.slides.desktop"
               class="banner-box">
            <label v-for="slide in this.slides.desktop">
                  <span class="banner">
                      <img :src="`/${slide.path}`"
                           alt="banner">
                  </span>
              <span class="info-btns">
                          <span class="info-del">
                             <img alt="delete"
                                  src="@/assets/admin/images/icons/del.svg"
                                  @click="deleteSlide(slide.id)">
                          </span>
                      </span>
            </label>
          </div>

          <div class="field-add">
            <label>
              <input type="file"
                     @change="addSlide($event, false)">+ Добавить баннер</label>
          </div>
        </div>

        <div class="info-banner">
          <div class="info-title">
            <h3>Баннеры для мобилы</h3>
          </div>

          <div v-if="this.slides.mobile"
               class="banner-box">
            <label v-for="slide in this.slides.mobile">
                        <span class="banner">
                            <img :src="`/${slide.path}`"
                                 alt="banner">
                        </span>
              <span class="info-btns">
                          <span class="info-del">
                             <img alt="delete"
                                  src="@/assets/admin/images/icons/del.svg"
                                  @click="deleteSlide(slide.id)">
                          </span>
                      </span>
            </label>
          </div>

          <div class="field-add">
            <label>
              <input type="file"
                     @change="addSlide($event, true)">+ Добавить баннер</label>
          </div>
        </div>

        <InfoBlock
          v-for="block in BLOCKS"
          :key="block"
          :block-id="block" />

      </div>


    </div>
  </div>
</template>

<script>


import InfoBlock from '@/components/admin/info/InfoBlock.vue';

import { INFO_PAGE_ID, BLOCKS } from '@/config/common.js';

export default {
  name: 'info',
  middleware: ['authenticated'],
  components: { InfoBlock },
  layout: 'admin',

  async fetch() {
    try {
      const { data: slides } = await this.$axios.get('api/slide/');
      slides.forEach(s => {
        if (!s.isMobile) {
          this.slides.desktop.push(s);
        } else {
          this.slides.mobile.push(s);
        }
      });
    } catch (e) {
      console.log(e);
    }

  },

  data() {
    return {
      BLOCKS: BLOCKS,
      slides: {
        desktop: [],
        mobile: [],
      },
    };
  },

  methods: {
    async addSlide(evt, isMobile) {
      const newSlide = {
        isMobile,
      };

      const fileInput = evt.target;
      const formData = new FormData();

      const file = fileInput.files[0];
      formData.append('file', file);

      try {
        const { data: newFileData } = await this.$axios.post('/api/file/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Barer ${this.$store.getters['auth/token']}`,
            },
          },
        );

        newSlide.fileId = newFileData.id;

        const { data: newSlideData } = await this.$axios.post('/api/slide/',
          newSlide,
          {
            headers: {
              'Authorization': `Barer ${this.$store.getters['auth/token']}`,
            },
          });

        newSlide.path = newFileData.path;
        newSlide.id = newSlideData.id;

        if (!isMobile) {
          this.slides.desktop.push(newSlide);
        } else {
          this.slides.mobile.push(newSlide);
        }

        fileInput.value = '';

      } catch (e) {
        console.log(e);
      }

    },

    async deleteSlide(id) {
      try {
        await this.$axios.delete(`/api/slide/${id}`, {
          headers: {
            'Authorization': `Barer ${this.$store.getters['auth/token']}`,
          },
        });

        this.slides.desktop = this.slides.desktop.filter(s => s.id !== id);
        this.slides.mobile = this.slides.mobile.filter(s => s.id !== id);

      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.ql-editor {
  min-height : 500px;
}
</style>
