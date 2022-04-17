import express from 'express';
import morgan from 'morgan';

import CLogger from './lib/CLogger.js';

import env from './env.js';

import userRouter from './user/user.router.js';
import catalogRouter from './catalog/catalog.router.js';
import paymentRouter from './payment/payment.router.js';
import orderRouter from './order/order.router.js';
import telegramRouter from './telegram/telegram.router.js';
import iikoRouter from './iiko/iiko.router.js';
import adminRouter from './admin/admin.router.js';
import addressRouter from './address/address.router.js';
import cladrRouter from './cladr/cladr.router.js';
import pageRouter from './page/page.router.js';
import authRouter from './auth/auth.router.js';
import fileRouter from './file/file.router.js';
import formRouter from './form/form.router.js';
import blockRouter from './block/block.router.js';
import reviewRouter from './review/review.router.js';
import slideRouter from './slide/slide.router.js';

const logger = new CLogger();

process.on('unhandledRejection', (reason, promise) => {
  logger.log(`Unhandled Rejection at: ${promise}. Reason: ${reason}`);
});

process.on('uncaughtException', (err, origin) => {
  logger.log(`Caught exception: ${err}\nException origin: ${origin}`);
});

const app = express();

// app.use(morgan('combined', { stream: logger.logger.stream }));

try {
  app.use(express.json());

  app.use('/api/user', userRouter);
  app.use('/api/catalog', catalogRouter);
  app.use('/api/payment', paymentRouter);
  app.use('/api/order', orderRouter);
  app.use('/api/telegram', telegramRouter);
  app.use('/api/iiko', iikoRouter);
  app.use('/api/address', addressRouter);
  app.use('/api/cladr', cladrRouter);
  app.use('/api/page', pageRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/file', fileRouter);
  app.use('/api/form', formRouter);
  app.use('/api/block', blockRouter);
  app.use('/api/review', reviewRouter);
  app.use('/api/slide', slideRouter);

  app.listen(process.env.API_SERVER_PORT, () => {
    console.log(`App is listening on ${env.API_SERVER_PORT}`);
  });
} catch (e) {
  logger.log(e.message);
}

export default app;
