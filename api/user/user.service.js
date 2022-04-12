import * as iikoApi from '../iiko/iiko.api.js';

import CLogger from '../lib/CLogger.js';
import * as senderService from '../sender/sender.service.js';
import * as userHelper from './user.helper.js';
import * as userRepo from './user.repository.js';

const logger = new CLogger();

export const getUser = async (phone) => {

  let user = await getUserByPhone(phone);

  if (!user) {
    user = await createUser({ phone });
  }

  iikoApi.getCustomer(phone).then((userFromIiko) => {
    //save old id
    userFromIiko.id = user.id;
    updateUser(userFromIiko);
  });

  return user;

};

export const createUser = async (user) => {
  if (!user.phone?.length) {
    throw new Error('Phone is required');
  }

  user.phone = userHelper.normalizePhone(user.phone);
  const createdUser = await userRepo.createUser(user);

  const dataForUpdate = {
    customer: {
      phone: createdUser.phone,
    },
  };

  if (createdUser.name) {
    dataForUpdate.customer.name = createdUser.name;
  }

  if (createdUser.birthday) {
    dataForUpdate.customer.birthday = createdUser.birthday;
  }

  iikoApi.createOrUpdate(dataForUpdate).catch(e => {
    console.log(e);
  });

  return createdUser;
};

export const updateUser = async (user) => {
  try {
    user.phone = userHelper.normalizePhone(user.phone);
    return await userRepo.updateUser(user);
  } catch (e) {
    logger.log(e);
  }

};

export const updateUserByUserPhone = async (user) => {
  try {
    user.phone = userHelper.normalizePhone(user.phone);
    return await userRepo.updateUserByUserPhone(user);
  } catch (e) {
    logger.log(e);
  }
};

export const getUserByPhone = async (phone) => {
  const normalPhone = userHelper.normalizePhone(phone);
  try {
    return await userRepo.getUserByPhone(normalPhone);
  } catch (e) {
    logger.log(e);
  }
};

export const sendSMS = async (phone) => {
  const code = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  try {
    const result = await senderService.sendSMS(phone, code);
    return { code: code };
  } catch (e) {
    logger.log(e);
  }
};

export const getUsers = async () => {
  return await userRepo.getUsers();
};

