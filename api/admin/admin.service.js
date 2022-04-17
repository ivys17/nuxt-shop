import Excel from 'exceljs';
import * as orderService from '../order/order.service.js';
import * as userService from '../user/user.service.js';

import {
  formatCurrency, formatDate, formatPhoneNumber, renderAddress,
} from '../../lib/common.js';

export const getExcelOrders = async (res) => {
  const orders = await orderService.getOrdersAll();

  const headers = [
    { header: 'Номер заказа', key: 'id', width: 10 },
    { header: 'Сумма', key: 'total', width: 10 },
    { header: 'Дата', key: 'date', width: 30 },
    { header: 'Покупатель', key: 'customer', width: 40 },
    { header: 'Телефон', key: 'phone', width: 40 },
    { header: 'Адрес', key: 'address', width: 40 },
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    total: formatCurrency(order.total),
    date: formatDate(order.createdAt, { hasTime: true }),
    customer: order.user.name,
    phone: formatPhoneNumber(order.user.phone),
    address: renderAddress(order.address),
  }));

  await renderExcel(headers, rows, res);
};

export const getExcelCustomers = async (res) => {
  const customers = await userService.getUsers();

  const headers = [
    { header: 'ФИО', key: 'customer', width: 20 },
    { header: 'Номер телефона', key: 'phone', width: 20 },
    { header: 'Дата рождения', key: 'birthday', width: 20 },
    { header: 'Количество заказов', key: 'orders', width: 20 },
    { header: 'Сумма, руб.', key: 'total', width: 20 },

  ];

  const rows = customers.map((user) => ({
    customer: user.name ?? 'не задано',
    phone: formatPhoneNumber(user.phone),
    birthday: user.birthday ? formatDate(user.birthday, { hasTime: false }) : 'не указан',
    orders: user.count,
    total: formatCurrency(user.sum),
  }));

  await renderExcel(headers, rows, res);
};

export const renderExcel = async (headers, rows, res) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');
  worksheet.columns = headers;
  rows.forEach((row) => worksheet.addRow(row));
  if (res) {
    await workbook.xlsx.write(res);
  } else {
    await workbook.xlsx.writeFile('report.xlsx');
  }
};
