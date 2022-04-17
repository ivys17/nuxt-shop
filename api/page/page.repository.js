import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Pages,
} = models;

export const getPages = async () => {
  try {
    return await Pages.findAll();
  } catch (e) {
    throw e;
  }
};

export const getPage = async (id) => {
  try {
    return await Pages.findByPk(id);
  } catch (e) {
    throw e;
  }
};

export const createPage = async (page) => {
  try {
    return await Pages.create(page);
  } catch (e) {
    throw e;
  }
};

export const updatePage = async (id, page) => {
  try {
    await Pages.update({
      ...page,
    }, {
      where: {
        id,
      },
    });

    return getPage(id);
  } catch (e) {
    throw e;
  }
};

export const deletePage = async (id) => {
  try {
    await Pages.destroy({
      where: {
        id,
      },
    });
  } catch (e) {
    throw e;
  }
};
