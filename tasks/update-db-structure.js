#!/usr/bin/env node

import initModels from '../api/models/init-models.js';

import { sequelize } from '../api/db.js';

/**
 * update database structure
 * @returns {Promise<void>}
 */
const main = async () => {
  try {

    //init const models need for updating structure. do not remove
    const models = initModels(sequelize);
    //await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

await main();

export default main;

