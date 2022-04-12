import QueryTypes from 'sequelize';

import { sequelize } from '../db.js';
import initModels from '../models/init-models.js';

const models = initModels(sequelize);
const {
  Groups,
  Products,
  ShopImages,
  OrderProducts,
  OrderProductModifiers,
  ProductModifiers,
  OrderIikoAnswer,
  ProductGroupModifiers,
  ProductGroupModifiersChildren,
  StopList
} = models;

export const getGroupsAll = async () => {
  try {

    const groups = await sequelize.query(
      `SELECT g.name,
              g.id,
              g.parentGroup,
              g.isIncludedInMenu,
              g.order,
              g.additionalInfo,
              MAX(i.fileName) as image
       FROM \`groups\` g
              LEFT JOIN shopImages i
                        on g.id = i.ownerId
       GROUP BY g.id`,
      {
        model: Groups,
        mapToModel: true,
        raw: true
      });
    return groups;

  } catch (e) {
    throw e;
  }
};

export const getProductsAll = async () => {
  try {

    const products = await sequelize.query(
      `SELECT p.id,
              p.description,
              p.seoDescription,
              p.name,
              p.code,
              p.parentGroup,
              p.price,
              p.weight,
              p.order,
              p.energyAmount,
              p.fiberAmount,
              p.fatAmount,
              p.carbohydrateAmount,
              p.additionalInfo,
              p.likes,
              p.tags,
              p.createdAt,
              MAX(i.fileName) as image
       FROM \`products\` p
              LEFT JOIN shopImages i
                        on p.id = i.ownerId
       GROUP BY p.id`,
      {
        model: Products,
        mapToModel: true,
        raw: true
      });

    return products;
  } catch (e) {
    throw e;
  }
};

export const getProduct = async (id) => {
  //TODO: implement
  return false;
};

export const getModifiersAll = async () => {
  try {
    return await ProductModifiers.findAll({
      raw: true,
    });
  } catch (e) {
    throw e;
  }
};

export const getGroupModifiers = async () => {
  try {
    return await ProductGroupModifiers.findAll({
      raw: true
    });
  } catch (e) {
    throw e;
  }
};

export const getGroupModifiersChildren = async () => {
  try {
    return await ProductGroupModifiersChildren.findAll({
      raw: true, nest: true
    });
  } catch (e) {
    throw e;
  }
};

export const createOrderItem = async (basketItem) => {
  try {
    return await OrderProducts.create(basketItem);
  } catch (e) {
    throw e;
  }
};

export const createOrderProductModifier = async (mod) => {
  try {
    return await OrderProductModifiers.create(mod);
  } catch (e) {
    throw e;
  }
};

export const getImagesAll = async () => {
  try {
    return await ShopImages.findAll({
      raw: true,
    });
  } catch (e) {
    throw e;
  }
};

export const createOrderIikoAnswer = async (answerData) => {
  try {
    return await OrderIikoAnswer.create(answerData);
  } catch (e) {
    throw e;
  }
};

export const likeProduct = async (id) => {
  try {
    await Products.increment('likes', { by: 1, where: { id: id } },);
  } catch (e) {
    throw e;
  }
};

export const getStopList = async () => {
  try {
    return await StopList.findAll({
      raw: true,
    });
  } catch (e) {
    throw e;
  }
};
