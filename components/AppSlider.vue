<template>
  <div
    :class="classes"
    class="slider"
  >
    <swiper :options="swiperOptions">
      <slot />

      <div
        slot="pagination"
        class="swiper-pagination"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />
      <div
        slot="button-next"
        class="swiper-button-next"
      />
    </swiper>
  </div>
</template>
<script>
export default {

  name: 'AppSlider',
  props: {
    classes: {
      type: Array,
    },
  },
  data() {
    return {
      swiperOptions: {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 11,
        autoplay: {
          delay: 3000,
        },
        lazy: {
          loadPrevNext: true,
        },
        breakpoints: {
          // when window width is >= 767px
          767: {
            spaceBetween: 30,
          },
        },

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },

};
</script>
