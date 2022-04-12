import { sequelize } from '../db.js';

import initModels from '../models/init-models.js';

const models = initModels(sequelize);
const {
  Slides,
} = models;

export const getSlides = async () => {
  try {
    return await Slides.findAll({ raw: true });
  } catch (e) {
    throw e;
  }
};

export const getSlide = async (id) => {
  try {
    return await Slides.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
  } catch (e) {
    throw e;
  }
};

export const createSlide = async (slide) => {
  try {
    return await Slides.create(slide);
  } catch (e) {
    throw e;
  }
};

export const deleteSlide = async (id) => {
  try {
    await Slides.destroy({
      where: {
        id: id,
      },
    });
  } catch (e) {
    throw e;
  }
};
