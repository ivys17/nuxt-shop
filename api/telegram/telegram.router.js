import express from 'express';
import * as telegramService from './telegram.service.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
  telegramService.telegramCallback(req.body);
  res.send();
});

export default router;
