import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Addresses,
} = models;

export const getAddresses = async () => {
  try {
    return await Addresses.findAll({
      where: {
        isDeleted: false,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const getAddressesByUserId = async (userId) => {
  try {
    return await Addresses.findAll({
      where: {
        userId,
        isDeleted: false,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const getAddressById = async (id) => {
  try {
    return await Addresses.findByPk(id);
  } catch (e) {
    throw e;
  }
};

export const createAddress = async (address) => {
  try {
    const foundAddress = await Addresses.findOne({
      where: {
        ...address,
      },
    });

    if (foundAddress) {
      return foundAddress;
    }

    return await Addresses.create(address);
  } catch (e) {
    throw e;
  }
};

export const updateAddress = async (id, address) => {
  try {
    await Addresses.update({
      ...address,
    }, {
      where: {
        id,
      },
    });

    return getAddressById(id);
  } catch (e) {
    throw e;
  }
};

export const deleteAddress = async (id) => {
  try {
    await Addresses.update({
      isDeleted: true,
    }, {
      where: {
        id,
      },
    });
  } catch (e) {
    throw e;
  }
};
