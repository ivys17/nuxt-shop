import express from 'express';
import * as addressService from './address.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const addresses = await addressService.getAddresses();
    res.json(addresses);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

router.route('/by-user-id/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const address = await addressService.getAddressesByUserId(id);
    res.json(address);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const address = req.body;
    const newAddress = await addressService.createAddress(address);
    res.json(newAddress);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

router.route('/:id').patch(async (req, res) => {
  try {
    const { id } = req.params;
    const address = req.body;
    const updatedAddress = await addressService.updateAddress(id, address);
    res.json(updatedAddress);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await addressService.deleteAddress(id);
    res.status(204).send();
  } catch (e) {

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
