import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Reviews,
} = models;

export const getReviews = async () => {
  try {
    return await Reviews.findAll({
      where: {
        isDeleted: false,
      },
    });
  } catch (e) {
    throw e;
  }
};

export const createReview = async (review) => {
  try {
    return await Reviews.create(review);
  } catch (e) {
    console.log(e);
  }
};
