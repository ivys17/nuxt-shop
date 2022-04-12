import express from 'express';

import authMiddleware from '../middleware/auth.middleware.js';
import * as pageService from './page.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const pages = await pageService.getPages();
    res.json(pages);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const page = await pageService.getPage(id);
    res.json(page);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const page = req.body;
    const createdPage = await pageService.createPage(page);
    res.json(createdPage);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').patch(authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const page = req.body;
    const updatedPage = await pageService.updatePage(id, page);
    res.json(updatedPage);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').delete(authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await pageService.deletePage(id);
    res.status(204).send();
  } catch (e) {

    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
