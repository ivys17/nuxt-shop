import express from 'express';
import * as blockService from './block.service.js';

const router = express.Router();

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const block = await blockService.getBlock(id);
  res.json(block);
});

router.route('/').post(async (req, res) => {
  try {
    const block = req.body;
    const newBlock = await blockService.createBlock(block);
    res.json(newBlock);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').patch(async (req, res) => {
  try {
    const { id } = req.params;
    const block = req.body;
    const updatedBlock = await blockService.updateBlock(id, block);
    res.json(updatedBlock);
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await blockService.deleteBlock(id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
