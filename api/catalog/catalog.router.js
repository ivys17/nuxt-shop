import express from 'express';
import * as catalogService from './catalog.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const catalog = await catalogService.getCatalog();
  res.json(catalog);
});

router.route('/groups').get(async (req, res) => {
  const groups = await catalogService.getGroupsAll();
  res.json(groups);
});

router.route('/product').get(async (req, res) => {
  const products = await catalogService.getProductsAll();
  res.json(products);
});

router.route('/product/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Product id is required!',
      });
    }
    const products = await catalogService.getProduct(id);
    res.json(products);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/modifiers').get(async (req, res) => {
  const modifiers = await catalogService.getModifiersAll();
  res.json(modifiers);
});

router.route('/order').post(async (req, res) => {
  const paymentLink = await catalogService.createOrder(req.body);
  res.json({
    paymentLink,
  });
});

router.route('/product/like').patch(async (req, res) => {
  const { id } = req.query;
  await catalogService.likeProduct(id);
  res.json();
});

export default router;
