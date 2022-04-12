import * as blockRepo from './block.repository.js';

export const getBlock = async (id) => {
  return await blockRepo.getBlock(id);
};

export const createBlock = async (block) => {
  return await blockRepo.createBlock(block);

};

export const updateBlock = async (id, block) => {
  return await blockRepo.updateBlock(id, block);
};

export const deleteBlock = async (id) => {
  await blockRepo.deleteBlock(id);
};
