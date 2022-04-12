import initModels from '../models/init-models.js';
import { sequelize } from '../db.js';

const models = initModels(sequelize);
const {
  Files,
} = models;

export const saveFileData = async (fileData) => {
  try {
    const originalName = fileData.originalname;
    const fileName = fileData.filename;
    const path = fileData.path.split('/').slice(1).join('/');

    const file = {
      originalName, fileName, path,
    };

    const createdFileData = await Files.create(file);
    return createdFileData.get({ plain: true });
  } catch (e) {
    console.log(e);
  }

};

export const deleteFileData = async (id) => {

  try {
    await Files.destroy({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getFile = async (id) => {
  try {
    return await Files.findOne({
      where: {
        id: id,
      },
      raw: true
    });
  } catch (e) {
    console.log(e);
  }
};
