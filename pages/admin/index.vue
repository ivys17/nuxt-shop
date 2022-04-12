<template>
  <client-only>
    <div class="panel-login">
      <div class="panel-login-bg">
        <div class="panel-login-wrap">
          <div class="panel-login-close"
               @click="$router.push('/')">
            <img alt="close"
                 src="@/assets/admin/images/icons/close2.svg">
          </div>
          <div class="panel-login-title">
            <h1>Вход</h1>
          </div>
          <div class="panel-login-form">
            <form action="" @submit.prevent="auth" autocomplete="on">
              <div class="panel-name">
                <input
                  v-model="login"
                  placeholder="Введите ваш логин"
                  type="text">
              </div>
              <div class="panel-pass">
                <input
                  v-model="password"
                  placeholder="Введите ваш пароль"
                  type="password">
              </div>
              <button>Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'login',
  layout: 'admin-login',
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    async auth() {

      try {
        const { data } = await this.$axios.post('/api/auth/login', { login: this.login, password: this.password });
        if (data.token) {
          this.$store.commit('auth/setAuthToken', data.token);
          await this.$router.push('/admin/history');
        }
      } catch (e) {
        this.$notify({
          group: 'messages',
          type: 'error',
          text: 'Пара логин и пароль не подходят.',
        });
      }

    },
  },

};
</script>

<style scoped>

</style>
