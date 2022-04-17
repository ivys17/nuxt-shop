<template>
  <div class="header-menu">
    <ul>
      <li v-for="item in menuItems">
        <a
          href
          @click.prevent.self="closeMenu(item.link)"
        >{{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>

const menuItems = [
  { title: 'Меню', link: 'menu' },
  { title: 'О нас', link: 'about' },
  { title: 'Доставка', link: 'delivery' },
  { title: 'Отзывы', link: 'reviews' },
  { title: 'Вакансии', link: 'vacancy' },
];

export default {
  name: 'AppHeaderMenu',
  data() {
    return {
      menuItems,
    };
  },
  methods: {
    async closeMenu(path) {
      await this.$router.push(path);
      if (this.$store.state.isHamburgerMenuOpen) {
        this.$store.commit('setVisibleHamburgerMenu', false);
      }
    },
  },
};
</script>

<style lang="scss"
       scoped>

.header-menu {
  font-size : 16px;

  position  : relative;

  @media screen and (max-width : 1439px) {
    width : auto;
  }
}

.header-menu-hidden {
  display : none;
}

.header-menu-hidden.active {
  display : block;
}

.header-menu ul li:last-child {
  margin : 0;
}

.header-menu ul {
  display   : flex;
  flex-wrap : wrap;
}

.header-menu ul {
  justify-content : center;
}

.header-menu ul li {
  margin-right : 35px;
}

.header-menu ul li.menu-more {
  color    : #c6ced1;
  position : relative;
}

@media screen and (max-width : 1199px) {
  .header-menu {
    padding    : 25px 35px 0 35px;
    border-top : 1px solid #e7eef1;
  }

  .header-menu ul li {
    margin : 0 0 25px 0;
  }

  .header-menu ul li:last-child {
    margin : 0;
  }

  .header-menu ul {
    display : block;
  }
}

</style>
