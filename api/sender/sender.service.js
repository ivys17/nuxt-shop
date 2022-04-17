import axios from 'axios';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import Handlebars from 'handlebars';

import { fileURLToPath } from 'url';
import CLogger from '../lib/CLogger.js';

import { sendMessageAllTelegramUsers } from '../telegram/telegram.api.js';
import { getStorage } from '../storage/storage.service.js';

import * as senderRepo from './sender.repository.js';
import * as telegramApi from '../telegram/telegram.api.js';
import * as iikoApi from '../iiko/iiko.api.js';
import * as catalogService from '../catalog/catalog.service.js';
import * as orderService from '../order/order.service.js';
import * as paymentService from '../payment/payment.service.js';

import { formatDateForSending } from '../catalog/catalog.helper.js';

import { RESTAURANT_LIST } from '../../config/common.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logger = new CLogger();

export const sendMessage = async (order) => {
  await Promise.all([
    sendMessageTelegram(order),
    sendMessageIiko(order),
  ]);
};

export const buildOrderForSending = async (orderData) => {
  const order = { ...orderData };

  order.formatDate = formatDateForSending(order.createdAt);

  order.deliveryTypeHTML = order.isSelfService ? 'самовывоз' : 'доставка';

  // TODO: get payments from DB
  order.paymentTypeHTML = {
    MCARD: 'Банковская карта (online)',
    CARD: 'картой курьеру',
    CASH: 'наличными при получении',
  }[order.paymentType];

  const rest = RESTAURANT_LIST.find((r) => r.value === order.zoneId);
  order.restaurantName = (rest && rest.text) || 'не определен';

  order.itemsHTML = order.orderProducts.map((i) => {
    const mods = i.orderProductModifiers.map((m) => `[${m.name} - ${m.amount}шт.]`).join(', ');
    return `${i.name} - ${i.amount}шт. ${mods}`;
  }).join('\n');

  return order;
};

export const sendMessageTelegram = async (order) => {
  const orderForSending = await buildOrderForSending(order);
  fs.readFile(path.resolve(__dirname, '../views/telegram.views.hbs'), 'utf8').then(async (data) => {
    const template = Handlebars.compile(data);
    const message = template({ order: orderForSending });

    try {
      const telegramUsers = await senderRepo.getUsersToSend();
      await Promise.all(
        telegramUsers.map((user) => telegramApi.sendMessageTelegram(user.telegramChatId, message)),
      );
    } catch (e) {
      console.log('Проблемы с телегой');
    }
  });
};

export const sendSMS = async (phone, message, sender = 'sender') => {
  try {
    const { smsUser, smsPassword } = await getStorage();

    const dataForSending = {
      login: smsUser,
      psw: smsPassword,
      phones: phone,
      mes: message,
      sender,
    };

    const { data } = await axios.get('https://smsc.ru/sys/send.php', {
      params: dataForSending,
    });
    return data;
  } catch (e) {
    logger.log(e);
  }
};

const getPaymentItems = async (order) => {
  const { user: customer } = order;

  const result = [];
  const paymentType = await paymentService.getPaymentByCode(order.paymentType);

  const paymentItem = {
    sum: order.total,
    paymentType: {
      id: paymentType.id,
    },
    isProcessedExternally: paymentType.isProcessedExternally ?? 0,
  };

  if (order.spendBonus) {
    const paymentTypeBonus = await paymentService.getPaymentByCode('INET');
    const paymentItemBonus = {
      sum: order.spendBonus,
      paymentType: {
        id: paymentTypeBonus.id,
      },
      isProcessedExternally: paymentTypeBonus.isProcessedExternally ?? 0,
      //! !!!!!!don't touch this. iiko required only format "{\"searchScope\": \"PHONE\", \"credential\": \"+7**********\"}"
      additionalData: '{"searchScope": "PHONE", "credential": "+7**********"}',
    };
    paymentItem.sum -= order.spendBonus;
    result.push(paymentItemBonus);
  }

  result.push(paymentItem);
  return result;
};

export const sendMessageIiko = async (order) => {
  const { user, address, orderProducts } = order;

  const paymentItems = await getPaymentItems(order);

  try {
    const data = {
      customer: {
        name: user.name,
        phone: user.phone,
      },
      coupon: order.coupon,
      order: {
        date: order.createdAt,
        phone: user.phone,
        isSelfService: order.isSelfService,
        comment: order.comment,

        items: orderProducts.map((p) => {
          const { orderProductModifiers: mods } = p;

          const item = {
            id: p.iikoId,
            name: p.name,
            amount: p.amount,
            code: p.code,
          };

          if (mods?.length) {
            item.modifiers = mods.map((m) => ({
              id: m.iikoId,
              name: m.name,
              amount: m.amount,
            }));
          }
          return item;
        }),
        address,
        paymentItems,
      },
    };

    const iikoAnswer = await iikoApi.sendMessageIiko(data);
    await catalogService.createOrderIikoAnswer(order.id, iikoAnswer);
    await orderService.setIsIikoSend(order.id, true);
  } catch (e) {
    console.log(e);

    let errorDetail = '';
    if (e?.response?.data) {
      errorDetail = JSON.stringify(e?.response?.data, null, 2);
    }

    const message = `Проблема с отправкой заказа в iiko.
    Номер заказа ${order.id}.
    Клиент: ${user.name}.
    Телефон: ${user.phone}.
    Сумма заказа: ${order.total}
    Ошибка: ${e}
    ${errorDetail}`;
    await sendMessageAllTelegramUsers(message);
  }
};
