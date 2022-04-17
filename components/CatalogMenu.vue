<template>
  <nav>
    <div
      v-if="menuItems.length"
      ref="navMenu"
      class="nav"
    >
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="nav-item"
      >
        <nuxt-link
          :to="`/menu/${item.slug}`"
          active-class="active"
        >
          {{ item.name }}
        </nuxt-link>
      </div>

      <div
        v-if="menuItemsMore.length"
        v-click-outside="hideMenu"
        :class="{'open': isOpen}"
        class="nav-item nav-more"
        @click="toggleMenu"
      >
        <span>Ещё</span>
      </div>
      <div
        v-if="menuItemsMore.length"
        :class="{'open': isOpen}"
        class="hidden-menu"
      >
        <div
          v-for="item in menuItemsMore"
          :key="item.id"
          class="nav-item"
        >
          <nuxt-link
            :to="`/menu/${item.slug}`"
            active-class="active"
          >
            {{ item.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'CatalogMenu',
  data() {
    return {
      isOpen: false,
      visibleMenuCount: 7,
    };
  },
  computed: {
    menuItemsRAW() {
      return this.$store.getters['catalog/catalogIsIncludedInMenu'];
    },
    menuItems() {
      return this.menuItemsRAW.slice(0, this.visibleMenuCount);
    },
    menuItemsMore() {
      return this.menuItemsRAW.slice(this.visibleMenuCount);
    },
  },
  mounted() {
    this.adaptiveMenu();
  },
  beforeMount() {
    window.addEventListener('resize', this.adaptiveMenu);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adaptiveMenu);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    hideMenu() {
      this.isOpen = false;
    },
    adaptiveMenu() {
      if (!this.$refs?.navMenu) {
        return;
      }

      const { navMenu } = this.$refs;
      const navMenuWidth = navMenu.offsetWidth;
      const navMenuChildren = [...navMenu.children];
      const navMenuChildrenWidth = navMenuChildren
        .reduce((acc, item) => acc += item.offsetWidth, 0);

      if (navMenuWidth < navMenuChildrenWidth) {
        let sumWidth = 0;
        let counter = 0;
        for (counter = 0; counter < navMenuChildren.length; counter += 1) {
          const item = navMenuChildren[counter];
          const itemWidth = item.offsetWidth;
          if (sumWidth + itemWidth < navMenuWidth) {
            sumWidth += itemWidth;
            continue;
          }
          this.visibleMenuCount = counter - 1;
          break;
        }
      }
    },
  },

};
</script>
