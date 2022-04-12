import * as orderRepo from './order.repository.js';
import * as iikoService from '../iiko/iiko.service.js';

export const getOrdersAll = async () => {
  const orders = await orderRepo.getOrdersAll();
  orders.sort((a, b) => b.createdAt - a.createdAt);
  return orders;
};

export const setStatus = async (id, status) => {
  try {
    await orderRepo.setStatus(id, status);
  } catch (e) {
    throw e;
  }
};

export const setIsTelegramSend = async (id, status) => {
  try {
    await orderRepo.setIsTelegramSend(id, status);
  } catch (e) {
    throw e;
  }
};

export const setIsIikoSend = async (id, status) => {
  try {
    await orderRepo.setIsIikoSend(id, status);
  } catch (e) {
    throw e;
  }
};

export const setIikoId = async (id, iikoId) => {
  try {
    await orderRepo.setIikoId(id, iikoId);
  } catch (e) {
    throw e;
  }
};

export const getOrderInfo = async (id) => {
  try {
    await iikoService.getOrderInfo(id);
  } catch (e) {
    throw e;
  }
};
