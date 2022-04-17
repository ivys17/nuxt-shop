import express from 'express';
import * as reviewService from './review.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const reviews = await reviewService.getReviews();
    res.json(reviews);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const review = req.body;
    const newReview = await reviewService.createReview(review);
    res.json(newReview);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
});

export default router;
