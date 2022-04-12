import lodash from 'lodash';

import * as fsPromises from 'fs/promises';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import * as catalogService from '../catalog/catalog.service.js';

import download from '../lib/download.js';


import * as iikoApi from './iiko.api.js';
import * as iikoHelper from './iiko.helper.js';
import * as iikoRepo from './iiko.repository.js';

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);

const PATH_DIR_IMAGES = path.resolve(__dirname, '../../static/uploads', 'shop', 'full');
const PATH_DIR_OPTIMIZE_IMAGES =
  path.resolve(__dirname, '../../static/uploads', 'shop', 'optimize');

export const updateGroups = async (groups = [], revision) => {

  if (!groups.length) {
    return false;
  }

  groups.forEach(g => {
    g.revision = revision;
  });

  try {

    const images = groups.flatMap(({ images, id }) => {
      if (!images) {
        return [];
      }
      return images.map(image => {
        return {
          ownerId: id,
          ...image
        };
      });
    });

    await iikoRepo.updateGroups(groups);
    await iikoRepo.updateImages(images);

  } catch (e) {
    throw new Error(e);
  }
};

export const deleteOldGroups = async (revision) => {
  return await iikoRepo.deleteOldGroups(revision);
};

export const updateProducts = async (products = [], revision) => {
  if (!products.length) {
    return false;
  }

  products.forEach(p => {
    p.revision = revision;
    return p;
  });

  try {
    await iikoRepo.createOrUpdateProducts(products);

    const modifiers = iikoHelper.getModifiersFromIikoData(products);
    await iikoRepo.updateModifiers(modifiers);

    const groupModifiers = iikoHelper.getGroupModifiersFromIikoData(products);
    await iikoRepo.updateGroupModifiers(groupModifiers);

    const groupModifiersChildren = iikoHelper.getGroupModifiersChildrenFromIikoData(groupModifiers);
    await iikoRepo.updateGroupModifiersChildren(groupModifiersChildren);

    const images = products.flatMap(({ images, id }) => {
      if (!images) {
        return [];
      }
      return images.map(image => {
        return {
          ownerId: id,
          ...image
        };
      });
    });

    await iikoRepo.updateImages(images);

  } catch (e) {
    throw new Error(e);
  }
};

export const deleteOldProducts = async (revision) => {
  return await iikoRepo.deleteOldProducts(revision);
};

export const addUploadedImagesPaths = async (paths) => {
  if (!paths.length) {
    return false;
  }

  return await iikoRepo.addUploadedImagesPaths(paths);
};

export const uploadImagesFromRemote = async (revision) => {

  const images = await catalogService.getImagesAll();
  const filePathsForDB = [];

  await fsPromises.mkdir(PATH_DIR_IMAGES, { recursive: true });

  const imageData = [];

  for (const i of images) {
    const arr = i.imageUrl.split('/');
    const name = arr.pop();

    const filePath = path.resolve(PATH_DIR_IMAGES, name);

    filePathsForDB.push({
      imageId: i.imageId,
      fileName: name,
      revision: revision
    });

    imageData.push({
      imageUrl: i.imageUrl, filePath: filePath
    });
  }

  try {

    //throttling
    const imageDataChunked = lodash.chunk(imageData, 10);
    for (const imageData1 of imageDataChunked) {
      await Promise
        .allSettled(imageData1.map(i => download(i.imageUrl, i.filePath)));
    }

  } catch (e) {
    console.log('Download failed');
    console.log(e.message);
  }

  await addUploadedImagesPaths(filePathsForDB);

  //await optimizeImage();
};

export const optimizeImage = async () => {
  try {

    await imagemin(
      [
        PATH_DIR_IMAGES,
      ],
      {
        destination: PATH_DIR_OPTIMIZE_IMAGES,
        plugins: [
          imageminJpegtran({
            progressive: true
          }),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });
  } catch (e) {
    console.log(e);
  }
};

export const calculateCheckinResult = async (orderData) => {
  return await iikoApi.calculateCheckinResult(orderData);
};

export const getOrderInfo = async (orderId) => {
  return await iikoApi.getOrderInfo(orderId);
};

export const checkCreateOrder = async (order) => {
  try {

    return await iikoApi.checkCreateOrder(order);

  } catch (e) {
    throw e;
  }
};

export const checkAddress = async (city, street, home) => {
  try {
    return await iikoApi.checkAddress(city, street, home);
  } catch (e) {
    throw e;
  }
};

export const deleteOldImages = async (revision) => {

  const deletedImages = await iikoRepo.deleteOldImages(revision);
  await Promise.allSettled(deletedImages.map(image => {
    const filePath = path.resolve(PATH_DIR_IMAGES, image.fileName);

    return new Promise(async (resolve, reject) => {
      try {
        await fsPromises.unlink(filePath);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }));
};

export const getStopList = async () => {
  try {
    return await iikoApi.getStopList();
  } catch (e) {
    throw e;
  }
};

export const updateStopList = async (stopList = [], revision) => {
  if (!stopList.length) {
    return false;
  }

  try {
    const normalizedStopList = iikoHelper.normalizeStopList(stopList);
    normalizedStopList.forEach(el => el.revision = revision);

    await iikoRepo.updateStopList(normalizedStopList);

  } catch (e) {
    throw new Error(e);
  }
};

export const deleteStopList = async (revision = null) => {
  if (!revision) {
    return false;
  }
  return await iikoRepo.deleteStopList(revision);
};

export const getCustomer = async (phone) => {
  return await iikoApi.getCustomer(phone);
};
