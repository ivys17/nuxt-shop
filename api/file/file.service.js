import * as fileRepo from './file.repository.js';

export const saveFileData = async (fileData) => await fileRepo.saveFileData(fileData);

export const deleteFileData = async (id) => await fileRepo.deleteFileData(id);

export const getFile = async (id) => await fileRepo.getFile(id);
