import express from 'express';
import * as authService from './auth.service.js';

const router = express.Router();

router.route('/registration').post(async (req, res) => {
  try {
    await authService.registrationUser();
    res.json();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

router.route('/login').post(async (req, res) => {
  try {
    const { body } = req;

    const result = await authService.loginUser(body);
    if (!result) {
      return res.status(400).json({ message: 'Пара логин и пароль не подходят.' });
    }
    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

export default router;
