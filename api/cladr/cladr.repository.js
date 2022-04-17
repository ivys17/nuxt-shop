import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const { Cities, Streets } = models;

export const getCladrAll = async () => {
  try {
    return await Streets.findAll();
  } catch (e) {
    throw e;
  }
};

export const updateCities = async (cities) => {
  try {
    const rows = await Cities.bulkCreate(cities, {
      updateOnDuplicate: [...Object.keys(cities[0])],
    });

    return Cities.findAll({
      where: {
        iikoId: rows.map((r) => r.iikoId),
      },
    });
  } catch (e) {
    throw e;
  }
};

export const updateStreets = async (streets) => {
  try {
    return await Streets.bulkCreate(streets, {
      updateOnDuplicate: [...Object.keys(streets[0])],
    });
  } catch (e) {
    throw e;
  }
};
