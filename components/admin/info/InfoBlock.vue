<template>
  <div
    v-if="blockData"
    class="info-block"
  >
    <div class="info-block__inner">
      <h3 class="info-block__title">
        {{ blockData.title }}
      </h3>
      <div class="info-block__wrapper">
        <div class="info-block__content info-field">
          <!--          <AppEditor v-model="blockData.content" />-->
          <textarea v-model="blockData.content" />
        </div>

        <div class="info-block__buttons">
          <div
            class="info-block__btn"
            @click="save"
          >
            <img
              alt="edit"
              src="@/assets/admin/images/icons/edit.svg"
            >
          </div>
          <div
            v-if="false"
            class="info-block__btn"
            @click="remove()"
          >
            <img
              alt="delete"
              src="@/assets/admin/images/icons/del.svg"
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="blockData.isMultiple"
      class="info-block__add"
    >
      + Добавить раздел
    </div>
  </div>
</template>

<script>
import AppEditor from '@/components/admin/AppEditor.vue';

export default {
  name: 'InfoBlock',
  components: { AppEditor },
  props: {
    blockId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      blockData: null,
    };
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get(`/api/block/${this.blockId}`);

      if (data) {
        this.blockData = data;
      }
    } catch (e) {
      throw e;
    }
  },
  methods: {
    async save() {
      const page = {
        slug: 'admin/info',
        content: this.page,
      };
      await this.$axios.patch(`api/block/${this.blockId}`, this.blockData, {
        headers: {
          Authorization: `Barer ${this.$store.getters['auth/token']}`,
        },
      });
    },

    remove() {
      alert('не реализованно');
    },
  },
};
</script>

<style scoped>
.info-block {
  margin-top : 50px;

}

.info-block__inner {
  position       : relative;
  border-bottom  : 1px solid #1b1c1f;
  padding-bottom : 30px;
  margin-bottom  : 30px;
}

.info-block__title {
  font-size   : 35px;
  line-height : 42px;
  font-weight : normal;
}

.info-block__content {
  margin-top : 20px;
}

.info-block__buttons {
  display  : flex;
  position : absolute;
  top      : 15px;
  right    : -80px;
}

.info-block__btn {
  cursor       : pointer;
  margin-right : 15px;
}

.info-block__btn:last-child {
  margin-right : 0;
}

.info-block__wrapper {
  position      : relative;
  margin-bottom : 20px;
}

.info-block__add {
  font-size   : 16px;
  line-height : 19px;
  color       : #edbd01;
  cursor      : pointer;
  display     : inline-block;
}
</style>
