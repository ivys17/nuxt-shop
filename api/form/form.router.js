import express from 'express';
import * as formService from './form.service.js';

const router = express.Router();

router.route('/callback').post(async (req, res) => {
  try {
    const data = req.body;
    await formService.sendCallback(data);
    res.json();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/review').post(async (req, res) => {
  try {
    const data = req.body;
    await formService.sendReview(data);
    res.json();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/vacancy').post(async (req, res) => {
  try {
    const data = req.body;
    await formService.sendVacancy(data);
    res.json();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
