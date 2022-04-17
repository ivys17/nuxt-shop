import * as blockRepo from './block.repository.js';

export const getBlock = async (id) => await blockRepo.getBlock(id);

export const createBlock = async (block) => await blockRepo.createBlock(block);

export const updateBlock = async (id, block) => await blockRepo.updateBlock(id, block);

export const deleteBlock = async (id) => {
  await blockRepo.deleteBlock(id);
};
