import winstonLogger from './winston.js';

export default class CLogger {
  constructor() {
    this.logger = winstonLogger;
  }

  log(msg) {
    this.logger.log('info', msg);
  }
}
