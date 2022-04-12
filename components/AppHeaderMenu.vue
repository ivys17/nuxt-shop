<template>
  <div class="header-menu">
    <ul>

      <li>
        <nuxt-link
          to="/catalog">Меню
        </nuxt-link>
      </li>

      <li>
        <nuxt-link
          to="/delivery">Доставка
        </nuxt-link>
      </li>

      <li class="menu-bonus">
        <nuxt-link

          to="/history">Бонусы
        </nuxt-link>
      </li>

      <li>
        <nuxt-link
          to="/promo">Акции
        </nuxt-link>
      </li>

      <li class="menu-more"><span>Ещё</span>
        <ul class="menu-more-list">
          <li>
            <nuxt-link
              to="/aboutus">О нас
            </nuxt-link>
          </li>

        </ul>
      </li>


    </ul>
  </div>
</template>
<script>
export default {
  name: 'AppHeaderMenu',
};
</script>
