<template>
  <div class="content__sort sort-block">
    <div class="sort-block__header">
      <div class="sort-block__title">Сортировать по:
      </div>
      <div class="sort-block__value"
           @click="toggleSortItems">{{ sort.title }}
        <svg class="sort-block__icon"
             width="5"
             height="3"
             viewBox="0 0 5 3"
             fill="none">
          <path d="M5 0H0L2.5 2.5L5 0Z"
                fill="#59606D" />
        </svg>
      </div>
    </div>
    <div class="sort-block__dropdown"
         v-if="isShow">
      <div v-for="(sortItem, index) in sortItems"
           :key="index"
           @click="setSorting(sortItem)"
           class="sort-block__item sort-block__item--active">{{ sortItem.name }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSort',
  data() {
    return {
      isShow: false,
      sortItems: [
        { title: 'цене', name: 'По цене', value: 'price' },
        { title: 'популярности', name: 'По популярности', value: 'popular' },
      ],
    };
  },
  methods: {
    toggleSortItems() {
      this.isShow = !this.isShow;
    },
    setSorting(sortItem) {
      this.$store.dispatch('catalog/setSort', sortItem);
      this.isShow = false;
    },
  },
  computed: {
    sort() {
      return this.$store.getters['catalog/sort'];
    },
  },
};
</script>

<style scoped
       lang="scss">

.sort-block {
  position : relative;
  // .sort-block__header
  &__header {
    display : flex;

  }

  // .sort-block__title
  &__title {

  }

  // .sort-block__value
  &__value {
    display     : flex;
    align-items : center;
    margin-left : 6px;
    color       : $grey-color;
    cursor      : pointer;
  }

  // .sort-block__icon
  &__icon {
    margin-left : 4px;
    cursor      : pointer;
  }

  // .sort-block__dropdown
  &__dropdown {
    background    : $white-color;
    box-shadow    : 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius : 8px;
    padding       : 8px 0;
    position      : absolute;
    margin-top    : 6px;
    z-index       : 1;
    left          : 0;
    right         : 0;
  }

  // .sort-block__item
  &__item {
    color   : $black-color;
    padding : 4px 12px;
    cursor  : pointer;

    &:hover {
      background : $grey-extra-light-color;
    }

    // .sort-block__item--active
    &--active {
    }
  }
}
</style>
