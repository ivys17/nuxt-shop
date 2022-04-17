import express from 'express';

import authMiddleware from '../middleware/auth.middleware.js';
import * as adminService from './admin.service.js';

const router = express.Router();

router.route('/excel/orders').get(authMiddleware, async (req, res) => {
  try {
    res.setHeader(
      'content-type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'orders.xlsx');
    await adminService.getExcelOrders(res);
    res.end();
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.route('/excel/customers').get(authMiddleware, async (req, res) => {
  try {
    res.setHeader(
      'content-type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'orders.xlsx');
    await adminService.getExcelCustomers(res);
    res.end();
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
