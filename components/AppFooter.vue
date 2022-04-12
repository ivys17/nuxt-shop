<template>

  <footer>
    <div class="footer wrapper">
      <div class="footer-box">
        <div class="footer-company">
          <p>{{ currentYear }} г.</p>
        </div>
        <div class="footer-link">
          <NuxtLink target="_blank"
                    to="/rule">Политика конфиденциальности
          </NuxtLink>
        </div>
      </div>
      <div class="footer-box footer-center">
        <div class="footer-logo">
          <a href="/">
            <img alt="logo"
                 src="@/assets/images/icons/logo.png">
          </a>
        </div>
        <div class="footer-social social">
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
      </div>
      <div class="footer-box footer-right">
        <p>Устанавливай:</p>
        <div class="footer-app">
          <a href="#"
             target="_blank">
            <img alt="app store"
                 src="@/assets/images/icons/appstore.png">
          </a>
          <a href="#"
             target="_blank">
            <img alt="google play"
                 src="@/assets/images/icons/gplay.png">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>


export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
