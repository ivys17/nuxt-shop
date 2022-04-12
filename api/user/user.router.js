import express from 'express';

import * as userService from './user.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.route('/:phone').get(async (req, res) => {
  const { phone } = req.params;

  if (!phone) {
    res.statusCode = 400;
    return res.json({ message: 'Phone is required' });
  }

  const user = await userService.getUser(phone);
  res.json(user);

});

router.route('/').post(async (req, res) => {
  if (!req.body.phone) {
    res.statusCode = 400;
    res.json({ message: 'Phone is required' });
  } else {
    const user = await userService.createUser(req.body);
    res.json(user);
  }
});

router.route('/').patch(async (req, res) => {

  const { user } = req.body;

  if (!user) {
    res.statusCode = 204;
    res.json({ message: 'No Content' });
    return;
  }

  if (!user?.id) {
    res.statusCode = 400;
    res.json({ message: 'User id is required' });
    return;
  }
  await userService.updateUser(user);
  res.statusCode = 200;
  res.json(user);

});

router.route('/sms').post(async (req, res) => {
  try {
    const { phone } = req.query;
    const smsResult = await userService.sendSMS(phone);
    res.json(smsResult);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }

});


export default router;
