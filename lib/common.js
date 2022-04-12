import parsePhoneNumber from 'libphonenumber-js';
import { WORK_TIME } from '../config/common.js';

const getLocalTime = () => {
  const date = new Date();
  const hour = date.toLocaleString(
    'ru-Ru',
    {
      hour: '2-digit', hour12: false, timeZone: 'Asia/Yekaterinburg',
    });
  date.setHours(+hour);
  return date;
};

export const checkWorkTime = (TIME = WORK_TIME) => {

  const day = new Date().getDay();
  const workInterval = TIME[day];

  const { open, close } = workInterval;

  if (open === close) {
    return false;
  }

  //TODO: need refactor
  const startDate = getLocalTime();
  startDate.setHours(+open.split(':')[0]);
  startDate.setMinutes(+open.split(':')[1]);
  startDate.setSeconds(0);

  //TODO: need refactor
  const endDate = getLocalTime();
  endDate.setHours(+close.split(':')[0]);
  endDate.setMinutes(+close.split(':')[1]);
  endDate.setSeconds(0);

  const checkDate = getLocalTime();

  return (checkDate > startDate && checkDate < endDate) ? true : workInterval;
};

export const validatePhone = (phone) => {
  return !(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
    phone));
};

export const formatDate = (date, { hasTime = null } = {}) => {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour12: false,
  };

  if (hasTime) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }

  return new Date(date).toLocaleString('ru-RU', options);
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number);
};

export const cachingDecorator = (fn) => {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = fn(x);
    cache.set(x, result);
    return result;
  };
};

export const renderAddress = (address) => {
  if (!address) {
    return 'не указан';
  }

  const result = [];

  result.push(`${address.street}, ${address.home}`);
  if (address.apartment) {
    result.push(`, кв. ${address.apartment}`);
  }

  if (address.entrance) {
    result.push(`подъезд: ${address.entrance}`);
  }

  if (address.floor) {
    result.push(`этаж: ${address.floor}`);
  }

  return result.join(', ');
};

export const formatPhoneNumber = (phone) => {
  const phoneNumber = parsePhoneNumber(phone);
  return phoneNumber.format('INTERNATIONAL');
};

export const downloadFile = (data, filename, mime) => {

  const blob = new Blob([data], { type: mime || 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    window.URL.revokeObjectURL(blobURL);
  }, 100);
};

export const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));




