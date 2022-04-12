import { renameObjectKey } from '../lib/helpers.js';

import * as cladrRepo from './cladr.repository.js';

export const getCladrAll = async () => {
  const search = await cladrRepo.getCladrAll();
  if (!search) {
    return [
      {
        id: -1,
        name: `- не найдено`,
      },
    ];
  }

  return search.map(streetData => {
    return {
      iikoId: streetData.iikoId,
      name: streetData.name,
    };
  });
};

export const updateCladr = async (cladr = []) => {

  if (!cladr.length) {
    return false;
  }

  try {
    const cities = cladr.flatMap(c => c.city);
    const streets = cladr.flatMap(c => c.streets);

    const cityModels = await updateCities(cities);

    streets.forEach(street => {
      const city = cityModels.find(cm => cm.iikoId === street.cityId);
      street.cityId = city.id;
    });

    await updateStreets(streets);
  } catch (e) {
    throw e;
  }
};

export const updateCities = (cities) => {
  const data = cities.map(el => {
    renameObjectKey(el, 'id', 'iikoId');
    return el;
  });

  return cladrRepo.updateCities(data);
};

export const updateStreets = (streets) => {
  const data = streets.map(el => {
    renameObjectKey(el, 'id', 'iikoId');
    return el;
  });
  return cladrRepo.updateStreets(data);
};



