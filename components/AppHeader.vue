<template>


  <header :class="{'active': $store.state.isHamburgerMenuOpen}">
    <div class="header wrapper">
      <AppHamburgerMenuBtn />

      <div class="header-logo">
        <nuxt-link to="/">
          ALEONOV
        </nuxt-link>
      </div>
      <div class="header-box">
        <div class="header-contacts">
          <div class="header-contacts-item">
            <div class="header-tel">
              <a href="tel:+79999999999">8 (999) 99-99-99</a>
            </div>
            <p>с 10:00 до 24:00</p>
          </div>
          <div class="header-login">
            <client-only>
              <a v-if="!isAuth"
                 href
                 @click.prevent="$store.commit('setModalAuth', true );">Войти
                <img alt="login"
                     src="@/assets/images/icons/login.svg"></a>

              <a v-else
                 href="#"
                 @click.prevent="modalLogout=true">{{ $store.getters['user/balance'] }}
                <img alt="ruble"
                     src="@/assets/images/icons/rub.svg"></a>

            </client-only>


          </div>
        </div>
        <AppHeaderMenu />
        <div class="menu-app">
          <div class="menu-app-logo">
            <a href="/">
              ALEONOV
            </a>
          </div>
          <div class="menu-app-social social">
            <ul>
              <li>
                <a href="#"
                   target="_blank">
                  <img alt="vk"
                       src="@/assets/images/icons/vk.svg">
                </a>
              </li>
              <li><a href="#"
                     target="_blank">
                <img alt="instagram"
                     src="@/assets/images/icons/insta.svg">
              </a>
              </li>
              <li>
                <a href="#"
                   target="_blank">
                  <img alt="facebook"
                       src="@/assets/images/icons/facebook.svg">
                </a>
              </li>
            </ul>
          </div>
          <div class="menu-app-company">
            <p>{{ currentYear }} г.</p>
          </div>
          <div class="menu-app-link">
            <p>
              <NuxtLink target="_blank"
                        to="/rule">Политика конфиденциальности
              </NuxtLink>
            </p>
          </div>
          <div class="app-mob">
            <p>Устанавливай:</p>
            <div class="app-mob-box">
              <a href="#">
                <img alt="app store"
                     src="@/assets/images/icons/appstore.png">
              </a>
              <a href="#">
                <img alt="foofle play"
                     src="@/assets/images/icons/gplay.png">
              </a>
            </div>
          </div>
        </div>
      </div>
      <CartHeaderButton />
    </div>

    <CatalogMenu />
    <ModalLogout v-if="modalLogout"
                 @close="modalLogout=false" />

  </header>
</template>
<script>
import ModalLogout from '@/components/modal/ModalLogout.vue';
import AppHamburgerMenuBtn from '~/components/AppHamburgerMenuBtn.vue';
import CartHeaderButton from '~/components/cart/CartHeaderButton.vue';
import CatalogMenu from '~/components/CatalogMenu.vue';
import AppHeaderMenu from '~/components/AppHeaderMenu.vue';

export default {
  name: 'AppHeader',
  components: { ModalLogout, AppHamburgerMenuBtn, CartHeaderButton, CatalogMenu, AppHeaderMenu },
  data() {
    return {
      modalLogout: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth'];
    },

    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {

  },

};
</script>
