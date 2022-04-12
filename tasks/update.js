#!/usr/bin/env node

import * as cladrService from '../api/cladr/cladr.service.js';
import * as storageService from '../api/storage/storage.service.js';
import * as iikoService from '../api/iiko/iiko.service.js';
import * as iikoApi from '../api/iiko/iiko.api.js';
import * as paymentService from '../api/payment/payment.service.js';

const run = async () => {
  try {
    const resNomenclature = await iikoApi.getNomenclature();
    if (!resNomenclature) {
      console.log('Нет данных для загрузки на сайт');
      return;
    }

    const {
      groups, products, revision, uploadDate,
    } = resNomenclature;

    const currentRevision = await storageService.getRevision();

    if (revision !== currentRevision) {
      console.log('Каталог загружается на сайт...');

      if (groups.length) {
        console.log('Загружаются категории товаров... =>');
        await iikoService.updateGroups(groups, revision);
        await iikoService.deleteOldGroups(revision);
        console.log('<= Категории товаров загружены.');
      }

      if (products.length) {
        console.log('Загружаются товары... =>');
        await iikoService.updateProducts(products, revision);
        await iikoService.deleteOldProducts(revision);
        console.log('<= Товары загружены.');
      }

      console.log('Загружаются изображения');
      await iikoService.uploadImagesFromRemote(revision);
      await iikoService.deleteOldImages(revision);
      console.log('Изображения загружены.');

      console.log('Каталог загружен на сайт...');

      await storageService.setRevision(revision);
    }

    const isNeedCladrUpdate = await storageService.getIsNeedCladrUpdate();

    if (isNeedCladrUpdate) {
      console.log('Кладр обновляется... =>');
      const cladr = await iikoApi.getCladr();
      if (!cladr) {
        return;
      }

      await cladrService.updateCladr(cladr);
      await storageService.setIsNeedCladrUpdate(false);
      console.log('<= Кладр обновлен.');

    } else {
      console.log('Кладр не нуждается в обновление');
    }

    console.log('Список оплат обновляется... =>');
    const payments = await iikoApi.getPayments();
    if (payments.paymentTypes?.length) {
      await paymentService.createPayments(payments.paymentTypes);
    }
    console.log('<= Список оплат обновлен.');


    console.log('Обновляются стоп-листы... =>');
    const stopList = await iikoService.getStopList();
    if(stopList) {
      await iikoService.updateStopList(stopList, revision);
      await iikoService.deleteStopList(revision);
    }
    console.log('<= Стоп-листы обновлены.');


  } catch (e) {
    console.log(e);
    console.log('Ошибка при получении данных из iiko. Данные не были обновлены.');
  }
};

await run();
console.log('Обновление данных завершено.');

export default run;

