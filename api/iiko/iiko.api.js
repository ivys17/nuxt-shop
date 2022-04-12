import { isCompanyEmployee } from './iiko.helper.js';
import axios from 'axios';

import { IIKO_CARD_PROGRAM_IDS, IIKO_SERVER_URL } from '../../config/common.js';

import CLogger from '../lib/CLogger.js';
import { getOrganizationId, getToken } from '../storage/storage.service.js';

const logger = new CLogger();

export const getNomenclature = async () => {

  try {
    const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);
    const res = await axios.get(
      `${IIKO_SERVER_URL}/api/0/nomenclature/${organizationId}`, {
        params: {
          access_token: token,
        },
      });
    return res.data;
  } catch (e) {
    logger.log(e);
  }
};

export const getCustomer = async (phone) => {
  try {
    const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

    const { data } = await axios.get(
      `${IIKO_SERVER_URL}/api/0/customers/get_customer_by_phone`, {
        params: {
          access_token: token,
          organization: organizationId,
          phone: phone,
        },
      });

    let updatedData = data;

    let balance = 0;

    if (data['walletBalances'] && data['walletBalances'].length > 0) {
      data['walletBalances'].forEach(walletBalances => {
        if (IIKO_CARD_PROGRAM_IDS.includes(walletBalances['wallet']['id'])) {
          balance += Number(walletBalances['balance']);
        }
      });
    }
    updatedData.balance = balance;
    updatedData.isCompanyEmployee = isCompanyEmployee(updatedData.categories);

    return updatedData;
  } catch (e) {
    logger.log(e);
  }

};

export const getCladr = async () => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  try {
    const res = await axios.get(
      `${IIKO_SERVER_URL}/api/0/cities/cities`, {
        params: {
          access_token: token,
          organization: organizationId,

        },
      });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createOrUpdate = async (customer) => {
  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  try {
    const { data } = await axios.post(
      `${IIKO_SERVER_URL}/api/0/customers/create_or_update`, customer, {
        params: {
          access_token: token,
          organization: organizationId,

        },
      });

    return data;

  } catch (e) {
    console.log(e);
  }
};

export const sendMessageIiko = async (data) => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }
  data.organization = organizationId;
  try {

    const res = await axios.post(
      `${IIKO_SERVER_URL}/api/0/orders/add`,
      data,
      {
        params: {
          access_token: token,
          organization: organizationId,
          requestTimeout: 10000,
        },
      });
    return res.data;

  } catch (e) {
    console.log(e);
  }
};

// loyalty program
export const calculateCheckinResult = async (order) => {
  const result = {
    discountTotal: 0,
    discounts: [],
    loyaltyProgramErrors: [],
    freeProducts: [],
    lostGift: [],
  };

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);
  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return result;
  }

  try {
    order.organization = organizationId;
    const { data } = await axios
      .post(
        `${IIKO_SERVER_URL}/api/0/orders/calculate_checkin_v2`,
        order,
        {
          params: {
            access_token: token,
            organization: organizationId,
          },
        });

    const { loyatyResult, validationWarnings } = data;

    if (validationWarnings) {
      result.loyaltyProgramErrors = validationWarnings;
    }

    if (loyatyResult) {
      const { programResults } = loyatyResult;

      programResults.forEach(program => {

        //discounts
        if (program.discounts?.length) {
          result.discounts = result.discounts.concat(program.discounts);
          result.discountTotal += program.discounts.reduce((acc, current) => {
            acc += current.discountSum;
            return acc;
          }, 0);
        }

        if (program.freeProducts?.length) {
          result.freeProducts = result
            .freeProducts.concat(
              program.freeProducts.flatMap(item => item.productCodes),
            );
        }
      });

      //TODO: exclude this
      const LOST_GIFT_CODE = '457091542748';
      result.lostGift = result.freeProducts.filter(pCode => pCode === LOST_GIFT_CODE);
      result.freeProducts = result.freeProducts.filter(pCode => pCode !== LOST_GIFT_CODE);

    }

  } catch (e) {
    console.log(e);
  }
  return result;
};

export const getOrderInfo = async (orderId) => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  try {
    const res = await axios.get(
      `${IIKO_SERVER_URL}/api/0/orders/info`, {
        params: {
          access_token: token,
          organization: organizationId,
          order: orderId,
        },
      });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const checkCreateOrder = async (order) => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  const OrderRequest = {
    order: order,
  };

  OrderRequest.organization = organizationId;

  try {

    const res = await axios.post(
      `${IIKO_SERVER_URL}/api/0/orders/checkCreate`,
      OrderRequest,
      {
        params: {
          access_token: token,
          //request_timeout: 30,
        },
      });
    return res.data;

  } catch (e) {
    console.log(e);
  }
};

export const checkAddress = async (city, street, home) => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  const params = {
    access_token: token,
    organizationId: organizationId,
  };

  console.log(city, street, home);

  try {
    const res = await axios.post(
      `${IIKO_SERVER_URL}/api/0/orders/checkAddress`,
      { city, street, home },
      {
        params: params,
      });
    return res.data;

  } catch (e) {
    console.log(e);
  }
};

export const getPayments = async () => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  try {
    const res = await axios.get(
      `${IIKO_SERVER_URL}/api/0/rmsSettings/getPaymentTypes`, {
        params: {
          access_token: token,
          organization: organizationId,
        },
      });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getStopList = async () => {

  const [token, organizationId] = await Promise.all([getToken(), getOrganizationId()]);

  if (!token || !organizationId) {
    console.log('Token and organizationId is required');
    return;
  }

  try {
    const res = await axios.get(
      `${IIKO_SERVER_URL}/api/0/stopLists/getDeliveryStopList`, {
        params: {
          access_token: token,
          organization: organizationId,
        },
      });
    return res.data?.stopList || [];
  } catch (e) {
    console.log(e);
  }
};
