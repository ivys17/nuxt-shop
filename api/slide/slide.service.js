import * as fileService from '../file/file.service.js';

import * as slideRepo from './slide.repository.js';

export const getSlides = async () => {
  const result = [];
  const slidesData = await slideRepo.getSlides();

  for (const slide of slidesData) {
    const file = await fileService.getFile(slide.fileId);
    result.push({
      id: slide.id,
      path: file.path,
      isMobile: slide.isMobile,
    });
  }
  return result;
};

export const getSlide = async (id) => await slideRepo.getSlide(id);

export const createSlide = async (slide) => await slideRepo.createSlide(slide);

export const deleteSlide = async (id) => {
  const slide = await getSlide(id);
  await slideRepo.deleteSlide(id);
  await fileService.deleteFileData(slide.fileId);
};
