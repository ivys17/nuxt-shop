import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.FRONT_SERVER_URL;

export const WORK_TIME = [
  { open: '10:00', close: '23:00' }, // Sunday
  { open: '10:00', close: '23:00' }, // Monday
  { open: '10:00', close: '23:00' },
  { open: '10:00', close: '23:00' }, // Wednesday
  { open: '10:00', close: '23:00' },
  { open: '10:00', close: '23:00' }, // Friday
  { open: '10:00', close: '23:00' }, // Saturday
];

export const TIME_CAN_SELL_BUSINESS_LUNCH = [
  { open: '00:00', close: '00:00' }, // Sunday
  { open: '10:00', close: '17:00' }, // Monday
  { open: '10:00', close: '17:00' },
  { open: '10:00', close: '17:00' }, // Wednesday
  { open: '10:00', close: '17:00' },
  { open: '10:00', close: '17:00' }, // Friday
  { open: '00:00', close: '00:00' }, // Saturday
];

export const GLOBAL_SEO_META_TAG = {
  titleTemplate: '%s',
  title: 'Доставка готовой еды на дом',
  description: 'Доставка еды на дом',
  keywords: '',
};

export const SECTION_ID_ADD_TO_ORDER = '32127627-48e6-4361-9726-96d64310230d';

export const YANDEX_COUNTER_ID = 0;

export const GOOGLE_COUNTER_ID = '';

export const IIKO_SERVER_URL = 'https://iiko.biz:9900';

export const RESTAURANT_LIST = [
  {
    value: 'eaf065a2-5b70-d5b4-017b-19e361d96218',
    text: 'Московское шоссе, 1',
    address: {
      city: 'Москва',
      street: 'Московское шоссе',
      home: '1',
    },
  },
  {
    value: '504753f4-b771-80df-0169-863393883570',
    text: 'Московское шоссе, 2',
    address: {
      city: 'Москва',
      street: 'Московское шоссе',
      home: '2',
    },
  },
  {
    value: '4e41e931-1569-5e84-015e-ff88bce30efc',
    text: 'Московское шоссе, 3',
    address: {
      city: 'Москва',
      street: 'Московское шоссе',
      home: '3',
    },
  },
  {
    value: '1058d331-ff6d-705a-0170-623b78fbbb82',
    text: 'Московское шоссе, 4',
    address: {
      city: 'Москва',
      street: 'Московское шоссе',
      home: '4',
    },
  },
];

export const IIKO_CARD_PROGRAM_IDS = [
  'c47abe5e-159f-11ea-80dd-d8d385655247', // bonus
];

export const ADMIN_ORDER_STATUSES = {
  NEW: 'новый',
  WAIT_PAYMENT: 'ожидает оплату',
  PAYED: 'оплачен',
  COMPLETED: 'завершен',
};

export const CITY_NAME = 'Нижний Тагил';

export const INFO_PAGE_ID = 1;

export const STORE_VERSION = 9;

export const BLOCKS = {
  DELIVERY_1: 2,
  DELIVERY_2: 3,
  ABOUT_1: 4,
  ABOUT_2: 5,
};
