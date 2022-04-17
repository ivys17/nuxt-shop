const SHOP_IMAGES_PATH = '/uploads/shop/';

export const formatDateForSending = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  return new Date(date).toLocaleString('ru-RU', options);
};

export const getCatalogImage = (entity) => {
  let imagePath = '/theme/stub.png';
  if (entity.image) {
    imagePath = `${SHOP_IMAGES_PATH}/full/${entity.image}`;
  }

  return imagePath;
};

export const getProductAdditionalInfo = (item) => {
  try {
    return JSON.parse(item.additionalInfo);
  } catch (e) {
    return {};
  }
};

export const getProductTags = (product) => {
  try {
    return JSON.parse(product.tags);
  } catch (e) {
    return [];
  }
};

export const uniqModifiers = (mods) => Object.values(mods.reduce((acc, current) => {
  if (current.modifierId in acc) {
    return acc;
  }

  acc[current.modifierId] = current;
  return acc;
}, {}));
