import slugify from 'slugify';
import { randomUUID } from 'crypto';

import * as orderRepo from '../order/order.repository.js';
import * as paymentService from '../payment/payment.service.js';
import * as senderService from '../sender/sender.service.js';

import * as userService from '../user/user.service.js';

import {
  getCatalogImage,
  getProductAdditionalInfo,
  getProductTags,
  uniqModifiers,
} from './catalog.helper.js';
import * as catalogRepo from './catalog.repository.js';

const customSlugify = (str) => slugify(
  str.replaceAll('-', '_'), { replacement: '_', lower: true, trim: true },
);

export const getCatalog = async () => {
  const productsAll = await getProductsAll();
  const groups = await getGroupsAll();
  //const modifiers = await getModifiersAll();
  const groupModifiers = await getGroupModifiers();
  const groupModifiersChildren = await getGroupModifiersChildren();
  const stopList = await getStopList();

  const products = productsAll.filter(product => {
    const productInStopList = stopList.filter(el => el.productId === product.id);
    // if (productInStopList.length) {
    //   for (const productInStopListElement of productInStopList) {
    //     if (productInStopListElement.balance < 1) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  });

  // modifiers.forEach(m => {
  //   const p = products.find(el => el.id === m.modifierId);
  //   if (p) {
  //     m.name = p.name;
  //     m.code = p.code;
  //     m.price = p.price;
  //   }
  // });

  groupModifiers.forEach(groupModifier => {
    const referringGroup = groups.find(g => g.id === groupModifier.modifierId);
    groupModifier.name = referringGroup.name;
    const children = groupModifiersChildren
      .filter(groupModifiersChild => {
        return groupModifiersChild.parentId === groupModifier.modifierId;
      });

    children.forEach(child => {
      const product = products.find(p => p.id === child.modifierId);
      if (product) {
        child.name = product.name;
        child.code = product.code;
        child.price = product.price;
        child.description = product.description;

        child.weight = product.weight;
        child.fiberAmount = product.fiberAmount;
        child.fatAmount = product.fatAmount;
        child.carbohydrateAmount = product.carbohydrateAmount;
        child.energyAmount = product.energyAmount;


        child.groupId = child.parentId;
        child.groupName = groupModifier.name;
        child.maxAmount = groupModifier.maxAmount;
        child.minAmount = groupModifier.minAmount;
      }
    });

    groupModifier.modifiers = uniqModifiers(children);
  });

  products.forEach(p => {
    p.groupModifiers = [];

    const groupModifiersForProduct = groupModifiers
      .filter(groupModifier => groupModifier.parentId === p.id);

    p.requiredGroupModifier = groupModifiersForProduct.find(el => el.required);
    p.minGroupMod = 0;
    if (p.requiredGroupModifier) {
      p.minGroupMod = Math.min(...p.requiredGroupModifier.modifiers.map(el => el.price));
    }

    p.groupModifiers.push(...groupModifiersForProduct);

    // const modifiersForProduct = modifiers
    //   .filter(modifier => modifier.productId === p.id);
    //
    // if (modifiersForProduct.length) {
    //   p.groupModifiers.push({
    //     name: '',
    //     minAmount: 0,
    //     maxAmount: 1,
    //     modifiers: modifiersForProduct,
    //     modifierId: randomUUID(),
    //     required: false,
    //   });
    // }

  });
  return { products, groups, stopList };
};

export const getGroupsAll = async () => {
  const groupsAll = await catalogRepo.getGroupsAll();
  const groupsAllLength = groupsAll.length;
  const slugs = [];
  const groups = groupsAll.map(g => {
    let additionalInfo = {};
    try {
      additionalInfo = JSON.parse(g.additionalInfo);
    } catch (e) {
      additionalInfo = {};
    }

    let slug = customSlugify(g.name);
    for (let i = 0; i < groupsAllLength; i++) {
      if (!slugs.includes(slug)) {
        slugs.push(slug);
        break;
      } else {
        slug += '_';
      }

    }

    return {
      ...g,
      slug: slug,
      id: g.id,
      additionalInfo: additionalInfo,
      image: getCatalogImage(g),
    };
  });
  groups.sort((a, b) => a.order - b.order);

  return groups;
};

export const getProductsAll = async () => {

  const productsAll = await catalogRepo.getProductsAll();
  const products = productsAll.map(p => {

    return {
      id: p.id,
      name: p.name,
      code: p.code,
      parentGroup: p.parentGroup,
      price: p.price,
      weight: p.weight,
      order: p.order,
      energyAmount: p.energyAmount,
      fiberAmount: p.fiberAmount,
      fatAmount: p.fatAmount,
      carbohydrateAmount: p.carbohydrateAmount,
      additionalInfo: getProductAdditionalInfo(p),
      groupModifiers: [],
      slug: customSlugify(p.name),
      description: p.description,
      image: getCatalogImage(p),
      likes: p.likes,
      tags: getProductTags(p),
      createdAt: p.createdAt,
      seo: {
        title: p.seoTitle, description: p.seoDescription, keywords: p.seoKeywords,
      },
    };
  });

  products.sort((a, b) => a.order - b.order);
  return products.filter(p => {
    const { additionalInfo } = p;

    if (additionalInfo?.deliveryMobile?.isSticker) {
      return false;
    }

    if (additionalInfo?.deliveryMobile?.isHide) {
      return false;
    }

    return true;
  });
};

export const getProduct = async (id) => {
  //TODO: implement
  return false;
};

export const getModifiersAll = async () => await catalogRepo.getModifiersAll();

export const getGroupModifiers = async () => await catalogRepo.getGroupModifiers();

export const getGroupModifiersChildren = async () => await catalogRepo.getGroupModifiersChildren();

export const createOrder = async (data) => {
  const { user, order: orderData, coupon, spendBonus } = data;

  let userId = null;

  try {
    const { id } = await userService.updateUserByUserPhone(user);
    userId = id;
  } catch (e) {
    console.log(e);
  }

  if (!userId) {
    return null;
  }

  const order = {
    userId: userId,
    personsCount: orderData.personsCount,
    total: orderData.total,
    comment: orderData.comment,
    coupon: coupon,
    paymentType: orderData.payment,
    zoneId: orderData.zoneId,
    isSelfService: orderData.isSelfService,
    addressId: orderData.addressId,
    status: 'NEW',
    spendBonus: spendBonus,
  };

  const { id: orderId } = await orderRepo.createOrder(order);

  const basket = orderData.basket;

  await Promise.all(basket.map(saveBasketItems));

  //TODO: fix
  if (orderData.payment === 'MCARD') {
    return await paymentService.payOrder(orderId);
  } else {
    try {
      await processOrder(orderId);
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  async function saveBasketItems(basketItem) {
    const { product } = basketItem;
    const basketItemData = {
      orderId: orderId,
      iikoId: product.id,
      name: product.name,
      code: product.code,
      price: product.price,
      amount: basketItem.quantity,
    };
    const { id: orderProductId } = await catalogRepo.createOrderItem(basketItemData);
    if (basketItem.mods.length) {
      for (const mod of basketItem.mods) {
        const basketItemData = {
          orderProductId: orderProductId,
          amount: mod.count,
          iikoId: mod.id,
          name: mod.name,
          code: mod.code,
          price: mod.price,
        };
        await catalogRepo.createOrderProductModifier(basketItemData);
      }
    }
  }
};

export const processOrder = async (orderId) => {
  const order = await buildOrder(orderId);
  await senderService.sendMessage(order);

};

export const buildOrder = async (orderId) => {
  const orderModel = await orderRepo.getOrder(orderId);
  const orderData = JSON.parse(JSON.stringify(orderModel));
  return orderData;
};

export const getImagesAll = async () => {
  return await catalogRepo.getImagesAll();
};

export const createOrderIikoAnswer = async (orderId, answer) => {
  const answerData = {
    orderId: orderId, answer: answer,
  };
  return await catalogRepo.createOrderIikoAnswer(answerData);
};

export const likeProduct = async (id) => {
  await catalogRepo.likeProduct(id);
};

export const getStopList = async () => {
  return await catalogRepo.getStopList();
};
