import express from 'express';
import * as paymentService from './payment.service.js';

const router = express.Router();

router.route('/callback-sberbank').get(async (req, res) => {
  const { orderNumber } = req.query;
  if (orderNumber) {
    await paymentService.callbackSberbank(orderNumber);
  }
  res.send();
});

router.route('/').get(async (req, res) => {
  try {
    const payments = await paymentService.getPayments();
    res.json(payments);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
