import { sequelize } from '../db.js';
import initModels from '../models/init-models.js';

const models = initModels(sequelize);
const {
  Orders,
  Customers,
  Addresses,
  OrderProductModifiers,
  OrderProducts,
} = models;

export const getOrdersAll = async () => {
  try {
    return await Orders.findAll({
      include: [
        {
          model: Customers,
          as: 'user',
        },
        {
          model: Addresses,
          as: 'address',
        },
      ],

    });
  } catch (e) {
    throw e;
  }
};

export const createOrder = async (order) => {
  try {
    return await Orders.create(order);
  } catch (e) {
    throw e;
  }
};

export const setStatus = async (id, status) => {
  try {
    await Orders.update({
      status,
    }, {
      where: { id },
    });
  } catch (e) {
    throw e;
  }
};

export const setIsTelegramSend = async (id, status) => {
  try {
    await Orders.update({
      isTelegramSend: status,
    }, {
      where: { id },
    });
  } catch (e) {
    throw e;
  }
};

export const setIsIikoSend = async (id, status) => {
  try {
    await Orders.update({
      isIikoSend: status,
    }, {
      where: { id },
    });
  } catch (e) {
    throw e;
  }
};
export const getOrder = async (id) => {
  try {
    return await Orders.findByPk(id, {

      include: [
        {
          model: OrderProducts,
          as: 'orderProducts',

          include: [
            {
              model: OrderProductModifiers,
              as: 'orderProductModifiers',
            },
          ],
        },
        {
          model: Customers,
          as: 'user',
        },
        {
          model: Addresses,
          as: 'address',
        },
      ],
    });
  } catch (e) {
    throw e;
  }
};
