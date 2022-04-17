import { GOOGLE_MAPS_API_KEY } from './config/map/mapSettings.js';
import axios from 'axios';
import dotenv from 'dotenv';

import { GLOBAL_SEO_META_TAG, YANDEX_COUNTER_ID, GOOGLE_COUNTER_ID } from './config/common.js';

const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';

export default {

  server: {
    port: process.env.FRONT_SERVER_PORT,
    host: isDev ? process.env.FRONT_DEV_DOMAIN : process.env.FRONT_PROD_DOMAIN,
    timing: false,

  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    title: GLOBAL_SEO_META_TAG.title,
    titleTemplate: GLOBAL_SEO_META_TAG.titleTemplate,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: GLOBAL_SEO_META_TAG.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: GLOBAL_SEO_META_TAG.keywords,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', crossorigin: 'crossorigin', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
      },
    ],
    script: [
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&language=ru&region=RU&libraries=geometry`,
      },
    ],
  },
  loading: { color: '#e41d2d', height: '4px' },

  router: {},

  css: [
    '~/node_modules/vue-multiselect/dist/vue-multiselect.min.css',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
  ],

  plugins: [
    '~/plugins/vue-awesome-swiper.js',
    '~/plugins/directives.js',
    { src: '~/plugins/vue-notification-ssr.js', mode: 'server' },
    { src: '~/plugins/vue-notification-client.js', mode: 'client' },
    { src: '~plugins/nuxt-quill-plugin', mode: 'client' },
    '~/plugins/nuxt-ssr-screen-size.js',
    '~/plugins/vue-mask.js',
    '~/plugins/axios.js',
    '~/plugins/common.js',
    '~/plugins/local-storage.js',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg',
    [
      '@nuxtjs/google-analytics', {
      id: GOOGLE_COUNTER_ID,
    }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-client-init-module',
    'cookie-universal-nuxt',
    '@nuxt/image',
    [
      'nuxt-vuex-localstorage', {
      ...(isDev && {
        mode: 'debug',
      }),
      localStorage: ['cart', 'user', 'address', 'auth'], //  If not entered, “localStorage” is the default value
    }],
    '@nuxtjs/sitemap',
  ],

  sitemap: {
    hostname: process.env.FRONT_SERVER_URL,
    exclude: [
      '/admin',
      '/admin/**',
      '/complete-error',
      '/complete',
      '/checkout',
      '/account',
      '/cart',
    ],
    routes: async () => {
      const result = [];
      const [g, p] = await Promise.all([
        axios.get(`${process.env.FRONT_SERVER_URL}/api/catalog/groups`),
        axios.get(`${process.env.FRONT_SERVER_URL}/api/catalog/product`),
      ]);

      const groups = g.data;
      const products = p.data;

      result.push(...groups.map(g => `/menu/${g.slug}`));
      result.push(...products.map(p => {
        const g = groups.find(el => el.iikoId === p.parentGroup);
        if (!g) {
          return '';
        }
        return `/menu/${g.slug}/${p.slug}`;
      }));

      return result;
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    '/api/': process.env.FRONT_API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'App name',
      short_name: 'App name',
      description: 'App name',
      lang: 'ru',
      start_url: '/?homescreen=1',
      background_color: '#e41d2d',
      theme_color: '#e41d2d',
      display: 'standalone',
    },
    icon: {
      source: '[srcDir]/[staticDir]/icon.png',
    },
  },
  image: {
    // Options
  },

  serverMiddleware: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true,
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    extend(config, ctx) {

      config.node = {
        fs: 'empty',
      };

      const ORIGINAL_TEST = '/\\.(png|jpe?g|gif|webp)$/i';
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: '5-30',
          speed: 7,
          strip: true,
        },
        jpegtran: {
          progressive: true,

        },
        gifsicle: {
          interlaced: true,
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true,
          }),

        ],
      });
      if (!ctx.isDev) {
        config.plugins.push(imageMinPlugin);
      }
    },
  },

};
