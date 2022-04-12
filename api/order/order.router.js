import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';

import * as orderService from './order.service.js';

const router = express.Router();

router.route('/').get(authMiddleware, async (req, res) => {
  const orders = await orderService.getOrdersAll();
  res.json(orders);
});

router.route('/info/:id').get(async (req, res) => {
  const orders = await orderService.getOrderInfo(req.params.id);
  res.json(orders);
});

export default router;
