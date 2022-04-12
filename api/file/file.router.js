import express from 'express';
import multer from 'multer';
import path from 'path';

import authMiddleware from '../middleware/auth.middleware.js';

import * as fileService from './file.service.js';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/uploads/storage/');
  }, filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const fileFilter = (req, file, cb) => {

  if (!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

router.route('/upload').post(authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    if (file) {
      const createdFileData = await fileService.saveFileData(file);
      res.status(201).json(createdFileData);
    } else {
      res.send('Ошибка при загрузке файла');
    }
  } catch (e) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').delete(authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await fileService.deleteFileData(id);
      res.status(204).json();
    }
  } catch (e) {
    res.status(404).json({
      message: 'Internal Server Error',
    });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const file = await fileService.getFile(id);
      res.json(file);
    }
  } catch (e) {
    res.status(404).json({
      message: 'Internal Server Error',
    });
  }
});

export default router;
