import * as crypto from 'crypto';

import { Sequelize } from 'sequelize';

import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Customers,
  Streets,
  Orders,
  Cities,
} = models;

export const getUserByPhone = async (phone) => {
  try {
    return await Customers.findOne({
      where: { phone },

    });
  } catch (e) {
    throw e;
  }
};

export const createUser = async (user) => {
  user.id = crypto.randomUUID();
  try {
    const createdUser = await Customers.create(user);
    return createdUser.get({ plain: true });
  } catch (e) {
    throw e;
  }
};

export const updateUserByUserPhone = async (user) => {
  try {
    const userModel = await Customers.findOne({ where: { phone: user.phone } });
    // await userModel.update(user)
    Object.assign(userModel, user);
    await userModel.save();
    return userModel;
  } catch (e) {
    throw e;
  }
};

export const getUsers = async () => {
  try {
    const users = await Customers.findAll({
      attributes: [
        'id',
        'name',
        'phone',
        'birthday',
        [Sequelize.fn('sum', Sequelize.col('total')), 'sum'],
        [Sequelize.fn('count', Sequelize.col('orders.id')), 'count'],
      ],
      group: ['id'],
      include: [
        {
          model: Orders,
          as: 'orders',
          required: false,
          attributes: [],

        },
      ],
    });

    return users.map((u) => u.get({ plain: true }));
  } catch (e) {
    throw e;
  }
};

export const updateUser = async (user) => {
  try {
    return await Customers.update(user, {
      where: {
        phone: user.phone,
      },
    });
  } catch (e) {
    throw e;
  }
};
