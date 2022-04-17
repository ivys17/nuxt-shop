<template>
  <client-only>
    <div class="account-page">
      <div class="wrapper">
        <div class="wrap">
          <div class="page-title">
            <h1>Профиль</h1>
          </div>
          <div class="account">
            <form action="#">
              <div class="account-field">
                <input
                  v-model="user.username"
                  placeholder="Ваше имя"
                  type="text"
                >
              </div>
              <div class="account-field">
                <input
                  v-model="user.phone"
                  placeholder="+7 (999) 999-99-99"
                  type="text"
                >
              </div>
              <div class="account-field">
                <input
                  v-model="user.email"
                  placeholder="Ваш email"
                  type="text"
                >
              </div>
              <div class="account-flex">
                <div class="account-field">
                  <select v-model="user.gender">
                    <option
                      v-for="sex in sexes"
                      :key="sex.value"
                      :value="sex.value"
                    >
                      {{ sex.title }}
                    </option>
                  </select>
                </div>
                <div class="account-field">
                  <input
                    v-model="user.birthday"
                    placeholder="Введите дату рождения"
                    type="date"
                  >
                </div>
              </div>
              <div class="account-field-title">
                <h3>Ваши адреса</h3>
              </div>

              <ul
                v-if="addresses"
                class="address-list field-radio"
              >
                <AddressItem
                  v-for="address in addresses"
                  :key="address.id"
                  :address="address"
                  @edit="editAddress(address)"
                />
              </ul>

              <AccountAddress
                v-if="isAddressAdding"
                :address="editingAddress"
                @complete="completeAddress"
              />
              <div
                v-else
                class="add-address"
              >
                <span @click="isAddressAdding = true">Добавить ещё адрес +</span>
              </div>
              <div
                v-if="!isAddressAdding"
                class="checkout-agree agree"
              >
                <input
                  id="agree"
                  v-model="agree"
                  checked=""
                  class="checkbox"
                  type="checkbox"
                >
                <label for="agree" />
                <p>
                  Я согласен с условиями
                  <a
                    href="/policy.pdf"
                    target="_blank"
                  >обработки моих персональных данных</a>
                </p>
              </div>
              <div
                v-if="agree && !isAddressAdding"
                class="account-btn"
              >
                <button
                  @click.prevent="saveUser"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import AccountAddress from '@/components/account/AccountAddress.vue';
import AddressItem from '@/components/account/AddressItem.vue';

export default {
  name: 'Account',
  components: { AccountAddress, AddressItem },
  middleware: 'checkout',
  data() {
    return {
      user: {},
      address: {},
      editingAddress: null,
      isAddressAdding: false,

      /// ///
      agree: true,
      sexes: [
        { value: 'male', title: 'мужской' },
        { value: 'female', title: 'женский' },

      ],
    };
  },
  computed: {
    userStore() {
      return this.$store.getters['user/user'];
    },
    addresses() {
      return this.$store.getters['address/addresses'];
    },
  },

  watch: {
    userStore() {
      this.user = { ...this.userStore };
    },
  },

  created() {
    this.user = { ...this.userStore };
  },

  methods: {
    saveUser() {
      this.$store.dispatch('user/setUser', { ...this.user });
    },

    editAddress(address) {
      this.editingAddress = address;
      this.isAddressAdding = true;
    },

    completeAddress(address) {
      this.isAddressAdding = false;
      this.editingAddress = null;
    },

  },

};
</script>

<style>

</style>
