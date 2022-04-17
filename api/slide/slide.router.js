import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import * as slideService from './slide.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const slides = await slideService.getSlides();
    res.json(slides);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/').post(authMiddleware, async (req, res) => {
  try {
    const slide = req.body;
    const newSlide = await slideService.createSlide(slide);
    res.json(newSlide);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').delete(authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await slideService.deleteSlide(id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
