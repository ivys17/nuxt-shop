import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Blocks,
} = models;

export const getBlock = async (id) => {
  try {
    return await Blocks.findByPk(id);
  } catch (e) {
    throw e;
  }
};

export const createBlock = async (block) => {
  try {
    return await Blocks.create(block);
  } catch (e) {
    throw e;
  }
};

export const updateBlock = async (id, block) => {
  try {
    await Blocks.update({
      ...block,
    }, {
      where: {
        id,
      },
    });

    return getBlock(id);
  } catch (e) {
    throw e;
  }
};

export const deleteBlock = async (id) => {
  try {
    await Blocks.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    throw e;
  }
};
