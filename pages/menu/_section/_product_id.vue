<template>
  <main>
    <div class="product">
      <div class="product-back">
        <a href
           @click.prevent="$router.go(-1)">
          <span class="product-back-arrow"></span>
          <span class="product-back-text">Вернуться назад</span>
        </a>
      </div>
      <div class="product-box wrapper">
        <div class="product-img">
          <nuxt-img
            :alt="currentProductData.name"
            :src="imagePath"
            format="webp"
            loading="lazy"
            quality="100"
            sizes="xs:540"
            width="540" />
        </div>
        <div class="product-info">
          <div class="product-info-top">
            <div class="product-title">
              <h1>{{ currentProductData.name }}</h1>
            </div>
            <div class="product-desc">
              <p>{{ currentProductData.description }}</p>
            </div>
          </div>
          <div class="product-info-bottom">
            <div class="product-price">


              <div :class="{'active': isProductInCart}"
                   class="addcart"
                   @click.prevent="addToCart(currentProductData)">
                <div>
                  <span class="addcart-text">{{ isProductInCart ? 'В корзине' : 'Корзина' }}</span>
                  <span class="addcart-img"></span>
                </div>
              </div>


              <div class="price">
                <span>{{ currentProductData.price }} ₽</span>
              </div>
            </div>
            <div class="characteristic">

              <table>
                <tbody>
                <tr>
                  <td>белки</td>
                  <td>жиры</td>
                  <td>углеводы</td>
                  <td>ккал</td>
                  <td>Вес</td>
                </tr>
                <tr>
                  <td>{{ fiberAmount }}</td>
                  <td>{{ fatAmount }}</td>
                  <td>{{ carbohydrateAmount }}</td>
                  <td>{{ energyAmount }}</td>
                  <td>{{ weight }}</td>
                </tr>
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppPageBack from '@/components/AppPageBack.vue';

function getFiberFatCarbohydrateEnergyWeightFromMod(fieldName) {
  let result = 0;

  if (this.currentProductData[fieldName]) {
    result += this.currentProductData[fieldName];
  }

  if (this.currentProductData.groupModifiers?.length) {
    this.currentProductData.groupModifiers.forEach(gm => {
      if (gm.modifiers[0]) {
        result += gm.modifiers[0][fieldName];
      }
    });
  }

  const average = result;

  return average.toFixed(1);
}

export default {
  components: {
    AppPageBack,
  },
  head() {
    return {
      title: `Заказать ${this.currentProductData.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Оформите заказ на ${this.currentProductData.name}`,
        },

      ],
    };
  },
  validate({ store, params }) {
    return typeof store.getters['catalog/currentProductData'](params.product_id) !== 'undefined';
  },
  methods: {
    addToCart({ id: productId }) {
      this.$store.dispatch('cart/addItem', { productId });
    },
  },
  computed: {
    imagePath() {
      return this.currentProductData.image;
    },

    currentProductData() {
      return this.$store.getters['catalog/currentProductData'](this.$route.params.product_id);
    },

    productsInCartIds() {
      return this.$store.getters['cart/productsInCartIds'];
    },

    isProductInCart() {
      return this.productsInCartIds.includes(this.currentProductData.id);
    },

    fiberAmount() {
      return getFiberFatCarbohydrateEnergyWeightFromMod.call(this, 'fiberAmount');
    },

    fatAmount() {
      return getFiberFatCarbohydrateEnergyWeightFromMod.call(this, 'fatAmount');
    },

    carbohydrateAmount() {
      return getFiberFatCarbohydrateEnergyWeightFromMod.call(this, 'carbohydrateAmount');
    },

    energyAmount() {
      return getFiberFatCarbohydrateEnergyWeightFromMod.call(this, 'energyAmount');
    },

    weight() {
      return getFiberFatCarbohydrateEnergyWeightFromMod.call(this, 'weight') * 1000;
    },

  },

};
</script>

<style scoped>

</style>
