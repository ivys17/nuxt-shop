import express from 'express';

import * as cladrService from './cladr.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const cladr = await cladrService.getCladrAll();
    res.json(cladr);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
