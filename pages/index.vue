<template>
  <main class="index">

    <AppSlider v-if="slides.desktop.length  || slides.mobile.length"
               :classes="['main-slider']">
      <swiper-slide v-for="(slide, idx) in slides.desktop"
                    :key="slide.id"
                    class="swiper-slide">
        <img
          :src="slide.path"
          alt=""
          class="slide-desk">
        <img v-if="slides.mobile[idx]"
             :src="slides.mobile[idx].path"
             alt=""
             class="slide-mob">
      </swiper-slide>


    </AppSlider>

    <section
      v-for="currentSectionData in catalog"
      :id="`catalog-${currentSectionData.slug}`"
      :key="currentSectionData.id"
      class="catalog wrapper">
      <div class="title">
        <h3>
          <a href="#">{{ currentSectionData.name }}</a>
        </h3>
      </div>
      <AppCatalogGroup
        :currentSectionData="currentSectionData"
        :has-more="true" />
    </section>

    <div class="content-bottom">
      <div class="wrapper">
        <div class="content-bottom-info">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, beatae, consequatur, dicta dignissimos
            dolorem eaque eos ipsa ipsam laborum magnam officia optio perspiciatis quasi quo sapiente totam vitae
            voluptate? Ad assumenda autem consequuntur culpa nesciunt nihil quam vero! Accusamus adipisci animi
            architecto
            consequatur culpa expedita fugit, incidunt iure natus neque nostrum nulla quas quos ratione suscipit tempore
            voluptas voluptatibus! Cumque, deserunt dignissimos dolor excepturi inventore iure laboriosam magnam
            nesciunt
            nihil numquam quis reiciendis velit voluptatum. Ab accusantium at eos et ipsa neque similique? Accusantium
            ad
            aliquid aperiam aut beatae blanditiis consectetur consequatur cum delectus doloribus eligendi eveniet
            exercitationem explicabo facere hic illo incidunt, inventore
          </p>
          <ul>
            <li>ipsum iure laboriosam laborum libero maxime nam</li>
            <li>nostrum obcaecati officiis possimus quod quos rem reprehenderit</li>
            <li>repudiandae sapiente tempore ullam ut</li>
            <li>veritatis voluptatem voluptatum? Asperiores blanditiis</li>
            <li>consequatur deleniti ducimus enim esse facere harum,</li>
            <li>ipsum laudantium magnam, maiores nostrum officiis quae</li>
            <li>quisquam quod repellendus sint sunt ullam veniam,</li>
            <li>voluptatum. Amet culpa dicta ducimus eius enim expedita</li>
            <li>inventore minus molestiae mollitia nam nesciunt nulla</li>
            <li>placeat quasi qui saepe sequi similique, velit! Ab ad</li>
            <li>adipisci cum, doloremque enim esse est eum eveniet</li>
          </ul>
          <p>
            expedita facilis modi molestiae mollitia natus, numquam officiis, optio quas quod similique sint veritatis!
            Asperiores assumenda autem, dolor enim est exercitationem fugit iusto maxime modi molestias nam
            necessitatibus
            nisi odit pariatur perferendis perspiciatis quo quod soluta sunt tempore veniam veritatis vitae? Ab aliquam
            aliquid asperiores beatae corporis cupiditate earum eligendi exercitationem facilis fuga in ipsam, ipsum
            iusto
            laborum maiores mollitia nihil optio perferendis qui quis quo ratione rem repellendus sapiente tempora totam
            vel? Ad amet animi autem commodi consequatur cumque delectus dolores earum error eum exercitationem id in
            laborum nam neque nihil numquam odio, placeat quo recusandae rerum suscipit totam, vero voluptate
            voluptates?
            Commodi debitis eligendi eveniet explicabo facere, ipsum, neque nihil officiis quidem repudiandae similique
            soluta tenetur voluptas, voluptates voluptatum. A, alias aliquid asperiores atque, consectetur consequatur
            distinctio doloremque, eligendi eveniet inventore magni minima molestias nemo placeat quae quaerat quam
            quasi
            quidem ratione repellat sunt velit veritatis voluptatem.
          </p>
          <p>
            Aperiam at cum facere fugiat illum iure omnis
            repellendus tenetur. Est odio perferendis ullam! Accusantium alias assumenda beatae blanditiis consectetur
            cum
            dicta dolor dolorem eius eligendi, error incidunt ipsum labore laudantium modi mollitia obcaecati, quibusdam
            quod reiciendis rerum sunt tempore tenetur vero voluptas voluptate! Ab dolore esse excepturi fugit, illo
            ipsum
            iusto, labore magnam quod similique, vitae voluptatem voluptatibus. Doloribus esse et harum, nulla repellat
            unde vitae voluptatum. Debitis error fuga ipsa ipsam neque officia quasi unde ut voluptatem. Aliquam
          </p>
          <p>
            architecto at autem blanditiis cumque eligendi eum, fuga id maxime molestiae natus necessitatibus neque
            nesciunt odit officia possimus provident quasi quibusdam tempora tenetur velit veniam voluptatum? Ad aliquid
            aperiam asperiores culpa cumque ducimus fugiat inventore nihil, numquam optio qui quibusdam quod recusandae
            sit, tempore ullam vel veniam. Aliquam aliquid amet architecto, aspernatur, assumenda atque beatae culpa
            doloribus error fugit magnam nihil nulla odio pariatur praesentium quisquam, quo repudiandae. Ad atque
            dolore
            dolores est eveniet expedita, illum laboriosam mollitia numquam obcaecati odit placeat sapiente sequi
            suscipit
            tempora ullam vitae voluptatem.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import AppCatalogGroup from '@/components/catalog/CatalogGroup.vue';

export default {
  components: { AppCatalogGroup },
  async fetch() {
    const { data: slides } = await this.$axios.get('api/slide/');
    slides.forEach(s => {
      if (!s.isMobile) {
        this.slides.desktop.push(s);
      } else {
        this.slides.mobile.push(s);
      }
    });
  },

  data() {
    return {
      slides: {
        desktop: [],
        mobile: [],
      },
    };
  },

  computed: {
    catalog() {
      return this.catalogIsIncludedInMenu.filter(el => el.items.length);
    },

    catalogIsIncludedInMenu() {
      const cat = this.$store.getters['catalog/catalogIsIncludedInMenu'];
      const categories = cat.reduce((acc, el) => {

        if (el.groups.length) {
          acc = acc.concat(el.groups);
        } else {
          acc = acc.concat(el);
        }
        return acc;
      }, []);

      return categories;
    },

  },
};
</script>

<style>
@import "~/node_modules/swiper/css/swiper.css";
</style>
