import express from 'express';
import * as iikoService from './iiko.service.js';

const router = express.Router();

router.route('/calculate-checkin-result').post(async (req, res) => {
  try {
    const result = await iikoService.calculateCheckinResult(req.body);
    res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
      e,
    });
  }
});

router.route('/orders/check-create').post(async (req, res) => {
  try {
    const { order } = req.body;
    const result = await iikoService.checkCreateOrder(order);
    res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
      e,
    });
  }
});

router.route('/orders/checkAddress').post(async (req, res) => {
  try {
    const { city, street, home } = req.body;
    const result = await iikoService.checkAddress(city, street, home);
    res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
      e,
    });
  }
});

export default router;
