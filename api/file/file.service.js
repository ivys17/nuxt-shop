import * as fileRepo from './file.repository.js';

export const saveFileData = async (fileData) => {
  return await fileRepo.saveFileData(fileData);
};

export const deleteFileData = async (id) => {
  return await fileRepo.deleteFileData(id);
};

export const getFile = async (id) => {
  return await fileRepo.getFile(id);
};


