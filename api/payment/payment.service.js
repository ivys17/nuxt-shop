import axios from 'axios';

import * as catalogService from '../catalog/catalog.service.js';
import * as orderRepo from '../order/order.repository.js';
import * as orderService from '../order/order.service.js';
import * as paymentRepo from '../payment/payment.repository.js';
import * as telegramApi from '../telegram/telegram.api.js';

export const payOrder = async (orderId) => {
  try {
    const orderModel = await orderRepo.getOrder(orderId);
    const sberbankAuth = await paymentRepo.getSberbankAuth(orderModel.zoneId);

    if (!sberbankAuth) {
      return null;
    }

    //https://securepayments.sberbank.ru/payment/rest/register.do - prod
    //https://3dsec.sberbank.ru/payment/rest/register.do - test
    const { data } = await axios.post(sberbankAuth.registerDoLink, {}, {
      params: {
        'userName': sberbankAuth.login,
        'password': sberbankAuth.password,
        'orderNumber': orderModel.id,
        'amount': orderModel.total * 100,
        'returnUrl': sberbankAuth.returnUrl,
        'failUrl': sberbankAuth.failUrl,
        'sessionTimeoutSecs': sberbankAuth.sessionTimeoutSecs,
      },
    });

    if (data.orderId && data.formUrl) {

      const orderSberbank = {
        orderId: orderModel.id, sberbankOrderId: data.orderId, formUrl: data.formUrl,
      };

      await paymentRepo.createOrderSberbank(orderSberbank);
      await orderService.setStatus(orderId, 'WAIT_PAYMENT');
    }
    return data.formUrl;

  } catch (e) {
    throw e;
  }

};

export const checkOrderPayment = async (orderNumber) => {
  try {
    const orderModel = await orderRepo.getOrder(orderId);
    const sberbankAuth = await paymentRepo.getSberbankAuth(orderModel.zoneId);

    if (!sberbankAuth) {
      return null;
    }

    //https://securepayments.sberbank.ru/payment/rest/getOrderStatusExtended.do - prod
    //https://3dsec.sberbank.ru/payment/rest/getOrderStatusExtended.do - test
    const { data } = await axios.get(sberbankAuth.getOrderStatusExtendedDoLink, {
      params: {
        'userName': sberbankAuth.login,
        'password': sberbankAuth.password,
        'orderNumber': orderNumber,

      },
    });

    const errorCode = parseInt(data.errorCode, 10);

    if (!errorCode) {
      const orderId = parseInt(data.orderNumber, 10);
      const orderStatus = parseInt(data.orderStatus, 10);
      const actionCodeDescription = data.actionCodeDescription;

      const orderSberbank = {
        orderId: orderId,
        errorCode: orderStatus,
        errorMessage: data.errorMessage,
        orderStatus: data.orderStatus,
        actionCode: data.actionCode,
        actionCodeDescription: actionCodeDescription,
      };

      await paymentRepo.updateOrderSberbank(orderSberbank);

      switch (orderStatus) {
        case 0:
          await telegramApi
            .sendMessageAllTelegramUsers(
              `Заказ ${orderId} зарегистрирован, но не оплачен.\n${actionCodeDescription}`);
          break;

        case 1:
          await telegramApi
            .sendMessageAllTelegramUsers(
              `Заказ ${orderId}: предавторизованная сумма удержана (для двухстадийных платежей).`);
          break;

        case 2:
          await telegramApi.sendMessageAllTelegramUsers(`Заказ ${orderId} оплачен.`);
          await catalogService.processOrder(orderId);
          break;

        case 3:
          await telegramApi.sendMessageAllTelegramUsers(`Заказ ${orderId}: авторизация отменена.`);
          break;

        case 4:
          await telegramApi
            .sendMessageAllTelegramUsers(
              `Заказ ${orderId}: по транзакции была проведена операция возврата.`);
          break;

        case 5:
          await telegramApi
            .sendMessageAllTelegramUsers(
              `Заказ ${orderId}: инициирована авторизация через сервер контроля доступа банка-эмитента.`);
          break;

        case 6:
          await telegramApi.sendMessageAllTelegramUsers(
            `Заказ ${orderId}: авторизация отклонена.\n${actionCodeDescription}`);
          break;

        default:
          await telegramApi
            .sendMessageAllTelegramUsers(`Заказ ${orderId}: проблема с оплатой заказа`);

      }
      await orderService.setStatus(orderId, 'PAYED');
      await orderService.setStatus(orderId, 'COMPLETED');

    } else {
      console.log(data.errorMessage);
    }

  } catch (e) {
    console.log(e);
  }
};

export const callbackSberbank = async (orderNumber) => {
  const message = `Получено уведомление от банка. Выполняем проверку.`;
  await telegramApi.sendMessageAllTelegramUsers(message);

  await checkOrderPayment(orderNumber);
};

export const getPayments = async () => {
  return await paymentRepo.getPayments();
};

export const createPayments = async (payments) => {
  return await paymentRepo.createPayments(payments);
};

export const getPaymentByCode = async (code) => {
  return await paymentRepo.getPaymentByCode(code);
};
