<template>
  <div
    :class="{'active': $store.state.isHamburgerMenuOpen}"
    class="sidebar"
    @click="$store.commit('setVisibleHamburgerMenu', false)">
    <div class="sidebar-box">
      <div class="sidebar-close">
        <img alt="close"
             src="@/assets/images/icons/close2.svg">
      </div>
      <div class="sidebar-menu">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.id">
            <nuxt-link
              :to="`/#catalog-${item.slug}`"
              active-class="active">{{ item.name }}
            </nuxt-link>
          </li>

        </ul>
      </div>
      <div class="sidebar-links">
        <ul>
          <li>
            <nuxt-link to="/">Главная</nuxt-link>
          </li>
          <li>
            <a href
               @click.prevent="showJivosite">Оставить отзыв</a></li>
          <li>
            <nuxt-link to="/delivery">Условия доставки</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="sidebar-login">
        <div class="top-login-box top-login-nologin">
          <div class="login-icon">
            <img
              width="17"
              height="22"
              alt="login"
                 src="@/assets/images/icons/login.svg">
          </div>

          <client-only>
            <div
              v-if="$store.getters['user/isAuth']"
              class="login-text">
              <span @click="$router.push('/account')">{{ $store.getters['user/userName'] }}</span>
              <span class="login-text__title"
                    @click="$store.dispatch('user/logoutUser')">(выйти)</span>
            </div>
            <div
              v-else
              class="login-text"
              @click="$store.commit('setModalAuth', true)">Личный кабинет
            </div>
          </client-only>

        </div>
      </div>
      <div class="header-contacts">
        <div class="header-tel">
          <a href="tel:+73433725199"><span>(343)</span> 372-51-99</a>
        </div>
        <div class="header-contacts-text">
          <p @click="callback">заказать обратный звонок</p>
        </div>
      </div>
      <div class="sidebar-messenger">
        <ul>
          <li>
            <a href="#">
              <img alt="viber"
                   src="@/assets/images/icons/viber.svg">
            </a>
          </li>
          <li>
            <a href="#">
              <img alt="whatsapp"
                   src="@/assets/images/icons/whatsapp.svg">
            </a>
          </li>
          <li>
            <a href="">
              <img alt="telegram"
                   src="@/assets/images/icons/telegram.svg">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppSidebar',
  computed: {
    menuItems() {
      return this.$store.getters['catalog/catalogIsIncludedInMenu'];
    },
  },
  methods: {
    showJivosite() {
      window.jivo_api.open();
    },

    callback() {
      this.$store.commit('modal/setIsCallbackModalActive', true);
    }

  },
};
</script>
